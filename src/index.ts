import { ApolloServer } from '@apollo/server';
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';
import type { APIGatewayProxyEventV2, Context, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { createIdea, getIdeas, voteIdea } from './resolvers/ideaResolver.js';

// Schéma GraphQL
const typeDefs = `
  type Idea {
    id: ID!
    text: String!
    votes: Int!
  }

  type Query {
    getIdeas: [Idea!]!
  }

  type Mutation {
    createIdea(text: String!): Idea!
    voteIdea(id: ID!): Idea!
  }
`;

const resolvers = {
  Query: {
    getIdeas: async () => getIdeas(),
  },
  Mutation: {
    createIdea: async (_: unknown, args: { text: string }) => createIdea(args.text),
    voteIdea: async (_: unknown, args: { id: string }) => voteIdea(args.id),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const baseHandler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler()
);

export const handler = async (
  event: APIGatewayProxyEventV2,
  context: Context
): Promise<APIGatewayProxyStructuredResultV2> => {
  const response = (await baseHandler(event, context, () => {})) as APIGatewayProxyStructuredResultV2;

  return {
    ...response,
    headers: {
      ...(response.headers || {}),
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
  };
};
