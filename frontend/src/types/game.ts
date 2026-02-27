export interface Profile {
    name: string;
    title?: string;
    image?: string;
    level?: number;
}

export interface User {
    id: string;
    profile: Profile;
    place: number;
    game: {
        ready: boolean;
        team: number;
        score: number;
    };
}

export interface Room {
    id: number;
    title: string;
    master: string;
    mode: number;
    limit: number;
    round: number;
    time: number;
    players: string[];
    gaming: boolean;
}

export interface GameState {
    myId: string | null;
    users: Record<string, User>;
    rooms: Record<number, Room>;
    currentRoomId: number | null;
    isConnected: boolean;
}
