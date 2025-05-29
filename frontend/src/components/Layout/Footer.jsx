import React, { useContext } from 'react'
import { Context } from '../../main'
import { Link } from 'react-router-dom'
import {FaFacebook,FaYoutube} from 'react-icons/fa'
import{RiInstagramFill} from 'react-icons/ri'
//import { isAuthorized } from '../../../../backend/middlewares/auth'


const Footer = () => {
  const{isAuthorized} = useContext(Context)
  return (
    <footer className={isAuthorized ? "footerShow":"footerHide" }>
      <div>&copy; All Rights Reserved.</div>
      <div>
        <Link to={'/'} target="_blank"><FaFacebook/></Link>
        <Link to={'/'} target="_blank"><FaYoutube/></Link>
        
      </div>
    </footer>
    
  )
}

export default Footer;