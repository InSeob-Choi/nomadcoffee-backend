const typeDefs = `#graphql
  type User {
    id: String!
    username: String!
    email: String!
    name: String!
    location: String!
    avatarURL: String!
    githubUsername: String
  }

  type MutationRespose {
    ok: Boolean!
    error: String
  }

  type Mutation {
    createAccount(
      username: String!
      email: String!
      name: String!
      location: String!
      avatarURL: String!
      githubUsername: String
      password: String!
    ): MutationRespose!
  }
    
  type  Query {
    seeProfile(username: String!): User
  }
`;

export default typeDefs;
