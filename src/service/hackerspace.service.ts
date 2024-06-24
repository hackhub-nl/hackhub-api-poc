import { omit } from "lodash";
import { Hackerspace } from "../models/hackerspace.model";

export async function getAllHackerspaces() {
  try {
    const hackerspaces = await Hackerspace.findAll();

    const res = hackerspaces.map((h) => ({
      name: h.name,
      city: h.city,
    }));

    return res;
  } catch (error) {
    throw new Error(`Failed to retrieve all hackerspaces`);
  }
}

export async function findHackerspace(hackerspaceId: string) {
  try {
    const hspace = await Hackerspace.findOne({
      where: {
        id: hackerspaceId,
      },
    });
    return omit(
      JSON.parse(JSON.stringify(hspace)),
      "id",
      "userId",
      "createdAt",
      "updatedAt"
    );
  } catch (error) {
    throw new Error(
      `Failed to retrieve hackerspace with hackerspaceId: ${hackerspaceId}`
    );
  }
}

export async function createHackerspace(
  userId: number,
  name: string,
  city: string
) {
  const hspace = await Hackerspace.create({
    userId: userId,
    name: name,
    city: city,
  });
  return JSON.parse(JSON.stringify(hspace));
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
