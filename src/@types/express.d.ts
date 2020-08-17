interface ConnectedUsers {
  [key: string]: string;
}

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
    io: any;
    connectedUsers: ConnectedUsers;
  }
}
