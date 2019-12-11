import React from 'react';
import { render } from 'react-dom';

import { ApolloProvider } from '@apollo/react-hooks';
import Router from './pages/Router'

import ApolloClient, { InMemoryCache } from 'apollo-boost';

export const client = new ApolloClient(
  {
    cache: new InMemoryCache(),
    uri: 'https://mighty-scrubland-05134.herokuapp.com/',
    request: (operation) => {
      const token = localStorage.getItem('token')
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : ''
        }
      })
    },
    // resolvers,
  }
);

export const App = () => (
  <ApolloProvider client={client}>
    <Router />
  </ApolloProvider>
);

render(<App />, document.getElementById('root'));