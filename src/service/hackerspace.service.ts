import { Hackerspace } from "../models/hackerspace.model";

export async function createHackerspace(
  userId: number,
  name: string,
  city: string
) {
  return await Hackerspace.create({ userId: userId, name: name, city: city });
}

export async function findHackerspace() {}

export async function findAndUpdateHackerspace() {}

export async function deleteHackerspace() {}
