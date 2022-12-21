import { useState } from "react";
import GroupContext from "./GroupContext";

const GroupState = (props) => {
    const host = 'http://localhost:5000/group';
    const [groups, setGroups] = useState([]);
    const [error, setError] = useState([]);
   
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
                const errors = await setErr(result.error);
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

    return (
        <GroupContext.Provider value={{groups, fetchGroups}} >
            {props.children}
        </GroupContext.Provider>
    )

};

export default GroupState;