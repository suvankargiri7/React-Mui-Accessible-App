import React from 'react';
import withHeader from './hocs/withheader';

const App: React.FC<{}> = () => {
  return <>This is app</>;
};

export default withHeader(App);
