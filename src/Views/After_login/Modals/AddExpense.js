import React, { useContext } from 'react';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import { expenseCat } from '../../Utils/img';

// import GroupContext from '../../../context/groups/GroupContext';
import ModalContext from '../../../context/modals/ModalContext';
import UserContext from '../../../context/user/UserContext';

export default function AddExpense() {

  const animatedComponents = makeAnimated();
  // const {groups} = useContext(GroupContext);

  const {user, friends, fetchFriends} = useContext(UserContext);

  const {
    setError, setSuccess,
    isNewExpense, setIsNewExpense,
    isAddExpenseModalOpen, setIsAddExpenseModalOpen,
    isPayerModalOpen, setIsPayerModalOpen,
    isSplitOptionsModalOpen, setIsSplitOptionsModalOpen,
    isExpenseNotesModalOpen, setIsExpenseNotesModalOpen,
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
    totalShareAmount,
    setTotalShareCount,
    createExpense, updateExpense
  } = useContext(ModalContext);


  let options = [];
  // Mapping friends to select options to share expense with
  friends.map(({friend}) => {
    return (
      options.push({value: friend, label: friend.name, includedInShare: true, paid: 0, share: 0, totalShares: 1 }) 
    )
  });
  // groups.map((group) => {
  //   return (
  //     options.push({value: group, label: "All of " + group.groupName })
  //   )
  // });
  

  // Function to update payers list and update paid and share amount of users on change in expense amount
  const onChangeExpenseAmount = (value) => {
    const newExpenseAmount = parseFloat(value.target.value);
    const newShare = parseFloat((value.target.value/payers.length).toFixed(2));

    setExpenseAmount(newExpenseAmount); 

    setLeftAmount(newExpenseAmount);

    setSharePerPerson(newShare);

    if(individualAmount > 0) {
      setIndividualAmount(newShare);
    }

    const updatePayers = payers.filter((payee) => {
      if(payee.value._id === individualPayer._id) {
        payee.paid = newExpenseAmount;
        payee.share = newShare;
      } else {
        payee.paid = 0;
        payee.share = newShare;
      }
      return payee;
    });

    setPayers(updatePayers);
  };

  // Function to update payers list on adding/removing a share person
  const onChange = async (e) => {
    
    e = e.filter((value, index) => {
      const _value = JSON.stringify(value);
      return index === e.findIndex(obj => {
        return JSON.stringify(obj) === _value;
      });
    });

    setSplitFriends(e);

    const newShare =  parseFloat((expenseAmount/(e.length + 1)).toFixed(2));

    setSharePerPerson(newShare);

    if(individualAmount > 0) {
      setIndividualAmount(newShare);
    }

    e.filter((e) => {
      e.share = newShare;
      return e;
    });
    
    let newPayers = [];
    newPayers = [{value: {_id: user._id, name: user.name, email: user.email}, label: user.name, includedInShare: true, paid: expenseAmount, share: newShare, totalShares: 1}, ...e];

    setTotalShareCount(newPayers.length);

    setPayers(newPayers);
  };
  
  // Inter Change or toggle modals on click
  const toggleModals = (modalName) => {
    // Hide all the sub-modals
    setIsPayerModalOpen(false);

    setIsSplitOptionsModalOpen(false);

    setIsExpenseNotesModalOpen(false);

    // Display sub-modal as per choice
    if(modalName === "payer") {

      if(isPayerModalOpen) {
        setIsPayerModalOpen(false);
      } else {
        setIsPayerModalOpen(true);
      }

    } else if(modalName === "splitOptions") {

      if(isSplitOptionsModalOpen) {
        setIsSplitOptionsModalOpen(false);
      } else {
        setIsSplitOptionsModalOpen(true);
      }

    } else if (modalName === "notes") {

      if(isExpenseNotesModalOpen) {
        setIsExpenseNotesModalOpen(false);
      } else {
        setIsExpenseNotesModalOpen(true);
      }

    }
  };

  // Function to reset all modals when modals are closed in between
  const closeModals = () => {
    setIsNewExpense(false);
    setIsAddExpenseModalOpen(false);
    setIsPayerModalOpen(false);
    setIsSplitOptionsModalOpen(false);
    setIsExpenseNotesModalOpen(false);
    
    setExpenseDescription("");
    setExpenseAmount(0);
    setExpenseNote("");
    setExpenseDate(new Date());

    setIndividualAmount(0);
    setIndividualPayer({_id: user._id, name: user.name, email: user.email});

    setSplitFriends([]);
    setPayers([{value: {_id: user._id, name: user.name, email: user.email}, label: user.name, includedInShare: true, paid: 0, share: 0, totalShares: 0}]);

    setSharePerPerson(0);
    setLeftAmount(0);
    setSplitMethod("equally");
    setSplitType("Split");
    setSplitUnequal(false);
    setTotalShareCount(0);
  };

  // Function to create new expense
  const addExpense = async (e) => {
    e.preventDefault();
    let myErrors = [];
    if (payers.length === 1) {
      myErrors.push("There is only one person involved in this expense. Please add atleast one more person to create expense");
    } else if (expenseDescription === "") {
      myErrors.push("You must enter a description.");
    } else if (expenseAmount === 0) {
      myErrors.push("You must enter expense amount.");
    } else if ( (totalShareAmount === 0 && splitMethod === "equally") || ((totalShareAmount < expenseAmount || totalShareAmount < expenseAmount ||leftAmount !== 0) && splitMethod !== "equally" && splitMethod !== "shares") ){
      myErrors.push(`The total of everyone's owed shares (₹${totalShareAmount.toFixed(2)}) is different than the total  cost (₹${expenseAmount.toFixed(2
        )})`);
    }

    if(myErrors.length < 1) {

      const members = payers.map(({value, paid, share}) => {
        return {
          user: value._id,
          paid: paid,
          share: share
        }
      });
  
      const data = 	{
        type: "Friend",
        desc: expenseDescription,
        amount: expenseAmount,
        category: "General",
        notes: expenseNote,
        date: expenseDate,
        split_method: splitMethod,
        split_between: members
      };
      
      let newExpenseStatus = false;
      if(isNewExpense) {
        newExpenseStatus = await createExpense(data);
      } else {
        newExpenseStatus = await updateExpense(data);
      }
  
      if(newExpenseStatus) {
        setSuccess(true);
        closeModals();
        fetchFriends();
      } else {
        setTimeout(() => {
          setError([]);
        }, 2000);
      }
      
    } else {
      alert(myErrors);
    }

  };  

  return (
    <>
      {isAddExpenseModalOpen ?
        <>
          <div className='darkBG' onClick={closeModals}/>

          <div className={`centered ${isPayerModalOpen ||isSplitOptionsModalOpen || isExpenseNotesModalOpen ? 'go-left' : ""}`}>
            <div className='modal'>
              {/* Modal Header */}
              <div className='modalHeader'>
                <h5 className='heading'>
                  {isNewExpense ? "Add an expense" : "Edit expense"}
                </h5>
              </div>
              {/* Close Button */}
              <button className='closeBtn' onClick={closeModals}>
                <i className="fa-solid fa-xmark"></i>
              </button>

              {/* Modal Content */}
              <div className='modalContent'>
                
                {/* Top with field content */}
                <div className="with-field">
                  <label htmlFor='friends-input' className='friends-input'>
                    With <strong>you</strong> and:
                    <Select components={animatedComponents} options={options} className="basic-multi-select add-with" placeholder='Enter names or email addresses' isMulti autoFocus value={splitFriends} onChange={onChange}/>
                  </label>
                </div>
                
                {/* Expense Details */}
                <div className="expense flex justify-around">
                  <div className="expense-cat">
                    <img src={expenseCat} alt="Expense-Category" className='expense-cat-img' />
                  </div>
                  <div className="expense-details">
                    <input type="text" name="" id="" placeholder='Enter a description' className='expense-input expense-desc' value={expenseDescription !== "" ? expenseDescription : ""} onChange={(e) => {setExpenseDescription(e.target.value)}} />
                    <br />
                    <span className='expense-amount-label'>₹</span>
                    <input type="text" name="" id="" placeholder='0.00' className='expense-input expense-amount' value={expenseAmount > 0 ? expenseAmount: ""} onChange={(e) => {onChangeExpenseAmount(e)}} />
                  </div>
                </div>

                {/* Split Criteria */}
                <div className="split-container">
                  <p className='split-detail'>
                    {splitType === "Split" ?
                      <>
                        Paid by&nbsp;
                        <button className='split-btn paid-by-button' onClick={() => {toggleModals("payer")}}>{Object.keys(individualPayer).length !==0 ? <>{individualPayer.name === user.name ? "you" : individualPayer.name}</> : "multiple people"}</button>
                        &nbsp;and split&nbsp;
                        <button className='split-btn split-method-button' onClick={() => {toggleModals("splitOptions")}}>{splitUnequal ? "unequally" : "equally"}</button>
                        .
                      </>
                     :
                      <>
                        {splitType === "Owe Full" ?
                          <>
                            <button className="split-btn split-method-button" onClick={() => toggleModals("splitOptions")}>
                              {payers.length === 2 ?
                                <>
                                  You owe {(payers[1].value.name).split(' ')[0]} ₹{expenseAmount}
                                </>
                                :
                                <>
                                  You owe the other person ₹{expenseAmount}
                                </>
                              }
                            </button>
                          </>
                          :
                          <>
                            <button className="split-btn split-method-button" onClick={() => toggleModals("splitOptions")}>
                              {payers.length === 2 ?
                                <>
                                  {(payers[1].value.name).split(' ')[0]} owes you ₹{expenseAmount}
                                </>
                                :
                                <>
                                  the other person owes you ₹{expenseAmount}
                                </>
                              }
                            </button>
                          </>
                        }
                      </>
                    }
                  </p>
                  <p className='split-detail'>
                    {splitType === "Split" ? <>(₹ {sharePerPerson > 0 ? sharePerPerson : "0.00"}/person)</>: ""}
                  </p>
                </div>

                {/* More Expense Info */}
                <div className="expense-info">
                  
                  <DatePicker className='date-picker expense-info-btn' selected={expenseDate} dateFormat='MMMM dd, yyyy' onChange={(date) => {setExpenseDate(date)}} />

                  <button className='expense-info-btn' onClick={() => {toggleModals("notes")}}>Add note</button>

                  <button className='expense-info-btn'>No group</button>
                </div>

              </div>

              {/* Modal Actions */}
              <div className='modalActions'>
                <div className='actionsContainer'>
                  <button className='cancelBtn' onClick={closeModals}>
                    Cancel
                  </button>
                  <button type='submit' className='saveBtn' onClick={(e) => addExpense(e)}>
                    Save
                  </button>
                </div>
              </div>

            </div>
          </div>
        </>
        :
        ""
      }
    </>
  )
};
