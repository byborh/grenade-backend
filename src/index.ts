import { ApolloServer } from "@apollo/server";
import { createIdea, getIdeas, voteIdea } from "./resolvers/ideaResolver.js";
import { startStandaloneServer } from "@apollo/server/standalone";

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
        getIdeas: () => getIdeas(),
    },
    Mutation: {
      createIdea: (_: unknown, args: { text: string }) => createIdea(args.text),
      voteIdea: (_: unknown, args: { id: string }) => voteIdea(args.id)      
    }
};

// Creation of server Appolo
const server = new ApolloServer({
    typeDefs,
    resolvers
})


// Start server standalone
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
});


console.log(`🚀 Server ready at ${url}`);