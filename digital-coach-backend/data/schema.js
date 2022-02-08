const { gql } = require('apollo-server');

const typeDefs = gql`
type User {
    userID: ID!
    username: String!
    profile: Profile!
    interviewSets: [QuestionSet]!

}

type QuestionSet{
    questionSetID: ID!
    name: String!
    questions: [Question]!
    public: Boolean!
    creator: User!
    progress: Int!
}

type Question{
    questionID: ID!
    question: String!
    description: String!
    length: Int!
}

type Profile{
    userID: ID!
    firstName: String!
    lastName: String!
    email: String!
    industry: String!
    university: String!
    experience: String!
    averageScore: Int!
}



type Score{
    scoreID: ID!
    sentimentScore: Float
    emotionScore: Float
    contentScore: Float
    userID: ID!
    feedback: [String]

}

type Interview{
    interviewID: ID!
    userID: ID!
    date: String!
    score: Score
    blobURL: String!
    thumbnailURL: String!

}

type Query{
    getUser(userID: ID!): User
    getUserByUsername(username: String!): User
    getProfile(userID: ID!): Profile
    getInterview(interviewID: ID!): Interview
    getInterviews(userID: ID!): [Interview]
}
type Mutation{
    addInterview(userID: ID!, blobURL: String!, date: String!): Interview
    addScore(scoreID: ID!, sentimentScore: Float, emotionScore: Float, contentScore: Float, userID: ID!): Score
    updateProfile(userID: ID!, firstName: String!, lastName: String!, email: String!): Profile

}
`

const resolvers = {
    Query: {
    },
    Mutation: {
    }
}

module.exports = {
    typeDefs,
    resolvers
}