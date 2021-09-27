import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../tools/formaData';
//import { deleteComment } from '../../actions/voiture';

const CommentItem = ({
  voitureId,
  comment: { _id, text, name,user, date },
  auth
  
}) => (
  <div className="post bg-white p-1 my-1">
    
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">Posted on {formatDate(date)}</p>
      {!auth.loading && user === auth.user._id && (
        <button
         
          type="button"
          className="btn btn-danger"
        >
          <i className="fas fa-times" />
        </button>
      )}
    </div>
  </div>
);

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
 // deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(CommentItem);