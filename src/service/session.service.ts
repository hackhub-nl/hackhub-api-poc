import { Session } from "../models/session.model";
import { verifyJwt } from "../utils/jwt.utils";
import { get } from "lodash";
import { findUser } from "./user.service";
import config from "config";
import { signJwt } from "../utils/jwt.utils";

export async function loginSession(userId: number, userAgent: string) {
  const session = await Session.create({
    userId: userId,
    userAgent: userAgent,
  });

  return JSON.parse(JSON.stringify(session));
}

export async function findSessions(userId: number, valid: boolean) {
  try {
    const ssn = await Session.findAll({
      where: {
        userId: userId,
        valid: valid,
      },
    });
    return ssn;
  } catch (error) {
    throw new Error(
      `Failed to retrieve sessions with userId: ${userId} and valid: true`
    );
  }
}

export async function updateSession(sessionId: number, valid: boolean) {
  try {
    const ssn = await Session.findOne({
      where: {
        id: sessionId,
      },
    });

    if (!ssn) {
      throw new Error("Session not found!");
    }
    ssn.valid = valid;

    return await ssn.save();
  } catch (error) {
    throw new Error("Failed to update session!");
  }
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