export interface IJwtPayload {
  id: number;
  username: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: IJwtPayload;
  }
}
