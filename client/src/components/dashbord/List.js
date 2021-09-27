import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VoitureItem from './VoitureItem';
//import PostForm from './PostForm';
import { getvoitures } from '../../actions/voiture';

const Voitures = ({ getvoitures, voiture: { voiture } }) => {
  useEffect(() => {
    getvoitures();
  }, [getvoitures]);

  return (
    <Fragment>
      <h1 className="large text-primary">Voitures</h1>
      
    
      <div className="voitures">
        {voiture.map((el) => (
          <VoitureItem key={el._id} voiture={el} />
        ))}
      </div>
    </Fragment>
  );
};

Voitures.propTypes = {
  getvoitures: PropTypes.func.isRequired,
  voiture: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  voiture: state.voiture
});

export default connect(mapStateToProps, { getvoitures })(Voitures);