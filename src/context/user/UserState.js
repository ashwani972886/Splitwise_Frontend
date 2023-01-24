import { useContext, useState } from "react";
import ModalContext from "../modals/ModalContext";
import SettleModalContext from "../modals/SettleModalContext";
import UserContext from "./UserContext";

const UserState = (props) => {
  
    const {setSuccess, setPayers, setIndividualPayer} = useContext(ModalContext);
    const {setFriendsIncludingUser, setSettleIndividualPayer, setSettleIndividualRecipient} = useContext(SettleModalContext);

    const host = 'http://localhost:5000/user';

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState([]);
    const [error, setError] = useState([]);
    const [friends, setFriends] = useState([]);
    const [notFoundFriends, setNotFoundFriends] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);
    const [oweBalance, setOweBalance] = useState(0);
    const [owedBalance, setOwedBalance] = useState(0);

    const [friendDetails, setFriendDetails] = useState([]);
    const [friendExpenses, setFriendExpenses] = useState([]);
    const [settlements, setSettlements] = useState([]);
    const [friendship, setFriendship] = useState({});

    let userDetails = {};
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
              const errors = setErr(result.error);
              setError(errors);
              return false; 
          } else {
              let totalBalance = (result.result.finalBalance.total).toFixed(2);
              let oweBalance = (result.result.finalBalance.owe).toFixed(2);
              let owedBalance = (result.result.finalBalance.owed).toFixed(2);

              setFriends( result.result.friends );
              
              setTotalBalance(totalBalance);
              setOweBalance(oweBalance);
              setOwedBalance(owedBalance);

              let arr = [{friend: {_id: userDetails._id, name: userDetails.name, email: userDetails.email},
              balances: {
                  owe: oweBalance,
                  owed: owedBalance
              }}, ...result.result.friends];

              setFriendsIncludingUser(arr);

              setSettleIndividualRecipient({_id: result.result.friends[0].friend._id, name: result.result.friends[0].friend.name, email: result.result.friends[0].friend.name});

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
                const errors = setErr(result.error);
                setError(errors);
                return false; 
            } else {
                setUser( result.result );

                userDetails = {
                  _id: result.result._id,
                  name: result.result.name,
                  email: result.result.email
                };
                
                fetchFriends();

                setPayers([{value: {_id: result.result._id, name: result.result.name, email: result.result.email}, label: result.result.name, includedInShare: true, paid: 0, share: 0, totalShares: 0}]);

                setIndividualPayer({_id: result.result._id, name: result.result.name, email: result.result.name});

                setSettleIndividualPayer({_id: result.result._id, name: result.result.name, email: result.result.name});

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
              const errors = setErr(result.error);
              setError(errors);
              return false;
            } else {
              localStorage.setItem('auth', result.result.authToken);
              setIsAuthenticated(true);
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
                const errors = setErr(result.error);
                setError(errors);
                return false;
              } else {
                localStorage.setItem('auth', result.result.authToken);
                setIsAuthenticated(true);
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

    // Function to invite friends
    const inviteFriends = async(data) => {
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
        const response = await fetch(`${host}/friends/invite/`, requestOptions);
        const result = await response.json();
        if(result.error) {
          const errors = setErr(result.error);
          setError(errors);
          alert(errors);
          return false;
          } else {
            return true;
          }
      } catch (e) {
        console.log(e);
      }
    };

    // Function to add friends
    const addFriends = async(data) => {
      try {
        const authToken = localStorage.getItem('auth');
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            "Authorization": `Bearer ${authToken}`
          },
          body: JSON.stringify(data ),
        };
          const response = await fetch(`${host}/addFriend`, requestOptions);
          const result = await response.json();
          if(result.error) {
            const errors = setErr(result.error);
            if(result.notFoundFriends) {
              setNotFoundFriends(result.notFoundFriends);
            }
            setError(errors);
            return {
              status: false,
              error: errors
            };
          } else {
            let nonFriends = [];
            if(result.notFoundFriends) {
              nonFriends = result.notFoundFriends;
              setNotFoundFriends(nonFriends);
            }
            fetchFriends();
            return{
              status: true,
              notFoundFriends: nonFriends
            };
          }
      } catch (e) {
        console.log(e);
      }
    };

    // Function to fetch friend detaills
    const fetchFriendDetails = async (data) => {
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
  
        const response = await fetch(`${host}/friendDetails/${data}`, requestOptions);
        
        const result = await response.json();
        if(result.error) {
            const errors = setErr(result.error);
            alert(errors);
        } else {
            setFriendDetails( result.result.details );
            setFriendExpenses(result.result.expenseList);
            setSettlements(result.result.settlements);
            setFriendship(result.result.friendship);
        }
  
      } catch(e) {
          console.log(e);
      }
    };
  
    // Function to send reminder for balance
    const sendReminder = async(data) => {
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
  
        const response = await fetch(`${host}/remind/${data}`, requestOptions);
        
        const result = await response.json();
        if(result.error) {
          const errors = setErr(result.error);
          alert(errors);
        } else {
          setSuccess(true);
        }
  
      } catch(e) {
          console.log(e);
      }
    };
  
    return (
        <UserContext.Provider value = { {
          isAuthenticated, setIsAuthenticated, 
          user, setUser, fetchUser,
          error, setError, setErr,
          friends, setFriends, fetchFriends,
          notFoundFriends, setNotFoundFriends,
          signUpUser, loginUser,
          totalBalance, oweBalance, owedBalance,
          inviteFriends,
          addFriends,

          fetchFriendDetails,
          sendReminder,
          friendDetails,
          friendExpenses, setFriendExpenses,
          settlements, setSettlements,
          friendship, setFriendship
          } }>
            { props.children }
        </UserContext.Provider>
    )
};

export default UserState;