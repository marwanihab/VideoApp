import { gql } from "apollo-boost";

export const ADD_MOVIE = gql`
    mutation addMovie($movieID: String!, $sharedBy: String!) {
    addMovie(
      movieID: $movieID,
      sharedBy: $sharedBy,
      ){
        movieID
          
      }
    }
  `

export const GET_TOKEN = gql `
    {
      token @client
    }
`