import { describe, it, expect } from "vitest";
import { createIdea, getIdeas, voteIdea } from "../src/resolvers/ideaResolver.js";

describe("Grenade - Ideas", () => {
    it("createIdea() should create a valid idea", () => {
        const idea = createIdea("Aller à Amsterdam");
        expect(idea.text).toBe("Aller à Amsterdam");
        expect(idea.votes).toBe(0);
        expect(idea.id).toBeDefined();
    })

    it("getIdeas() should return a list of ideas", () => {
        createIdea("Faire du Peer Programming");
        const ideas = getIdeas();
        expect(Array.isArray(ideas)).toBe(true);
        expect(ideas[0]).toHaveProperty("id");
        expect(ideas[0]).toHaveProperty("text");
        expect(ideas[0]).toHaveProperty("votes");
    })

    it("voteIdea() should increment votes", () => {
        const idea = createIdea("Pizza party");
        const updated = voteIdea(idea.id);
        expect(updated.votes).toBe(1);
    })
})