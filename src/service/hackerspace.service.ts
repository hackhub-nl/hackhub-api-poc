import { Hackerspace } from "../models/hackerspace.model";

export async function createHackerspace(
  userId: number,
  name: string,
  city: string
) {
  return await Hackerspace.create({ userId: userId, name: name, city: city });
}

export async function findHackerspace(hackerspaceId: number) {
  return await Hackerspace.findOne({
    where: {
      id: hackerspaceId,
    },
  });
}

export async function findAndUpdateHackerspace(
  hackerspaceId: number,
  name: string,
  city: string
) {
  const hspace = await Hackerspace.findOne({
    where: {
      id: hackerspaceId,
    },
  });

  if (!hspace) {
    throw new Error("Hackerspace is not found");
  }
  hspace.name = name;
  hspace.city = city;

  return await hspace.save();
}

export async function deleteHackerspace(hackerspaceId: number) {
  const hspace = await Hackerspace.findOne({
    where: {
      id: hackerspaceId,
    },
  });

  if (!hspace) {
    throw new Error("Hackerspace is not found");
  }
  return await hspace.destroy();
}
