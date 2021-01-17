import { useQuery } from '@apollo/client';
import {
  GET_POSTS,
  GET_USERS,
  GET_USERS_POSTS,
  GET_COMPANIES_POSTS,
  GET_PROFILE,
  GET_SIMPLE_USER,
  GET_ARTICLES,
  GET_USER_POSTS,
} from './queries';
import ApolloClient from './apollo';

export const usePosts = (page, perPage) => {
  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: {
      page,
      perPage,
    },
  });

  if (!loading && data) {
    return {
      loading,
      error,
      data: data.allPosts,
    };
  }

  return {
    loading,
    error,
    data,
  };
};

export const fetchMorePosts = async (page, perPage) => {
  let result = await ApolloClient.query({
    query: GET_POSTS,
    variables: {
      page,
      perPage,
    },
  });

  result.data = result.data.allPosts;

  return result;
};

export const fetchMoreUsersPosts = async (page, perPage) => {
  let result = await ApolloClient.query({
    query: GET_USERS_POSTS,
    variables: {
      page,
      perPage,
    },
  });

  result.data = result.data.allPosts;

  return result;
};

export const fetchMoreCompaniesPosts = async (page, perPage) => {
  let result = await ApolloClient.query({
    query: GET_COMPANIES_POSTS,
    variables: {
      page,
      perPage,
    },
  });

  result.data = result.data.allPosts;

  return result;
};

export const useUser = (username) => {
  const { loading, error, data } = useQuery(GET_PROFILE, {
    variables: {
      username,
    },
  });

  if (!loading && data) {
    return {
      loading,
      error,
      data: data.allUsers[0],
    };
  }

  return {
    loading,
    error,
    data,
  };
};

export const getSimpleUser = async (id) => {
  let result = await ApolloClient.query({
    query: GET_SIMPLE_USER,
    variables: {
      id,
    },
  });

  result.data = result.data.User;

  return result;
};

export const fetchMoreArticles = async (page, perPage) => {
  let result = await ApolloClient.query({
    query: GET_ARTICLES,
    variables: {
      page,
      perPage,
    },
  });

  result.data = result.data.allArticles;

  return result;
};

export const fetchMoreUserPosts = async (page, perPage, userId) => {
  let result = await ApolloClient.query({
    query: GET_USER_POSTS,
    variables: {
      page,
      perPage,
      userId,
    },
  });

  result.data = result.data.allPosts;

  return result;
};

export const useContacts = (page, perPage, exclude) => {
  const { loading, error, data } = useQuery(GET_USERS, {
    variables: {
      page,
      perPage,
    },
  });

  if (!loading && data) {
    return {
      loading,
      error,
      data: data.allUsers.filter((user) => user.id !== exclude),
    };
  }

  return {
    loading,
    error,
    data,
  };
};
