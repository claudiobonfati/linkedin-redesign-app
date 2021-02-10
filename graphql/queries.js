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
        username
        photo
        headline
      }
      Company {
        id
        logo
        name
        nameslug
      }
      Comments {
        id
        body
        time
        User {
          id
          name
          username
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
        username
        photo
        headline
      }
      Company {
        id
        logo
        name
        nameslug
      }
      Comments {
        id
        body
        time
        User {
          id
          name
          username
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
        username
        photo
        headline
      }
      Company {
        id
        logo
        name
        nameslug
      }
      Comments {
        id
        body
        time
        User {
          id
          name
          username
          photo
        }
      }
    }
  }
`;

export const GET_PROFILE = gql`
  query GetUser($username: String!) {
    allUsers(page: 0, perPage: 1, filter: { 
      username: $username 
    }) {
      id
      name
      username
      photo
      headline
      email
      twitter
      skype
      connections
      place
      summary
      Experiences {
        id
        title
        description
        period
        Company {
          id
          logo
          name
          nameslug
        }
      }
      Recommendations {
        id
        description
        Author {
          id
          name
          username
          photo
          headline
        }
      }
      Courses {
        id
        title
        period
        description
        Company {
          id
          logo
          name
          nameslug
        }
      }
      Follows {
        id
        Company {
          id
          name
          nameslug
          cover
        }
      }
    }
  }
`;

export const GET_SIMPLE_USER = gql`
  query GetSimpleUser($username: String!) {
    allUsers(page: 0, perPage: 1, filter: { 
      username: $username 
    }) {
      id
      name
      username
      photo
      headline
      email
      twitter
      skype
      connections
    }
  }
`;

export const GET_ARTICLES = gql`
  query GetArticles($page: Int!, $perPage: Int!) {
    allArticles(page: $page, perPage: $perPage) {
      id
      title
      body
      image
      video
      fullArticle
      likes
      time
      User {
        id
        name
        username
        photo
        headline
      }
      Company {
        id
        logo
        name
        nameslug
      }
    }
  }
`;

export const GET_USER_POSTS = gql`
  query GetPosts($page: Int!, $perPage: Int!, $userId: ID!) {
    allPosts(page: $page, perPage: $perPage, filter: {
      user_id: $userId
    }) {
      id
      body
      image
      video
      time
      likes
      User {
        id
        name
        username
        photo
        headline
      }
      Company {
        id
        logo
        name
        nameslug
      }
      Comments {
        id
        body
        time
        User {
          id
          name
          username
          photo
        }
      }
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers($page: Int!, $perPage: Int!) {
    allUsers(page: $page, perPage: $perPage) {
      id
      name
      username
      photo
      headline
    }
  }
`;

export const GET_COMPANY = gql`
  query GetCompany($nameslug: String!) {
    allCompanies(page: 0, perPage: 1, filter: { 
      nameslug: $nameslug 
    }) {
      id
      name
      nameslug
      website
      industry
      headquartes
      founded
      mission
      followers
      employees
      logo
      cover
      description
      Posts {
        id
        body
        image
        video
        time
        likes
        Comments {
          id
          body
          time
          User {
            id
            name
            username
            photo
          }
        }
      }
    }
  }
`;

export const GET_CHAT_USERS_LIST = gql`
  query GetChatUsersList($userId: ID!) {
    allChats(page: 0, perPage: 100, filter: { 
      author_id: $userId 
    }) {
      id
      preview
      User {
        id,
        name,
        username,
        photo,
        skype,
        twitter,
        email,
        lastOnline
      }
    }
  }
`;

export const GET_CHAT_CONVERSATION = gql`
  query GetChatConversation($userId: ID!, $targetId: ID!) {
    allChats(page: 0, perPage: 1000, filter: { 
      author_id: $userId,
      user_id: $targetId,
    }) {
      interactions
    }
  }
`;

export const SEARCH_USERS_COMPANIES = gql`
  query QuickSearch($search: String!, $limit: Int!) {
    allUsers(page: 0, perPage: $limit, filter: {
      q: $search,
    }) {
      name
      username
      photo
      headline
    }
    allCompanies(page: 0, perPage: $limit, filter: {
      q: $search,
    }) {
      name
      nameslug
      logo
      headquartes
    }
  }
`;
