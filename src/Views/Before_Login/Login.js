import React, {useState, useEffect, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../../context/user/UserContext';


export default function Login() {
  const navigate = useNavigate(); //Navigator

  const [credentials, setCredentials] = useState({ email: "", password: ""});

  // Using functionalities from user context
  const {error, setError, loginUser} = useContext(UserContext);

  // To change field values
const onchange = (e) => {
  setCredentials({...credentials, [e.target.name]: e.target.value});
};

// Login User function on form submit
const handleLogin = async (e)=> {
  e.preventDefault();

  const data = {
    email: credentials.email,
    password: credentials.password,
  };
  
// Login using Context API in user Context;
  const loggedInStatus = await loginUser(data);

  if(loggedInStatus) {
    navigate('/dashboard');
  } else {
    setCredentials({ email: "", password: ""});
  }
 
};

  useEffect(() => {
    document.title = "Log in :: Splitwise";
    setError([]);
  }, [setError]);
  return (
    <div className="middle-content">
        <main className="container">
          { error.length < 1 || !error ? 
            "" :
            <div className="login-error">
             Whoops! We couldn’t find an account for that email address and password.
            <ul>
              {/* {error} */}
              {error.map((err, i) => {
                return <li key = { i }>{err}</li>
              })}
            </ul>
            </div>
          }
          <div className="bg-wall login-wall flex justify-center align-items-center">
            <div className="card login-card">
              <div className="login-text">Log in</div>
              <div className="login-form">
                <form onSubmit={handleLogin}>
                  <div>
                    <label htmlFor="email" className="label-form">Email address </label>
                    <input type="text" className="form-control" name="email" onChange={onchange} value={credentials.email} />
                  </div>
                  <div>
                    <label htmlFor="password" className="label-form">Password</label>
                    <input type="password" className="form-control" name="password" onChange={onchange} value={credentials.password} />
                  </div>
                  <button type='submit' className="btn login-btn">Log in</button>
                  <Link to="/password_reset" className="btn forgot-btn">Forgot your password?</Link>
                </form>
                {/* <div className="login-google">
                  <p>&mdash;&mdash;&nbsp;&nbsp;or&nbsp;&nbsp;&mdash;&mdash;</p>
                  <div className="loginBtn-google">
                    <span className="icon"></span>
                    <span className="buttonText">Sign in with google</span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </main>
    </div>
  )
};
