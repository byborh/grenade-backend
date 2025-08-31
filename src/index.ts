import type { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';
import { createIdea, getIdeas, voteIdea } from './resolvers/ideaResolver.js';

// Definition of schema GraphQL
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

// Resolver GraphQL
const resolvers = {
  Query: {
    getIdeas: async () => getIdeas(),
  },
  Mutation: {
    createIdea: async (_: unknown, args: { text: string }) => createIdea(args.text),
    voteIdea: async (_: unknown, args: { id: string }) => voteIdea(args.id)      
  }
};

// Creation of server Apollo
const server = new ApolloServer({ typeDefs, resolvers });

// Export handler for AWS Lambda
export const handler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler()
);