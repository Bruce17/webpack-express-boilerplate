import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App.js';
import CommentBox from './CommentBox/CommentBox';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={10000} />,
  document.getElementById('root')
);
