import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AnimationContextProvider from './contexts/Animation';
import FormContextProvider from './contexts/Form';
import QuestionsContextProvider from './contexts/Questions';

const providers = [
  [QuestionsContextProvider, {}],
  [AnimationContextProvider, {}],
  [FormContextProvider, {}]
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
