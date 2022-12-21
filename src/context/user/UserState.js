import { useState } from "react";
import UserContext from "./UserContext";

const UserState = (props) => {
    const host = 'http://localhost:5000/user';
    const [user, setUser] = useState([]);
    const [error, setError] = useState([]);
    const [friends, setFriends] = useState([]);
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
    // const setSuc = (receivedSuccess) => {
    //     let successArr = [];
    //     successArr.push(receivedSuccess);
    //     return successArr;
    // };

    // Function to fetch user friends
    const fetchFriends = async() => {
      try{
          const authToken = localStorage.getItem('auth');
          const requestOptions = {
              method: 'GET',
              headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              "Authorization": `Bearer ${authToken}`
              }
          };

          const response = await fetch(`${host}/friends`, requestOptions);
          
          const result = await response.json();
          if(result.error) {
              const errors = await setErr(result.error);
              setError(errors);
              return false; 
          } else {
              setFriends( result.result );
              localStorage.setItem('user', JSON.stringify(result.result));
              return true;
          }

      } catch(e) {
          console.log(e);
      }
  };

    // Function to fetch user details
    const fetchUser = async() => {
        try{
            const authToken = localStorage.getItem('auth');
            const requestOptions = {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                "Authorization": `Bearer ${authToken}`
                }
            };

            const response = await fetch(`${host}/`, requestOptions);
            
            const result = await response.json();
            if(result.error) {
                const errors = await setErr(result.error);
                setError(errors);
                return false; 
            } else {
                setUser( result.result );
                fetchFriends();
                localStorage.setItem('user', JSON.stringify(result.result));
                return true;
            }

        } catch(e) {
            console.log(e);
        }
    };

    // Function to create user
    const signUpUser = async(data) => {
        try {
            const requestOptions = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
              },
              body: JSON.stringify(data ),
            };
              const response = await fetch(`${host}/`, requestOptions);
              const result = await response.json();
              if(result.error) {
                const errors = await setErr(result.error);
                setError(errors);
                return false;
              } else {
                localStorage.setItem('auth', result.result.authToken);
                const userDetails = fetchUser();
                if(userDetails){
                    return true;
                } else {
                    return false;
                }
              }
          } catch (e) {
            console.log(e);
          }
    };

    // Function to login user
    const loginUser = async(data) => {
        try {
            const requestOptions = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
              },
              body: JSON.stringify(data),
            };
              const response = await fetch(`${host}/login`, requestOptions);
              const result = await response.json();
              if(result.error) {
                const errors = await setErr(result.error);
                setError(errors);
                return false;
              } else {
                localStorage.setItem('auth', result.result.authToken);
                const userDetails = fetchUser();
                if(userDetails){
                    return true;
                } else {
                    return false;
                }
              }
          } catch (e) {
            console.log(e);
          }
    };
  
    return (
        <UserContext.Provider value = { {user, friends, error, setFriends, setError, setUser, fetchUser, fetchFriends, signUpUser, loginUser} }>
            { props.children }
        </UserContext.Provider>
    )
};

export default UserState;