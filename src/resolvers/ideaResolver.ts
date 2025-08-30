import type { Idea } from "../models/Idea.js";
import { v4 as uuidv4 } from "uuid";

// eslint-disable-next-line prefer-const
let Ideas: Idea[] = [
    {
        id: uuidv4(),
        text: "Construire une Batmobile volante",
        votes: 5
    },
    {
        id: uuidv4(),
        text: "Ouvrir un orphelinat à Bordeaux",
        votes: 2
    },
    {
        id: uuidv4(),
        text: "Organiser une mission",
        votes: 0
    }
];
export function createIdea(text: string): Idea {
    const newIdea: Idea = {
        id: uuidv4(), 
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