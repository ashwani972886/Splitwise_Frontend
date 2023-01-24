import { useState } from "react";
import GroupContext from "./GroupContext";

const GroupState = (props) => {
    const host = 'http://localhost:5000/group';
    const [groups, setGroups] = useState([]);
    const [error, setError] = useState([]);
    const [notFoundMembers, setNotFoundMembers] = useState([]);
   
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
    
    // Function to fetch groups
    const fetchGroups = async() => {
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
            // console.log(response);
            const result = await response.json();
            // console.log(result);
            if(result.error) {
                const errors = setErr(result.error);
                setError(errors);
                return false; 
            } else {
                setGroups( result.result );
                return true;
            }
        } catch(e) {
            console.log(e);
        }
    };

    // Function to add groups
    const addGroup = async(data) => {
        try {
            const authToken = localStorage.getItem('auth');
            const requestOptions = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                "Authorization": `Bearer ${authToken}`
              },
              body: JSON.stringify(data),
            };
              const response = await fetch(`${host}/`, requestOptions);
              const result = await response.json();
              if(result.error) {
                const errors = setErr(result.error);
                setError(errors);
                if(result.members) {
                    setNotFoundMembers(result.members);
                }
                return false;
              } else {
                const groupDetails = fetchGroups();
                if(groupDetails){
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
        <GroupContext.Provider value={{groups, addGroup, fetchGroups, error, setError, notFoundMembers, setNotFoundMembers}} >
            {props.children}
        </GroupContext.Provider>
    )

};

export default GroupState;