import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoOnly } from '../Utils/img'

export default function ForgotPass() {
  let navigate = useNavigate();

  let emailField = document.getElementById('email-field');
  let sendOTPBtn = document.getElementById('send-otp-btn');
  let otpContent = document.getElementById('otp-content');
  let otpField = document.getElementById('otp-field');
  let verifyOTPBtn = document.getElementById('verify-otp-btn');
  let updatePassContent = document.getElementById('updatePass-content');
  let newPassField = document.getElementById('newPass-field');
  let confirmPassField = document.getElementById('confirmPass-field');
  let updatePassBtn = document.getElementById('updatePass-btn');

  const [credentials, setCredentials] = useState({email: "", otp: "", newPass: "", confirmPass: ""});
  const [success, setSuccess] = useState([]);
  const [error, setError] = useState([]);

  // Hiding the success state
  const hideSuccess = () => {
    setSuccess([]);
  };
// Hiding the error state
  const hideErr = () => {
    setError([]);
  };

// Updating state on enetering the value
  const onchange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  };

// Function to create array of error msg
const setErr = (receivedErrors) => {
  let errors = [];
  if(Array.isArray(receivedErrors)) {
    errors = receivedErrors;
  } else {
    errors.push(receivedErrors);
  }
  return errors;
};

// Function to create array of success msg
const setSuc = (receivedSuccess) => {
  let successArr = [];
  successArr.push(receivedSuccess);
  return successArr;
};

// Call API to send OTP
const handleSendOTP = async(e) => {
  e.preventDefault();
  sendOTPBtn.disabled = true;
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };
      const response = await fetch(`http://localhost:5000/user/sendOTP/${credentials.email}`, requestOptions);
      const result = await response.json();

      if(result.error) {
        hideSuccess() ; //Hide the success part if found an error
        const errors = await setErr(result.error); // Create the array of errors to display
        setError(errors); // Update Error state
        sendOTPBtn.disabled = false;
      } else {
        hideErr(); // Hide the error part if found error
        const successMsg = await setSuc(result.message);  // Create the array of success msg to display
        setSuccess(successMsg); // Update Success state
        // DOM Updates after button is clicked
        emailField.disabled = true;
        otpContent.style.display = 'block';         
      }
  } catch (e) {
    console.log(e);
  }

};

// Call API to verify OTP
const handleVerfiyOTP = async(e) => {
  e.preventDefault();
  verifyOTPBtn.disabled = true;
  try {
    const data = {
      email: credentials.email,
      otp: credentials.otp
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(data)
    };
      const response = await fetch('http://localhost:5000/user/verifyOTP/', requestOptions);
      const result = await response.json();

      if(result.error) {
        hideSuccess() ; //Hide the success part if found an error
        const errors = await setErr(result.error); // Create the array of errors to display
        setError(errors); // Update Error state
        verifyOTPBtn.disabled = false;
      } else {
        hideErr(); // Hide the error part if found error
        const successMsg = await setSuc(result.message);  // Create the array of success msg to display
        setSuccess(successMsg); // Update Success state
        // DOM Updates after button is clicked
        otpField.disabled = true;
        updatePassContent.style.display = 'block';
        setTimeout(async() => {
          hideSuccess();
          const errors = await setErr('Page Expired! Refresh the page and try again!'); // Create the array of errors to display
          setError(errors);
          newPassField.disabled = true;
          confirmPassField.disabled = true;
          updatePassBtn.disabled=true;
        }, 60000);
      }
  } catch (e) {
    console.log(e);
  }
};

// Call API to update password
const handleUpdatePass = async(e) => {
  e.preventDefault();
  updatePassBtn.disabled = true;
  try {
    const data = {
      email: credentials.email,
      newPass: credentials.newPass,
      confirmPass: credentials.confirmPass
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(data)
    };
      const response = await fetch('http://localhost:5000/user/updatePass/', requestOptions);
      const result = await response.json();

      if(result.error) {
        hideSuccess() ; //Hide the success part if found an error
        const errors = await setErr(result.error); // Create the array of errors to display
        setError(errors); // Update Error state
        updatePassBtn.disabled = false;
      } else {
        hideErr(); // Hide the error part if found error
        const successMsg = await setSuc(result.message);  // Create the array of success msg to display
        setSuccess(successMsg); // Update Success state
        // DOM Updates after button is clicked
        newPassField.disabled = true;
        confirmPassField.disabled = true;
        setTimeout(async() => {
          hideSuccess();
          const successMsg = await setSuc('Redirecting to login page within 10 seconds.'); // Create the array of errors to display
          setSuccess(successMsg);
          setTimeout(() => {
            navigate('/login');
          }, 10000);
        }, 3000);
      }
  } catch (e) {
    console.log(e);
  }
};

  useEffect(() => {
    document.title ="Reset your password :: Splitwise";
  }, []);

  return (
    <>
      {/* Error or Success */}
      {success.length < 1  || !success ?
      "" :
      <div className="reset-error pop-success">
        <button className='reset-cross' onClick={hideSuccess}>
           
        </button>
        <ul>
          {success.map((value, i) => {
                  return <li key = { i }>{value}</li>
          })}
        </ul>
      </div>
      }

      {error.length < 1  || !error ?
      "" :
      <div className="reset-error pop-error">
        <button className='reset-cross' onClick={hideErr}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <ul>
          {error.map((err, i) => {
                  return <li key = { i }>{err}</li>
          })}
        </ul>
      </div>
      }

      <div className="reset-pass-container">
        {/* Email Address Section*/}
        <div className="email-content flex">
          <img src={ logoOnly } className="reset-image" />
          <div className="reset-pass-content">
          <h2>Reset your password</h2>
          <p>Enter your email address and we'll send you a OTP to reset your password.</p>
          <form onSubmit={handleSendOTP}>
            <label htmlFor="email">
              Your email address
            </label>
            <input type="text" id='email-field' name="email" className='reset-input' value={credentials.email} onChange={onchange}/>
            {/* <div className="otp-error otp-success">
              <ul>
                <li>Invalid OTP!</li>
              </ul>
            </div> */}
            <button type='submit' id='send-otp-btn' className="reset-btn">Send OTP</button>
          </form>
        </div>
        </div>
        <div className="verifyOTP flex">
          {/* OTP Section */}
          <div className="card otp-content" id="otp-content">
            <form onSubmit={ handleVerfiyOTP }>
              <label htmlFor="otp">Enter One-Time Password (OTP)</label>
              <input type="text" className='reset-input' id="otp-field" name="otp" value={credentials.otp} onChange={onchange} />

              {/* <div className="otp-error">
              <ul>
                <li>Invalid OTP!</li>
              </ul>
              </div> */}

              <button type='submit' id="verify-otp-btn" className="reset-btn">Submit OTP</button>
            </form>
          </div>

          {/* New Password Section */}
          <div className="card updatePass-content" id="updatePass-content">
            <form onSubmit={handleUpdatePass}>
              <label htmlFor="newPass">New Password</label>
              <input type="password" className="reset-input" name='newPass' id="newPass-field" value={credentials.newPass} onChange={onchange} />
              <br />
              <label htmlFor="newPass">Confirm Password</label>
              <input type="password" className="reset-input" name='confirmPass' id="confirmPass-field" value={credentials.confirmPass} onChange={onchange}/>
              <button type='submit'  className="reset-btn" id="updatePass-btn">Update Password</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
