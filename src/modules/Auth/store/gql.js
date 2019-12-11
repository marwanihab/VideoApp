import { gql } from "apollo-boost";

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
      login(
      username: $username,
      password: $password,
      ){
          token
          
      }
    }
  `

export const GET_TOKEN = gql `
    {
      token @client
    }
`