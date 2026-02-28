import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import type { GameState } from '../types/game';

interface GameContextType extends GameState {
    sendEvent: (type: string, data?: any) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [sessionId, setSessionId] = useState<string | null>(null);
    const { isConnected, lastEvent, sendEvent } = useWebSocket(`ws://${window.location.host}/socket`, sessionId);

    const [state, setState] = useState<GameState>({
        myId: null,
        users: {},
        rooms: {},
        currentRoomId: null,
        isConnected,
    });

    // Fetch session on mount
    useEffect(() => {
        fetch('/api/session')
            .then(res => res.json())
            .then(data => {
                if (data.id) {
                    setSessionId(data.id);
                    if (data.profile) {
                        setState(s => ({ ...s, myId: data.profile.id }));
                    }
                }
            })
            .catch(err => console.error('Failed to fetch session:', err));
    }, []);

    useEffect(() => {
        setState(s => ({ ...s, isConnected }));
    }, [isConnected]);

    // Handle incoming WebSocket events (Ported from body.js onMessage)
    useEffect(() => {
        if (!lastEvent) return;

        switch (lastEvent.type) {
            case 'welcome':
                setState(s => ({
                    ...s,
                    myId: lastEvent.id,
                    users: lastEvent.users,
                    rooms: lastEvent.rooms,
                }));
                break;

            case 'conn':
                setState(s => ({
                    ...s,
                    users: { ...s.users, [lastEvent.user.id]: lastEvent.user }
                }));
                break;

            case 'disconn':
                setState(s => {
                    const newUsers = { ...s.users };
                    delete newUsers[lastEvent.id];
                    return { ...s, users: newUsers };
                });
                break;

            case 'room':
                setState(s => ({
                    ...s,
                    rooms: { ...s.rooms, [lastEvent.room.id]: lastEvent.room },
                    currentRoomId: lastEvent.myRoom ? lastEvent.room.id : s.currentRoomId
                }));
                break;

            // More cases can be added here as needed...
        }
    }, [lastEvent]);

    return (
        <GameContext.Provider value={{ ...state, sendEvent }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) throw new Error('useGame must be used within a GameProvider');
    return context;
};
