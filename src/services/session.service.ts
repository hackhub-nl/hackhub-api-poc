import { Session } from "../models/session.model";
import { SessionRepo } from "../repositories/session.repo";

interface ISessionService {
  createSession(valid: boolean, userId: number): Promise<void>;
  findSessions(): Promise<Session[]>;
}

export class SessionService implements ISessionService {
  async createSession(valid: boolean, userId: number): Promise<void> {
    try {
      const session = new Session();
      session.valid = valid;
      session.userId = userId;

      await new SessionRepo().save(session);
    } catch (error) {
      throw new Error("Error create session");
    }
  }
  findSessions(): Promise<Session[]> {
    throw new Error("Method not implemented.");
  }
}
