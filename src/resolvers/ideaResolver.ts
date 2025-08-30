import type { Idea } from "../models/Idea.js";

let Ideas: Idea[] = [];

export function createIdea(text: string): Idea {
    const newIdea: Idea = {
        id: crypto.randomUUID(),
        text,
        votes: 0
    }
    Ideas.push(newIdea);
    return newIdea;
}

export function getIdeas(): Idea[] {
    return Ideas;
}

export function voteIdea(id: string) {
    const idea = Ideas.find(idea => idea.id === id);
    if(!idea) throw new Error("Idea not found");
    idea.votes += 1;
    return idea;
}