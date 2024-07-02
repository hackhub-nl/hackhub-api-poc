import { Organizer } from "../models/organizer.model";

export async function getAllOrganizers() {
  try {
    const organizers = await Organizer.findAll();

    const res = organizers.map((o) => ({
      name: o.name,
      description: o.description,
    }));

    return res;
  } catch (error) {
    throw new Error(`Failed to retrieve all organizers`);
  }
}

export async function findOrganizer(organizerId: string) {
  try {
    const organizer = await Organizer.findOne({
      where: {
        id: organizerId,
      },
    });

    return JSON.parse(JSON.stringify(organizer));
  } catch (error) {
    throw new Error(
      `Failed to retrieve organizer with organizerId: ${organizerId}`
    );
  }
}

export async function createOrganizer(name: string, description: string) {
  const organizer = await Organizer.create({
    name: name,
    description: description,
  });

  return JSON.parse(JSON.stringify(organizer));
}

export async function findAndUpdateOrganizer(
  organizerId: number,
  name: string,
  description: string
) {
  const organizer = await Organizer.findOne({
    where: {
      id: organizerId,
    },
  });

  if (!organizer) {
    throw new Error("Organizer is not found");
  }
  organizer.name = name;
  organizer.description = description;

  return await organizer.save();
}

export async function deleteOrganizer(organizerId: number) {
  const organizer = await Organizer.findOne({
    where: {
      id: organizerId,
    },
  });

  if (!organizer) {
    throw new Error("Organizer is not found");
  }
  return await organizer.destroy();
}
