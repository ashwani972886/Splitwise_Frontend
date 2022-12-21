import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { logoOnly, splitMan } from '../Utils/img';

export default function Setup() {
  useEffect(() => {
    document.title = "Dashboard · Splitwise";
  }, []);
  return (
    <div className='setup-container flex justify-center'>
      <div className="setup-content flex justify-center">
        <img src={ splitMan } className="splitman-image" />
        <img src={ logoOnly } className="setup-image" />
        <div className="setup-options justify-center">
          <h1> Welcome to Splitwise! </h1>  
          <p className='do-first'>What would you like to do first?</p>
          <a href='#' className="btn setup-btn">
            <i className="fa-solid fa-house-chimney"></i>
            <span> Add your apartment </span>
          </a>
          <a href='#' className="btn setup-btn">
            <i className="fa-solid fa-earth-asia"></i>
            <span> Add a group trip </span>
          </a>
          <Link to='/dashboard1' className="btn setup-btn skip-setup-btn">
            <span> Skip setup for now </span>
          </Link>
          <p className='fair-calc'>Looking for our fairness calculators? 
            <a href="#"> Click here </a>
          </p>
        </div>
      </div>
    </div>
  )
}
