import { useState, useEffect, useCallback, useRef } from 'react';

export type GameEvent = {
    type: string;
    [key: string]: any;
};

export const useWebSocket = (baseUrl: string, sessionId?: string | null) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [lastEvent, setLastEvent] = useState<GameEvent | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const reconnectTimeoutRef = useRef<number | undefined>(undefined);

    const connect = useCallback(() => {
        if (!sessionId) return;
        const url = `${baseUrl}/${sessionId}`;
        const ws = new WebSocket(url);

        ws.onopen = () => {
            console.log('WebSocket connected');
            setIsConnected(true);
            setSocket(ws);
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('WebSocket message received:', data);
                setLastEvent(data);
            } catch (err) {
                console.error('Failed to parse WebSocket message:', err);
            }
        };

        ws.onclose = () => {
            console.log('WebSocket disconnected');
            setIsConnected(false);
            setSocket(null);
            // Attempt reconnection after 3 seconds
            reconnectTimeoutRef.current = window.setTimeout(connect, 3000);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            ws.close();
        };
    }, [baseUrl, sessionId]);

    useEffect(() => {
        connect();
        return () => {
            if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
            if (socket) socket.close();
        };
    }, [connect]);

    const sendEvent = useCallback((type: string, data: any = {}) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type, ...data }));
        } else {
            console.warn('Socket not connected. Failed to send event:', type);
        }
    }, [socket]);

    return { isConnected, lastEvent, sendEvent };
};
