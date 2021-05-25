import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      input: {
        email: $email
        password: $password
        password_confirmation: $confirmPassword
      }
    ) {
      tokens {
        access_token
        user {
          id
        }
      }
    }
  }
`;
