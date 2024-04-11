// import { Session } from "../models/session.model";

// interface ISessionRepo {
//   save(session: Session): Promise<void>;
//   retrieveAll(): Promise<Session[]>;
//   getById(sessionId: number): Promise<Session>;
// }

// export class SessionRepo implements ISessionRepo {
//   async save(session: Session): Promise<void> {
//     try {
//       await Session.create({
//         valid: session.valid,
//         UserId: session.userId,
//       });
//     } catch (error) {
//       throw new Error("Failed to create new session");
//     }
//   }
//   async retrieveAll(): Promise<Session[]> {
//     try {
//       return await Session.findAll();
//     } catch (error) {
//       throw new Error("Failed to retrieve all sessions");
//     }
//   }

//   async getById(sessionId: number): Promise<Session> {
//     try {
//       const ssn = await Session.findOne({
//         where: {
//           id: sessionId,
//         },
//       });

//       if (!ssn) {
//         throw new Error("Session not found!");
//       }
//       return ssn;
//     } catch (error) {
//       throw new Error("Failed to get session by id!");
//     }
//   }
// }
