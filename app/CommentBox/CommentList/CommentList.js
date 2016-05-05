/**
 * @author Michael Raith
 * @email  mraith@gmail.com
 * @date   05.05.2016 13:02
 */

import React from 'react';

import Comment from './Comment/Comment';

export default React.createClass({
  render: function () {
    const commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author} key={comment.id} date={comment.date}>
          {comment.text}
        </Comment>
      );
    });

    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});
