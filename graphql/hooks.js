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
  GET_COMPANY,
  GET_CHAT_USERS_LIST,
  GET_CHAT_CONVERSATION,
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

export const getSimpleUser = async (username) => {
  let result = await ApolloClient.query({
    query: GET_SIMPLE_USER,
    variables: {
      username,
    },
  });

  let data = result.data.allUsers[0];
  result.data = data;

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

export const useCompany = (nameslug) => {
  const { loading, error, data } = useQuery(GET_COMPANY, {
    variables: {
      nameslug,
    },
  });

  if (!loading && data) {
    return {
      loading,
      error,
      data: data.allCompanies[0],
    };
  }

  return {
    loading,
    error,
    data,
  };
};

export const useChatUsersList = (userId) => {
  const { loading, error, data } = useQuery(GET_CHAT_USERS_LIST, {
    variables: {
      userId,
    },
  });

  if (!loading && data) {
    return {
      loading,
      error,
      data: data.allChats,
    };
  }

  return {
    loading,
    error,
    data,
  };
};

export const useChatConversation = (userId, targetId) => {
  const { loading, error, data } = useQuery(GET_CHAT_CONVERSATION, {
    variables: {
      userId,
      targetId,
    },
  });

  if (!loading && data) {
    return {
      loading,
      error,
      data: data.allChats,
    };
  }

  return {
    loading,
    error,
    data,
  };
};
