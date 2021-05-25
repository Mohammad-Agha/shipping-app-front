import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(input: { username: $email, password: $password }) {
      access_token
      user {
        id
      }
    }
  }
`;
