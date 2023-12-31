export const schema = gql`

scalar Upload

  type File {
    id: Int!
    name: String!
    url: String!
  }
  type Query {
    files: [File!]! @requireAuth
    file(id: Int!): File @requireAuth
  }

  input CreateFileInput {
    name: String!
    url: String!
    file: Upload!
  }

  input UpdateFileInput {
    name: String
    url: String
  }

  type Mutation {
    createFile(input: CreateFileInput!): File! @requireAuth
    updateFile(id: Int!, input: UpdateFileInput!): File! @requireAuth
    deleteFile(id: Int!): File! @requireAuth
  }


`
