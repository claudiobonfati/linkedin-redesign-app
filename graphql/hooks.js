import { useQuery } from '@apollo/client';
import {
  GET_POSTS,
  GET_USERS,
  GET_USERS_POSTS,
  GET_USER_POSTS,
  GET_PROFILE,
  GET_SIMPLE_USER,
  GET_ARTICLES,
  GET_COMPANY,
  GET_COMPANIES,
  GET_COMPANIES_POSTS,
  GET_CHAT_USERS_LIST,
  GET_CHAT_UNREAD_USERS_LIST,
  GET_CHAT_CONVERSATION,
  GET_NOTIFICATIONS,
  GET_VIEWERS,
  GET_REQUESTS,
  GET_NOTIFICATION_MESSAGES,
  SEARCH_USERS_COMPANIES,
  SEARCH_POSTS,
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
  try {
    let result = await ApolloClient.query({
      query: GET_ARTICLES,
      variables: {
        page,
        perPage,
      },
    });

    result.data = result.data.allArticles;
    result.loading = false;
    result.error = false;

    return result;
  } catch (e) {
    let result = {
      loading: false,
      error: true,
    };

    return result;
  }
};

export const fetchMoreUserPosts = async (page, perPage, userId) => {
  try {
    let result = await ApolloClient.query({
      query: GET_USER_POSTS,
      variables: {
        page,
        perPage,
        userId,
      },
    });

    result.data = result.data.allPosts;
    result.loading = false;
    result.error = false;

    return result;
  } catch (e) {
    let result = {
      loading: false,
      error: true,
    };

    return result;
  }
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

export const getRandomUsers = async (limit, exclude) => {
  let result = await ApolloClient.query({
    query: GET_USERS,
    variables: {
      page: 0,
      perPage: 100,
    },
  });

  let newResult = result.data.allUsers.filter((user) => user.id != exclude);
  newResult = newResult.map((x) => x);
  newResult = newResult.sort(() => Math.random() - 0.5);
  newResult = newResult.slice(0, limit);

  return newResult;
};

export const useRandomUsers = (limit, exclude = null) => {
  const { loading, error, data } = useQuery(GET_USERS, {
    variables: {
      page: 0,
      perPage: 100,
    },
  });

  if (!loading && data) {
    let newResult;

    if (exclude) {
      newResult = data.allUsers.filter((company) => company.id != exclude);
      newResult = newResult.map((x) => x);
    } else {
      newResult = data.allUsers.map((x) => x);
    }

    newResult = newResult.sort(() => Math.random() - 0.5);
    newResult = newResult.slice(0, limit);

    return {
      loading,
      error,
      data: newResult,
    };
  }

  return {
    loading,
    error,
    data,
  };
};

export const getRandomCompanies = async (limit, exclude = null) => {
  let result = await ApolloClient.query({
    query: GET_COMPANIES,
    variables: {
      page: 0,
      perPage: 100,
    },
  });

  let newResult;

  if (exclude) {
    newResult = result.data.allCompanies.filter((company) => company.id != exclude);
    newResult = newResult.map((x) => x);
  } else {
    newResult = result.data.allCompanies.map((x) => x);
  }

  newResult = newResult.sort(() => Math.random() - 0.5);
  newResult = newResult.slice(0, limit);

  return newResult;
};

export const useRandomCompanies = (limit, exclude = null) => {
  const { loading, error, data } = useQuery(GET_COMPANIES, {
    variables: {
      page: 0,
      perPage: 100,
    },
  });

  if (!loading && data) {
    let newResult;

    if (exclude) {
      newResult = data.allCompanies.filter((company) => company.id != exclude);
      newResult = newResult.map((x) => x);
    } else {
      newResult = data.allCompanies.map((x) => x);
    }

    newResult = newResult.sort(() => Math.random() - 0.5);
    newResult = newResult.slice(0, limit);

    return {
      loading,
      error,
      data: newResult,
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

export const useChatUnreadUsersList = (userId) => {
  const { loading, error, data } = useQuery(GET_CHAT_UNREAD_USERS_LIST, {
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
      data: data.allChats[0],
    };
  }

  return {
    loading,
    error,
    data,
  };
};

export const useSearchUsersCompanies = (search, page = 0, limit = 100) => {
  const { loading, error, data } = useQuery(SEARCH_USERS_COMPANIES, {
    variables: {
      search,
      page,
      limit,
    },
  });

  if (!loading && data) {
    return {
      loading,
      error,
      data,
    };
  }

  return {
    loading,
    error,
    data,
  };
};

export const fetchMoreSearchPosts = async (page, perPage, search) => {
  let result = await ApolloClient.query({
    query: SEARCH_POSTS,
    variables: {
      page,
      perPage,
      search,
    },
  });

  result.data = result.data.allPosts;

  return result;
};

export const useNotifications = (page, perPage) => {
  const { loading, error, data } = useQuery(GET_NOTIFICATIONS, {
    variables: {
      page,
      perPage,
    },
  });

  if (!loading && data) {
    return {
      loading,
      error,
      data: data.allNotifications,
    };
  }

  return {
    loading,
    error,
    data,
  };
};

export const useViewers = (page, perPage) => {
  const { loading, error, data } = useQuery(GET_VIEWERS, {
    variables: {
      page,
      perPage,
    },
  });

  if (!loading && data) {
    return {
      loading,
      error,
      data: data.allViewers,
    };
  }

  return {
    loading,
    error,
    data,
  };
};

export const useRequests = (page, perPage) => {
  const { loading, error, data } = useQuery(GET_REQUESTS, {
    variables: {
      page,
      perPage,
    },
  });

  if (!loading && data) {
    return {
      loading,
      error,
      data: data.allRequests,
    };
  }

  return {
    loading,
    error,
    data,
  };
};

export const useNotificationMessages = (page, perPage) => {
  const { loading, error, data } = useQuery(GET_NOTIFICATION_MESSAGES, {
    variables: {
      page,
      perPage,
    },
  });

  if (!loading && data) {
    return {
      loading,
      error,
      data: data.allMessages,
    };
  }

  return {
    loading,
    error,
    data,
  };
};
