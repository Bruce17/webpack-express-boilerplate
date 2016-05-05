/**
 * @author Michael Raith
 * @email  mraith@gmail.com
 * @date   05.05.2016 13:02
 */

import React from 'react';

export default React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },

  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },

  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();

    const author = this.state.author.trim();
    const text = this.state.text.trim();

    if (!text || !author) {
      return;
    }

    // Send request to the server
    this.props.onCommentSubmit({author, text});

    this.setState({author: '', text: ''});
  },

  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text"
               placeholder="Your name"
               value={this.state.author}
               onChange={this.handleAuthorChange}/>
        <input type="text"
               placeholder="Say something..."
               value={this.state.text}
               onChange={this.handleTextChange}/>
        <input type="submit" value="Post" />
      </form>
    );
  }
});
