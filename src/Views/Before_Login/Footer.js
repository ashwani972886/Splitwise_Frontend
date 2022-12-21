import { footer, twitter, facebook, instagram, googlePlay, appStore } from '../Utils/img';
import React from 'react';

export default function Footer() {
  return (
    <>
      {
        localStorage.getItem('auth') ? 
        "" : 
        <footer>
          {/* Footer Content */}
            <div className="footer_container flex">
              {/* Footer options left side */}
              <div className="leftContent flex justify-evenly">
                {/* Splitwise options */}
                <div className="splitwise">
                  <h4 className='splitwise_head head'>Splitwise</h4>
                  <ul>
                    <li>About</li>
                    <li>Press</li>
                    <li>Blog</li>
                    <li>Jobs</li>
                    <li>Calculators</li>
                    <li>API</li>
                  </ul>
                </div>
                <div className="vr"></div>
                {/* Account options */}
                <div className="account">
                  <h4 className='account_head head'>Account</h4>
                  <ul>
                    <li>Log in</li>
                    <li>Sign up</li>
                    <li>Reset password</li>
                    <li>Settings</li>
                    <li>Splitwise Pro</li>
                    <li>Splitwise Pay</li>
                  </ul>
                </div>
                <div className="vr"></div>
                {/* More options */}
                <div className="more">
                  <h4 className='more_head head'>More</h4>
                  <ul>
                    <li>Contact us</li>
                    <li>FAQ</li>
                    <li>Terms of Service</li>
                    <li>Privacy Policy</li>
                    <li>
                      <a href="https://twitter.com/splitwise" target="_blank"><img src= { twitter } className="social_handles" alt="Twitter" /></a>
                      <a href="https://www.facebook.com/splitwise" target="_blank"><img src= { facebook } className="social_handles" alt="Facebook" /></a>
                      <a href="https://www.instagram.com/splitwise/" target="_blank"><img src= { instagram } className="social_handles" alt="Instagram" /></a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Footer options right side badges */}
              <div className="rightContent flex justify-end">
                <a href="https://play.google.com/store/apps/details?id=com.Splitwise.SplitwiseMobile" target="_blank"><img src= { googlePlay } alt="Get it on Google Play" className='store_badge' /></a>
                <a href="https://apps.apple.com/us/app/splitwise/id458023433" target="_blank"><img src= { appStore } alt="Get it on App Store" className='store_badge' /></a>
              </div>
            </div>
            {/* Bottom Image */}
            <img className="footer_img" src= { footer } alt="Splitwise" />

        </footer> 
      }
    </>
  )
};
