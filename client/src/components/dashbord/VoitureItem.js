import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../tools/formaData';
import { connect } from 'react-redux';
import './VoitureItem.css'


const VoitureItem = ({
  auth,
  voiture: { _id, name, photo, user, comment, date },
  showActions
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      
        <img className="round-img" src={photo} alt="" />
        <h4>{name}</h4>
      
    </div>
    <div>
      
      {showActions && (
        <Fragment>
                    
          <Link to={`/voitures/${_id}`} className="btn btn-primary">
            Discussion{' '}
            {comment.length > 0 && (
              <span className="comment-count">{comment.length}</span>
            )}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
             
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times" />
            </button>
          )}
        </Fragment>
      )}
    </div>
  </div>
);

VoitureItem.defaultProps = {
  showActions: true
};

VoitureItem.propTypes = {
  voiture: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(
  VoitureItem
);