import { Event } from "../models/event.model";

interface IEventRepo {
  save(event: Event): Promise<void>;
  update(event: Event): Promise<void>;
  delete(eventId: number): Promise<void>;
  retrieveById(eventId: number): Promise<Event>;
  retrieveAll(): Promise<Event[]>;
}

export class EventRepo implements IEventRepo {
  async save(event: Event): Promise<void> {
    try {
      await Event.create({
        name: event.name,
        description: event.description,
        hackerspaceId: event.hackerspaceId,
      });
    } catch (error) {
      throw new Error("Failed to create new event");
    }
  }
  async update(event: Event): Promise<void> {
    try {
      const evt = await Event.findOne({
        where: {
          id: event.id,
        },
      });
      if (!evt) {
        throw new Error("Event not found");
      }
      evt.name = event.name;
      evt.description = event.description;
      evt.hackerspaceId = event.hackerspaceId;

      await evt.save();
    } catch (error) {
      throw new Error("Failed to update event");
    }
  }
  async delete(eventId: number): Promise<void> {
    try {
      const evt = await Event.findOne({
        where: {
          id: eventId,
        },
      });
      if (!evt) {
        throw new Error("Event not found");
      }
      await evt.destroy();
    } catch (error) {
      throw new Error("Failed to delete event");
    }
  }

  async retrieveById(eventId: number): Promise<Event> {
    try {
      const evt = await Event.findOne({
        where: {
          id: eventId,
        },
      });
      if (!evt) {
        throw new Error("Event not found");
      }
      return evt;
    } catch (error) {
      throw new Error("Failed to retrieve event by id");
    }
  }
  async retrieveAll(): Promise<Event[]> {
    try {
      return await Event.findAll();
    } catch (error) {
      throw new Error("Failed to retrieve all events");
    }
  }
}
