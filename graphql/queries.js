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

export const GET_COMPANIES_POSTS = gql`
  query GetPosts($page: Int!, $perPage: Int!) {
    allPosts(page: $page, perPage: $perPage, filter: { user_id: null }) {
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

export const GET_USERS_POSTS = gql`
  query GetPosts($page: Int!, $perPage: Int!) {
    allPosts(page: $page, perPage: $perPage, filter: { company_id: null }) {
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

export const GET_PROFILE = gql`
  query GetUser($id: ID!) {
    User(id: $id) {
      id
      name
      photo
      headline
      email
      twitter
      skype
      place
      summary
      Experiences {
        title
        description
        period
        Company {
          id
          logo
          name
        }
      }
      Recommendations {
        description
        Author {
          id
          name
          photo
          headline
        }
      }
      Courses {
        title
        period
        description
        Company {
          id
          logo
          name
        }
      }
      Follows {
        Company {
          id
          name
          cover
        }
      }
    }
  }
`;

export const GET_SIMPLE_USER = gql`
  query GetSimpleUser($id: ID!) {
    User(id: $id) {
      id
      name
      photo
      headline
    }
  }
`;
