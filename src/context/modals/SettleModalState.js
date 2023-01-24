import { useState } from "react";
import SettleModalContext from "./SettleModalContext";

const SettleModalState = (props) => {

    const host = 'http://localhost:5000/expense';

    const [error, setError] = useState([]);
    
    // To set modal open and close
    const [isSettleExpenseModalOpen, setIsSettleExpenseModalOpen] = useState(false);
    const [isSettleChoosePayerModalOpen, setIsSettleChoosePayerModalOpen] = useState(false);
    const [isSettleChooseRecipientModalOpen, setIsSettleChooseRecipientModalOpen] = useState(false);
    const [isSettleNotesModalOpen, setIsSettleNotesModalOpen] = useState(false);

    // Friends List including user
    const [friendsIncludingUser, setFriendsIncludingUser] = useState([]);

    // Payer state determines who is going to pay
    const [settleIndividualPayer, setSettleIndividualPayer] = useState({});

    // Recipient state determines paid to whom
    const [settleIndividualRecipient, setSettleIndividualRecipient] = useState({});

    // Settlement Details
    const [settleAmount, setSettleAmount] = useState(0);
    const [settleDate, setSettleDate] = useState(new Date());
    const [settleNote, setSettleNote] = useState("");

     // Function to create array of error msg
     const setErr = (receivedErrors) => {
        let errors = [];
        if(Array.isArray(receivedErrors)) {
        errors = receivedErrors;
        } else {
        errors.push(receivedErrors);
        }
        alert(errors);
    return errors;
    };

    // Function to save settlement
    const saveSettlement = async (data) => {
        try {
            const authToken = localStorage.getItem('auth');
            const requestOptions = {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                "Authorization": `Bearer ${authToken}`
              },
              body: JSON.stringify(data ),
            };

            const response = await fetch(`${host}/settle`, requestOptions);
            const result = await response.json();
            if(result.error) {
                const errors = setErr(result.error);
                setError(errors);
                return false;
            } else {
                return true;
            }
        } catch (e) {
        console.log(e);
        }
    };

    return (
        <SettleModalContext.Provider value={{
            error, setError,
            isSettleExpenseModalOpen, setIsSettleExpenseModalOpen,
            isSettleChoosePayerModalOpen, setIsSettleChoosePayerModalOpen,
            isSettleChooseRecipientModalOpen, setIsSettleChooseRecipientModalOpen,
            isSettleNotesModalOpen, setIsSettleNotesModalOpen,

            friendsIncludingUser, setFriendsIncludingUser,
            settleIndividualPayer, setSettleIndividualPayer,
            settleIndividualRecipient, setSettleIndividualRecipient,

            settleAmount, setSettleAmount,
            settleDate, setSettleDate,
            settleNote, setSettleNote,

            saveSettlement
        }}>
            {props.children}
        </SettleModalContext.Provider>
    )
};

export default SettleModalState;