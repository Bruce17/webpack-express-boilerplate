/**
 * @author Michael Raith
 * @email  mraith@gmail.com
 * @date   05.05.2016 12:56
 */

import React from 'react';

import CommentList from './CommentList/CommentList';
import CommentForm from './CommentForm/CommentForm';

export default React.createClass({
  /**
   * Fetch json comment data from the provided url from the backend.
   */
  loadCommentsFromServer: function () {
    this.serverRequest = $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: (result) => {
        this.setState({data: result});
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  },

  /**
   * Submit comment to the server and refresh the comment list.
   *
   * @param {{author:string, text:string}} comment
   */
  handleCommentSubmit: function(comment) {
    this.serverRequest = $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: (data) => {
        this.setState({data: data});
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  },

  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
    this.loadCommentsFromServer();

    // Update data in an interval
    setInterval(this.loadCommentsFromServer, this.props.pollInterval)
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function () {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});
