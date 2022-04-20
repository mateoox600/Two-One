// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ServerToClientEvents {
    'reloadPage': () => void
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ClientsToServerEvents {
    
}

export type InterServerEvents = Record<string, never>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SocketData {
    
}