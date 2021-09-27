import React, { Component } from 'react'
import {Button,Modal} from 'react-bootstrap'
import {connect} from 'react-redux'
import  {addVoiture} from '../../actions/voiture'
import './VoitureForm.css'


class VoitureForm extends Component {
  state={
    _id:"",
    marque:"",
    photo:"",
    comment:"",
    show:false
  }
   handleClose = () =>this.setState({show:false}) 
    
;
   handleShow = () => this.setState({show:true});

   handleChange=(e)=>{
    this.setState({
        [e.target.name]:e.target.value
    })
  }
  render() {
   
    return (
      <div className="cadre">
      <>
      <Button variant="primary" className="add" onClick={this.handleShow}>
        Add Voiture
      </Button>

      <Modal className="champs" show={this.state.show} onHide={this.handleClose} animation={false}>
      
          
        
        <Modal.Body className="titre">
            <input 
            className="input"
            placeholder="Inserer la marque" 
            name="marque" 
            type="text" 
            onChange={this.handleChange}
             value={this.state.marque}/>

        </Modal.Body>
      
        
        
        <Modal.Body className="titre">
            <input 
            className="input"
            placeholder="Inserer une photo"
            name="photo"
            type="text" 
            onChange={this.handleChange} 
            value={this.state.photo}/>

        </Modal.Body>
      
        
        <Modal.Footer className="boutons">
         <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={()=>{this.handleClose();this.props.handleAdd(this.state)}}>
            ADD
          </Button> */}
          <Button variant="primary" onClick={()=>{this.handleClose();this.props.handleAdd({
            
            marque:this.state.marque,
            photo:this.state.photo
            
            })}}>
            ADD
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    </div>
  );
}
}
const mapDispatchToProps = dispatch => {
  return{
     handleAdd: (payload) => dispatch(addVoiture(payload)),
   
 }
  }
 
export default connect(null,mapDispatchToProps)(VoitureForm);
