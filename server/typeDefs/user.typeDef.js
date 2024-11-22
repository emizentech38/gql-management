const userTypeDef = `#graphql
type User {
    _id:ID!
    username:String!
    name:String!
    password:String!
    profilePicture: String
    gender:String!
}

#type query  waht are the queries that client need
type Query  {
    users:[User!]
    #auth user will if authenticated send user else null
    authUser:User
    user(userId:ID!): User!
}

#type mutation cover all the type of the function that are need for user such as login sign up and logout
#fun(input):what it return
type Mutation  {
    signUp(input:SignUpInput!):User
    login(input:LoginInInput!):User
    logout:LogoutResponse
}

# at the last the type of the input 
input SignUpInput  {
    username:String!
    name:String!
    password:String!
    gender:String!
}

input LoginInInput  {
    username:String!
    password:String!
}

type LogoutResponse  {
    message:String!
}
`;

export default userTypeDef;
