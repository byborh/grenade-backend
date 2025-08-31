import { DynamoDBClient, PutItemCommand, ScanCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";
import type { Idea } from "../models/Idea.js";
import { text } from "stream/consumers";

// Create a DynamoDB client
const client = new DynamoDBClient({ region: "eu-west-3" });
const TABLE_NAME = "Ideas";

/**
 * Create a new Idea and store it in the database
 * @param text The text of the idea
 * @returns The newly created Idea
 */
export async function createIdea(text: string): Promise<Idea> {
    const id = uuidv4();
    await client.send(new PutItemCommand({
        TableName: TABLE_NAME,
        Item: {
            id: { S: id },
            text: { S: text },
            votes: { N: "0"}
        }
    }))

    return { id, text, votes: 0}
}

/**
 * Get all Ideas from the database
 * @returns An array of Ideas
 */
 export async function getIdeas(): Promise<Idea[]> {
    const data = await client.send(new ScanCommand({ TableName: TABLE_NAME }));
    return data.Items?.map(item => ({
      id: item.id.S!,
      text: item.text.S!,
      votes: Number(item.votes.N),
    })) || [];
  }


/**
 * Increment the vote counter of an Idea in the database
 * @param id The id of the Idea to vote for
 * @returns The updated Idea
 * @throws Error if the Idea is not found
 */
export async function voteIdea(id: string): Promise<Idea> {
    await client.send(new UpdateItemCommand({
      TableName: TABLE_NAME,
      Key: { id: { S: id } },
      UpdateExpression: "SET votes = votes + :inc",
      ExpressionAttributeValues: { ":inc": { N: "1" } },
      ReturnValues: "ALL_NEW"
    }));
  
    const ideas = await getIdeas();
    const idea = ideas.find(i => i.id === id);
    if (!idea) throw new Error("Idea not found");
    return idea;
  }