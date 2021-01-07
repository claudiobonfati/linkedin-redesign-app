import { useQuery } from '@apollo/client';
import {
  GET_POSTS, GET_USERS_POSTS, GET_COMPANIES_POSTS, GET_PROFILE, GET_SIMPLE_USER,
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

export const useUser = (id) => {
  const { loading, error, data } = useQuery(GET_PROFILE, {
    variables: {
      id,
    },
  });

  if (!loading && data) {
    return {
      loading,
      error,
      data: data.User,
    };
  }

  return {
    loading,
    error,
    data,
  };
};

export const useSimpleUser = (id) => {
  const { loading, error, data } = useQuery(GET_SIMPLE_USER, {
    variables: {
      id,
    },
  });

  if (!loading && data) {
    return {
      loading,
      error,
      data: data.User,
    };
  }

  return {
    loading,
    error,
    data,
  };
};
