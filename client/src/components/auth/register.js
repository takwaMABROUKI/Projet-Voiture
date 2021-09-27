import React, { useState } from "react";
import './register.css'
import {Link, Redirect} from'react-router-dom'
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types'



 
 function SignUp ({setAlert, register, isAuthenticated}) {
 const[formData, setFormData ] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
 })

 const { name, email, password, password2 } = formData;
   
 const onChange = e =>
 setFormData({ ...formData, [e.target.name]: e.target.value });

 const onSubmit = e => {
    e.preventDefault();
    if (password !== password2){
      setAlert('password do not match', 'danger')
  } else{
     register({ name, email, password})
  }
}

if(isAuthenticated){
  return <Redirect to ="/List"/>
}
        return (
            <div className="register">
            <form className ="form" onSubmit={e=> onSubmit(e)} >
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label> name</label>
                    <input
                     type="text" 
                                   
                     className="form-control"
                      placeholder="name"
                    name="name" 
                    value= {name}
                    onChange={e=> onChange(e)}
                    
                    />
                </div>

                

                <div className="form-group">
                    <label>Email address</label>
                    <input 
                    type="email"
                     className="form-control"
                    placeholder="Enter email" 
                    name="email"
                    value={email}
                    onChange={e=> onChange(e)}
                
                    />
                </div>

                <div className="form-group">
                    <label>Password 1</label>
                    <input 
                    type="password" 
                    className="form-control"
                     placeholder="Enter password"
                    name="password"
                    value={password}
                    onChange={e=> onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <label>Password 2</label>
                    <input
                     type="password"
                                        
                     className="form-control" 
                     placeholder="Enter password"
                     name="password2"
                     value={password2}
                    onChange={e=> onChange(e)}
                     />
                </div>

                <button   
                type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <Link to="/login">sign in?</Link>
                </p>
            </form>
            <img
            className="img-login"
            src="https://www.challenges.fr/assets/img/2018/08/27/cover-r4x3w1000-5b84072224873-pbc18-conference-09-jpg.jpg"
            alt="image login"
          />
          </div>
        );
    }

    SignUp.propTypes = {
        setAlert: PropTypes.func.isRequired,
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
      };  

    const mapStateToprops = state =>({
        isAuthenticated: state.auth.isAuthenticated
    })
    
export default connect(mapStateToprops, {setAlert, register})(SignUp)