import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import QuestionsContextProvider from './contexts/Questions';

const providers = [
  [QuestionsContextProvider, {}]
];

const RootProvider = ({ children }) => providers.reduceRight((tree, [Provider, props]) => {
  return <Provider {...props}>{tree}</Provider>
}, children);

ReactDOM.render(
  <React.StrictMode>
    <RootProvider>
      <App />
    </RootProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
