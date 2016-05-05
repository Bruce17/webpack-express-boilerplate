/**
 * @author Michael Raith
 * @email  mraith@gmail.com
 * @date   05.05.2016 13:02
 */

import React from 'react';
import marked from 'react-marked';
import dateFormat from 'dateformat';

export default React.createClass({
  prepareDate: function () {
    const date = new Date(this.props.date);

    if (isNaN(date)) {
      return '-';
    }
    else {
      return dateFormat(date, 'dd.mm.yyyy H:MM:ss');
    }
  },

  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {marked(this.props.children.toString(), {sanitize: true})}
        <small>date: {this.prepareDate()}</small>
      </div>
    );
  }
});
