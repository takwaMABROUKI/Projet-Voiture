import api from '../tools/api';
import { setAlert } from './alert';
import {GET_VOITURES, VOITURE_ADD,VOITURE_REMOVE, VOITURE_EDIT,VOITURE_LOADING, VOITURE_ERROR,ADD_COMMENT, GET_VOITURE, 
  REMOVE_COMMENT} from './types';
import axios from 'axios';


// Get voiture

export  const getvoitures=()=> async dispatch=> {
   // dispatch(setItemsLoading());

  //  axios.get('/Api/voitures').then(res=>dispatch({
   //     type:GET_VOITURE,
   //    payload:res.data}))
   try {
       const res = await api.get('/voitures')
       dispatch({
           type: GET_VOITURES,
           payload: res.data
       })
   } catch (err) {
    dispatch({
        type: VOITURE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      }); 
   }
}


   //add voiture

export const addVoiture= formData => async dispatch=> {
  

  
  
  try{
    const res = await axios.post('/api/voitures',formData)
    
    dispatch(
      {
        type: VOITURE_ADD,
        payload:res.data
      })
    
   dispatch(setAlert('Voiture Created', 'success'))
    } catch (err){

      dispatch({
        type: VOITURE_ERROR,
        payload:{ msg: err.response.statusText, status: err.response.status}
      })
    }
  }



// Delete voiture
export const deleteVoiture = id => async dispatch => {
  try {
    await axios.delete(`/api/voitures/${id}`);

    dispatch({
      type: VOITURE_REMOVE,
      payload: id
    });

    dispatch(setAlert('Voiture Removed', 'success'));
  } catch (err) {
    dispatch({
      type: VOITURE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
    
export const editVoiture=(id, newVoiture)=>dispatch=>{
    axios.put(`/api/voitures/${id}`,newVoiture)
    
    .then(res=>dispatch(
        getvoitures()  
        ))
    }


    // Get voiture
export const getVoiture = id => async dispatch => {
    try {
      const res = await axios.get(`/api/voitures/${id}`);
  
      dispatch({
        type: GET_VOITURE,
        payload: res.data
      });
    } catch (err) { 
      dispatch({
        type: VOITURE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
     
    // Add comment
export const addComment = (voitureId, formData) => async dispatch => {
 
  
  
  try {
    const res = await axios.post(`/api/voitures/comment/${voitureId}`, formData);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });
   
    dispatch(setAlert('Comment Added', 'success'));
 
  } catch (err) {
    dispatch({
      type: VOITURE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
export const deleteComment = (voitureId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/voitures/comment/${voitureId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: VOITURE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
  

export const setItemsLoading=()=>(
    { type:VOITURE_LOADING

    }
)