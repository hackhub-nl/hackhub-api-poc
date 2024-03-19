import { Event } from "../model/Event";

interface IEventRepo {
    save(event: Event): Promise<void>;
    update(event: Event): Promise<void>;
    delete(eventId: number): Promise<void>;
    retrieveById(eventId: number): Promise<Event>;
    retrieveAll(): Promise<Event[]>;
}

export class EventRepo implements IEventRepo {
    save(event: Event): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(event: Event): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(eventId: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    retrieveById(eventId: number): Promise<Event> {
        throw new Error("Method not implemented.");
    }
    retrieveAll(): Promise<Event[]> {
        throw new Error("Method not implemented.");
    }
    
}