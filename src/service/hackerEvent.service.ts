import { HackerEvent } from "../models/hackerEvent.model";

export async function getAllHackerEvents() {
  try {
    const hackerEvents = await HackerEvent.findAll();

    const res = hackerEvents.map((h) => ({
      name: h.name,
      description: h.description,
    }));

    return res;
  } catch (error) {
    throw new Error(`Failed to retrieve all hacker events`);
  }
}

export async function findHackerEvents(hackerEventId: string) {
  try {
    const hackerEvent = await HackerEvent.findOne({
      where: {
        id: hackerEventId,
      },
    });

    return JSON.parse(JSON.stringify(hackerEvent));
  } catch (error) {
    throw new Error(
      `Failed to retrieve hacker event with hackerEventId: ${hackerEventId}`
    );
  }
}

export async function createHackerEvent(
  hackerEventId: number,
  name: string,
  description: string
) {
  const hackerEvent = await HackerEvent.create({
    hackerEventId: hackerEventId,
    name: name,
    description: description,
  });

  return JSON.parse(JSON.stringify(hackerEvent));
}

export async function findAndUpdateHackerEvent(
  hackerEventId: number,
  name: string,
  description: string
) {
  const hackerEvent = await HackerEvent.findOne({
    where: {
      id: hackerEventId,
    },
  });

  if (!hackerEvent) {
    throw new Error("Hacker event is not found");
  }
  hackerEvent.name = name;
  hackerEvent.description = description;

  return await hackerEvent.save();
}

export async function deleteHackerEvent(hackerEventId: number) {
  const hackerEvent = await HackerEvent.findOne({
    where: {
      id: hackerEventId,
    },
  });

  if (!hackerEvent) {
    throw new Error("Hacker event is not found");
  }
  return await hackerEvent.destroy();
}
