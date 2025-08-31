import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@aws-sdk/client-dynamodb", async () => {
  const actual = await vi.importActual<any>("@aws-sdk/client-dynamodb");

  const proxy = new Proxy(actual, {
    get: (target, prop) => {
      if (!(prop in target)) {
        return vi.fn();
      }
      return target[prop];
    },
  });

  return proxy;
});

vi.mock("@aws-sdk/lib-dynamodb", async () => {
  const actual = await vi.importActual<any>("@aws-sdk/lib-dynamodb");

  return {
    ...actual,
    DynamoDBDocumentClient: {
      from: vi.fn().mockReturnValue({
        send: vi.fn().mockResolvedValue({}),
      }),
    },
  };
});

import { createIdea, getIdeas, voteIdea } from "../../src/resolvers/ideaResolver.js";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Grenade - Ideas (unit tests)", () => {
  it("createIdea() should create a valid idea", async () => {
    const idea = createIdea("Aller à Amsterdam");
    expect((await idea).text).toBe("Aller à Amsterdam");
    expect((await idea).votes).toBe(0);
    expect((await idea).id).toBeDefined();
  });

  it("getIdeas() should return a list of ideas", async () => {
    createIdea("Faire du Peer Programming");
    const ideas = getIdeas();
    expect(Array.isArray(ideas)).toBe(true);
    expect(ideas[0]).toHaveProperty("id");
    expect(ideas[0]).toHaveProperty("text");
    expect(ideas[0]).toHaveProperty("votes");
  });

  it("voteIdea() should increment votes", async () => {
    const idea = createIdea("Pizza party");
    const updated = voteIdea((await idea).id);
    expect((await updated).votes).toBe(1);
  });
});
