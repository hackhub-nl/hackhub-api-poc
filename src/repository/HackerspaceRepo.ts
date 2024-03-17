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

  async update(hackerspace: Hackerspace): Promise<void> {
    try {
      const hspace = await Hackerspace.findOne({
        where: {
          id: hackerspace.id,
        },
      });
      if (!hspace) {
        throw new Error("Hackerspace not found!");
      }
      hspace.name = hackerspace.name;
      hspace.city = hackerspace.city;

      await hspace.save();
    } catch (error) {
      throw new Error("Failed to update hackerspace!");
    }
  }

  async delete(hackerspaceId: number): Promise<void> {
    try {
      const hspace = await Hackerspace.findOne({
        where: {
          id: hackerspaceId,
        },
      });
      if (!hspace) {
        throw new Error("Hackerspace not found!");
      }
      await hspace.destroy();
    } catch (error) {
      throw new Error("Failed to delete hackerspace!");
    }
  }

  async retrieveById(hackerspaceId: number): Promise<Hackerspace> {
    try {
      const hspace = await Hackerspace.findOne({
        where: {
          id: hackerspaceId,
        },
      });
      if (!hspace) {
        throw new Error("Hackerspace not found!");
      }
      return hspace;
    } catch (error) {
      throw new Error("Failed to retrieve hackerspace by id!");
    }
  }

  async retrieveAll(): Promise<Hackerspace[]> {
    try {
      return await Hackerspace.findAll();
    } catch (error) {
      throw new Error("Failed to retrieve all hackerspaces!");
    }
  }
}