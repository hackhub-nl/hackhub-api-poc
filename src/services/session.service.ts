import { Session } from "../models/session.model";
import { SessionRepo } from "../repositories/session.repo";
import { verifyJwt } from "../utils/jwt.utils";
import { get } from "lodash";
import { findUser } from "./user.service";
import config from "config";
import { signJwt } from "../utils/jwt.utils";

export async function createSession(userId: number) {
  const session = new Session();
  session.userId = userId;

  await new SessionRepo().save(session);

  return JSON.parse(JSON.stringify(session));
}

export async function findSessions() {
  throw new Error("Method not implemented.");
}

export async function updateSession() {
  throw new Error("Method not implemented.");
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || !get(decoded, "session")) return false;

  const session = await Session.findOne(get(decoded, "session"));

  if (!session || !session.valid) return false;

  const user = await findUser(session.userId);

  if (!user) return false;

  const accessToken = signJwt(
    { ...user, session: session.id },
    { expiresIn: config.get("accessTokenTtl") }
  );

  return accessToken;
}


// interface ISessionService {
//   createSession(valid: boolean, userId: number): Promise<void>;
//   findSessions(): Promise<Session[]>;
// }

// export class SessionService implements ISessionService {
//   async createSession(valid: boolean, userId: number): Promise<void> {
//     try {
//       const session = new Session();
//       session.valid = valid;
//       session.userId = userId;

//       await new SessionRepo().save(session);
//     } catch (error) {
//       throw new Error("Error create session");
//     }
//   }
//   findSessions(): Promise<Session[]> {
//     throw new Error("Method not implemented.");
//   }
// }
