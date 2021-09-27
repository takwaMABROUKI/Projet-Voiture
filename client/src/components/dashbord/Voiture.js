import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//import Spinner from '../layout/Spinner';
import VoitureItem from '../dashbord/VoitureItem';
import CommentForm from '../dashbord/CommentForm';
import CommentItem from '../dashbord/CommentItem';
import { getVoiture1 } from '../../actions/voiture';

const Voiture = ({ getVoiture1, voiture: { voiture, loading }, match }) => {
  useEffect(() => {
    getVoiture1(match.params.id);
  }, [getVoiture1, match.params.id]);

  return (
    <Fragment>
      <Link to="/voitures" className="btn">
        Back To Voitures
      </Link>
      <VoitureItem voiture={voiture} showActions={false} />
      <CommentForm voitureId={voiture._id} />
      <div className="comments">
        {voiture.comment.map((el) => (
          <CommentItem key={el._id} comment={el} voitureId={voiture._id} />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getVoiture1: PropTypes.func.isRequired,
  voiture: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  voiture: state.voiture
});

export default connect(mapStateToProps, { getVoiture1 })(Voiture);