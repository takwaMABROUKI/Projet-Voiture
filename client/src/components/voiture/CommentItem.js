import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Moment from 'react-moment'
import {deleteComment} from '../../actions/voiture'
import './CommentItem.css'

const CommentItem =({
    voitureId,
    comment: {_id, text, name, user, date},
    auth,
    deleteComment

  }) => (
    <div className="comment">
        
          <div className="bloc">
            <h4 className="name">{name}</h4>
          </div>
          <div>
            <p class="my-1">
              {text}
            </p>
             <p class="post-date">
                Posted on <Moment format = 'YYYY/MM/DD'>{date}</Moment>
            </p>
            { !auth.loading && user === auth.user._id && (
              <button onClick={ e => deleteComment(voitureId, _id)} type="button" className="btn btn-danger">
               <i className="fas.fa-times"></i>
              </button>
            )}
          </div>
    </div>
    
)

CommentItem.propTypes = {
 
  voitureId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    
auth: state.auth
    
})

export default connect (mapStateToProps, {deleteComment})(CommentItem)