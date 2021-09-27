import React, { useState } from "react";
import './login.css'
import {Link, Redirect} from'react-router-dom'
import { connect } from 'react-redux'
import PropTypes  from "prop-types";
import {login} from '../../actions/auth'
import { setAlert } from '../../actions/alert';


 function Login ( {login, isAuthenticated }) {
    const[formData, setFormData ] = useState({
        
        email: '',
        password: '',

        
     })
    
     const { email, password } = formData;
       
     const onChange = e =>
     setFormData({ ...formData, [e.target.name]: e.target.value });
    
     const onSubmit = e => {
        e.preventDefault();        
          
          login(email, password)
      }
    // Rerdirect if logged in
    if(isAuthenticated){
        return <Redirect to = "/List" />
    }
    

      
        return (
            <div className="login">
            <form onSubmit={e=> onSubmit(e)} >
                <h3>Sign In</h3>

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
                    <label>Password</label>
                    <input 
                    type="password"
                     className="form-control"
                     placeholder="Enter password"
                    name="password" 
                    value={password}
                    onChange={e=> onChange(e)}
                     />
                </div>

                

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <Link to='/register'>password?</Link>
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

   

login.PropTypes = {
 login: PropTypes.func.isRequired,
 isAuthenticated: PropTypes.bool
}

const mapStateToprops = state =>({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToprops, {login})(Login)