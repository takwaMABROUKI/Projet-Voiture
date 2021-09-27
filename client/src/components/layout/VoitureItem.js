import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import {connect} from 'react-redux'

const VoitureItem =({ voiture:{ _id, marque, photo, user, comment },
showActions
}) => 

    
        <div class="post bg-white p-1 my-1">
          <div>
            <a href="profile.html">
              <img
                class="round-img"
                src={photo}
                alt=""
              />
              <h4>{marque}</h4>
            </a>
          </div>
          <div>
            
             <p class="post-date">
                Posted on <Moment format ='YYYY/MM/DD'></Moment>
            </p>

            { showActions && <Fragment>
              
              <button type="button" class="btn btn-light">
              <i class="fas fa-thumbs-up"></i>
              <span></span>
            </button>
            <button type="button" class="btn btn-light">
              <i class="fas fa-thumbs-down"></i>
            </button>
            <Link to='./login' class="btn btn-primary">
              Discussion {comment.length> 0 && (
                  
                  <span class='comment-count'>{comment.length}</span>
              )}
               
            </Link>

            
              
              </Fragment>
              }
            
            
          </div>
        </div>
    

VoitureItem.defaultProps ={
  showActions: true
}

VoitureItem.propTypes = {
    voiture: PropTypes.object.isRequired
    
   
}

const mapStateToProps = (state) => ({
    
  })

export default connect() (VoitureItem)