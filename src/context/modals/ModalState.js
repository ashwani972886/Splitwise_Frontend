import { useState } from "react";
import ModalContext from "./ModalContext";

const ModalState = (props) => {

    const host = 'http://localhost:5000/expense';

    const [error, setError] = useState([]);
    const [success, setSuccess] = useState(false);

    const [isNewExpense, setIsNewExpense] = useState(false);

    // To set modal open and close
    const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);
    const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
    const [isPayerModalOpen, setIsPayerModalOpen] = useState(false);
    const [isSplitOptionsModalOpen, setIsSplitOptionsModalOpen] = useState(false);
    const [isExpenseNotesModalOpen, setIsExpenseNotesModalOpen] = useState(false);
    
    // Expense Details
    const [expenseId, setExpenseId] = useState("");
    const [expenseDescription, setExpenseDescription] = useState("");
    const [expenseAmount, setExpenseAmount] = useState(0);
    const [expenseDate, setExpenseDate] = useState(new Date());
    const [expenseNote, setExpenseNote] = useState("");

    // When payer is one individual
    const [individualAmount, setIndividualAmount] = useState(0);
    const [individualPayer, setIndividualPayer] = useState({});

    // If there are multiple users
    const [splitFriends, setSplitFriends] = useState([]);
    const [payers, setPayers] = useState([]);

    // Share per person in equal condition
    const [sharePerPerson, setSharePerPerson] = useState(0);
    
    // Left amount when some part of expense amount is assigned to some users
    const [leftAmount, setLeftAmount] = useState(0);

    // Split method equally/exact amounts, percentages or shares
    const [splitMethod, setSplitMethod] = useState("equally");

    // Split type out of Split/Owe Full/Owed Full
    const [splitType, setSplitType] = useState("Split");

    // Split equally or unequally based on split type
    const [splitUnequal, setSplitUnequal] = useState(false);

    // State to update the total share amount that has been assigned to some user
    const [totalShareAmount, setTotalShareAmount] = useState(0);

    // Total share count when split type is split by shares
    const [totalShareCount, setTotalShareCount] = useState(0);

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

    // Function to save expense
    const createExpense = async (data) => {
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

            const response = await fetch(`${host}/`, requestOptions);
            const result = await response.json();
            if(result.error) {
                const errors = setErr(result.error);
                setError(errors);
                return false;
            } else {
                // console.log("Expense created successfully!  ");
                return true;
                // const userDetails = fetchUser();
                // if(userDetails){
                //     return true;
                // } else {
                //     return false;
                // }
            }
        } catch (e) {
        console.log(e);
        }
    };

    // Function to updateExpense
    const updateExpense = async (data) => {
        try {
            const authToken = localStorage.getItem('auth');
            const requestOptions = {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                "Authorization": `Bearer ${authToken}`
              },
              body: JSON.stringify(data),
            };

            const response = await fetch(`${host}/update/${expenseId}`, requestOptions);
            const result = await response.json();
            if(result.error) {
                const errors = setErr(result.error);
                setError(errors);
                return false;
            } else {
                // console.log("Expense created successfully!  ");
                return true;
                // const userDetails = fetchUser();
                // if(userDetails){
                //     return true;
                // } else {
                //     return false;
                // }
            }
        } catch (e) {
            console.log(e);
        }
    };

    // Function to delete expense
    const deleteExpense = async (data) => {
        try {
            const authToken = localStorage.getItem('auth');
            const requestOptions = {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                "Authorization": `Bearer ${authToken}`
              }
            };

            const response = await fetch(`${host}/${data}`, requestOptions);
            const result = await response.json();
            if(result.error) {
                const errors = setErr(result.error);
                setError(errors);
                return false;
            } else {
                // console.log("Expense created successfully!  ");
                return true;
                // const userDetails = fetchUser();
                // if(userDetails){
                //     return true;
                // } else {
                //     return false;
                // }
            }
        } catch (e) {
        console.log(e);
        }
    };

    return (
        <ModalContext.Provider value={
                {error, setError,
                success, setSuccess,

                isNewExpense, setIsNewExpense,
                
                isAddFriendModalOpen, setIsAddFriendModalOpen,
                isAddExpenseModalOpen, setIsAddExpenseModalOpen,
                isPayerModalOpen, setIsPayerModalOpen,
                isSplitOptionsModalOpen,setIsSplitOptionsModalOpen,
                isExpenseNotesModalOpen, setIsExpenseNotesModalOpen,

                expenseId, setExpenseId,
                expenseDescription, setExpenseDescription,
                expenseAmount, setExpenseAmount,
                expenseDate, setExpenseDate,
                expenseNote, setExpenseNote,

                individualAmount, setIndividualAmount,
                individualPayer, setIndividualPayer,

                splitFriends, setSplitFriends,
                payers, setPayers,
                sharePerPerson, setSharePerPerson,

                leftAmount, setLeftAmount,

                splitMethod, setSplitMethod,

                splitType, setSplitType,

                splitUnequal, setSplitUnequal,
                
                totalShareAmount, setTotalShareAmount,
                
                totalShareCount, setTotalShareCount,
            
                createExpense, updateExpense, deleteExpense}
            }>
            {props.children}
        </ModalContext.Provider>
    )
};

export default ModalState;