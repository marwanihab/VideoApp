import { gql } from "apollo-boost";

export const GET_MOVIES = gql`
    query getMovies {
    getMovies{
          items{
              movieID
              name
              description
              sharedBy
              likedBy
              dislikedBy

          }  
      }
    }
  `
// export const GET_LIKES = gql`
//     query getLikes($movieID: String!) {
//     getLikes(
//       movieID: $movieID
//     )
//     }
// `  
export const ADD_ACTION = gql`
       mutation addAction($movieID: String!, $name: String!, $action: action!) {
        voteForMovie(
            movieID: $movieID,
            name: $name,
            action: $action
        )
       }
`
export const GET_TOKEN = gql `
    {
      token @client
    }
`