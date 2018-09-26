import  ApolloClient, { InMemoryCache } from 'apollo-boost';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo'
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://localhost/4000',
});


ReactDOM.render(
  (<ApolloProvider client={client}>
    <App />,
  </ApolloProvider>),
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
