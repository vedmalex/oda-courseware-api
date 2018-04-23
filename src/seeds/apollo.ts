import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient, NetworkStatus, WatchQueryOptions } from 'apollo-client';
import { ExecutionResult, GraphQLError } from 'graphql'
import { ApolloLink, concat } from 'apollo-link';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { reshape } from 'oda-lodash';

const apollo = ({ uri, token }) => {
  const httpLink = new BatchHttpLink({ uri });
  if (token) {
    const authMiddleware = new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : null,
        }
      });
      return forward(operation);
    });
    return new ApolloClient({
      link: concat(authMiddleware, httpLink),
      cache: new InMemoryCache()
    });
  } else {
    return new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache()
    });
  }
}

export default (connection: { uri: string, token: string }) => ({
  query: (arg: WatchQueryOptions) => apollo(connection).query(arg)
    .then(res => res.data ? {
      ...res,
      data: reshape(arg.query, res.data),
    } : res),
  mutate: (arg) => apollo(connection).mutate(arg),
});