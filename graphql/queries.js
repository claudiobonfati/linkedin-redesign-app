import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts($page: Int!, $perPage: Int!) {
    allPosts(page: $page, perPage: $perPage) {
      id
      body
      image
      video
      time
      likes
      User {
        id
        name
        photo
        headline
      }
      Company {
        id
        logo
        name
      }
      Comments {
        id
        body
        time
        User {
          id
          name
          photo
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query User($id: Int!) {
    User(id: $id) {
      id
      name
      email
      Experiences {
        title
        description
        Company {
          name
        }
      }
      Recommendations {
        description
      }
      Courses {
        title
        period
        description
        Company {
          name
        }
      }
    }
  }
`;
