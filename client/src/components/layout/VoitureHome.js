import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner'
import VoitureItem from '../layout/VoitureItem'
import { getvoitures } from '../../actions/voiture';


const VoitureHome = ({ getvoitures, voiture: { voitures, loading } }) => {
 
    useEffect(() => {
        getvoitures();
      }, [getvoitures]);


    return loading ? <Spinner/> : (
      <Fragment>
        <h1 className=" large text-primary">Voitures</h1>
        <p className="lead">
        <i className="fas fa-user"></i> Welcome
      </p>
      
      <div className="voitures">
         { voitures.map(el => (
           <VoitureItem key={el._id} voiture={el}/>
         ))}
      </div>
      </Fragment>

    )
}

VoitureHome.propTypes = {
    getvoitures: PropTypes.func.isRequired,
    voiture: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    voiture: state.voiture
  });
  
  export default connect(mapStateToProps, { getvoitures })(VoitureHome);