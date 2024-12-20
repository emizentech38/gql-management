const transactionTypeDef = `#graphql

#transcation
type Transaction  {
    _id:ID!
    userId:ID!
    description:String!
    paymentType:String!
    category:String!
    amount:Float!
    location:String!
    date:String!    
}

#query get function
type Query  {
    transactions:[Transaction!]
    transaction(transactionId:ID!): Transaction!
    #TODO => ADD categoryStatistics query
}

#mutation = post/delete/patch function
# fun(inp):return
type Mutation  {
    createTransaction(input:CreateTransactionInput!):Transaction!
    updateTransaction(input:UpdateTransactionInput!):Transaction!
    deleteTransaction(transactionId:ID!):Transaction!
}

input CreateTransactionInput {
    description:String!
    paymentType:String!
    category:String!
    amount:Float!
    location:String!
    date:String!    
}

input UpdateTransactionInput {
    transactionId:ID!
    description:String
    paymentType:String
    category:String
    amount:Float
    location:String
    date:String  
}
`;

export default transactionTypeDef;
