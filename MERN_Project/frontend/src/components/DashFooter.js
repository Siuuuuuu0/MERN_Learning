import React from 'react'                                                                                   
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const DashFooter = () => {
  const navigate = useNavigate(); 
  const {pathName} = useLocation(); 

  const {username, status} = useAuth()

  const onGoHomeClicked = () => navigate('/');

  let goHomeButton = null; 
  if (pathName!=='/dash'){
    goHomeButton = (
        <button 
            className='dash-footer_button icon-button'
            title = 'Home'
            onClick={onGoHomeClicked}
        >
            <FontAwesomeIcon icon={faHouse} />
        </button>
    )
  }

  const content = (
    <footer className='dash-footer'>
        {goHomeButton}
        <p>Current User :{username}</p>
        <p>Status : {status}</p>
    </footer>
  );
  return content;
}

export default DashFooter