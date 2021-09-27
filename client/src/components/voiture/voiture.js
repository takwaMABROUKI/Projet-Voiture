import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner'
import VoitureItem from '../voitures/VoitureItem'
import CommentItem from '../voiture/CommentItem'
import {getVoiture} from '../../actions/voiture'
import CommentForm from './commentForm';

const Voiture = ({getVoiture, voiture: {voiture, loading }, match }) =>{
    useEffect(()=> {
        getVoiture(match.params.id)
    }, [getVoiture])
    
    return loading || voiture === null ? 
       ( <Spinner /> 
       ) : (
       <Fragment>
        <Link to="/List" className="btn">
        Back to cars
       </Link>
        <VoitureItem voiture={voiture} showActions={false}/>
       
       <CommentForm voitureId={voiture._id}/>
       <div className="comments">
         {voiture.comment.map(el => (
             <CommentItem key={el._id} comment= {el} voitureId= {voiture._id}/>
         ))}
       </div>
      
       </Fragment>
       )

}

Voiture.prpTypes = {
   getVoiture: PropTypes.func.isRequired,
   voiture: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    voiture: state.voiture
})

export default connect(mapStateToProps, {getVoiture})(Voiture)