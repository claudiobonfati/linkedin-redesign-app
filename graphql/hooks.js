import { useQuery } from '@apollo/client';
import { GET_POSTS } from './queries';
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

export const fetchMore = async (page, perPage) => {
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
