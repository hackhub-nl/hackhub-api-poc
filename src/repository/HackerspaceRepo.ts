import { Hackerspace } from "../model/Hackerspace";

interface IHackerspaceRepo {
  save(hackerspace: Hackerspace): Promise<void>;
  update(hackerspace: Hackerspace): Promise<void>;
  delete(hackerspaceId: number): Promise<void>;
  retrieveById(hackerspaceId: number): Promise<Hackerspace>;
  retrieveAll(): Promise<Hackerspace[]>;
}

export class HackerspaceRepo implements IHackerspaceRepo {
  async save(hackerspace: Hackerspace): Promise<void> {
    try {
      await Hackerspace.create({
        name: hackerspace.name,
        city: hackerspace.city,
      });
    } catch (error) {
      throw new Error("Failed to create hackerspace!");
    }
  }
  update(hackerspace: Hackerspace): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(hackerspaceId: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  retrieveById(hackerspaceId: number): Promise<Hackerspace> {
    throw new Error("Method not implemented.");
  }
  retrieveAll(): Promise<Hackerspace[]> {
    throw new Error("Method not implemented.");
  }
}
