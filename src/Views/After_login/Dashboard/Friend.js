import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { avatar, expenseCat, splitManSide } from "../../Utils/img";

import ModalContext from "../../../context/modals/ModalContext";
import SettleModalContext from "../../../context/modals/SettleModalContext";
import UserContext from "../../../context/user/UserContext";

export default function Friend() {
  

  let location = useLocation();

  const {
    setError, success, setSuccess, deleteExpense,
    setIsNewExpense,
    setIsAddExpenseModalOpen,
    setExpenseId,
    setExpenseDescription,
    expenseAmount, setExpenseAmount,
    setExpenseDate,
    setExpenseNote,
    setIndividualAmount,
    setIndividualPayer,
    setSplitFriends,
    setPayers,
    setSharePerPerson,
    setSplitMethod, 
    setSplitUnequal,
  } = useContext(ModalContext);

  const {setIsSettleExpenseModalOpen} = useContext(SettleModalContext);

  const {user, fetchFriendDetails, sendReminder, friendDetails, friendExpenses, settlements, friendship} = useContext(UserContext);

  const [viewTransactions, setViewTransactions] = useState(true);

  const openModal = () => {
    setIsNewExpense(true);
    setIsAddExpenseModalOpen(true);

    setIndividualPayer({_id: user._id, name: user.name, email: user.email});

    setSplitFriends({value: {_id: friendDetails._id, name: friendDetails.name, email: friendDetails.email}, label: friendDetails.name, includedInShare:  true, paid: 0, share: 0, totalShares: 1});

    setPayers([{value: {_id: user._id, name: user.name, email: user.email}, label: user.name, includedInShare:  true, paid: 0, share: 0, totalShares: 1}, {value: {_id: friendDetails._id, name: friendDetails.name, email: friendDetails.email}, label: friendDetails.name, includedInShare:  true, paid: 0, share: 0, totalShares: 1}]);

  };

  const dateFormat = (date) => {
    date = new Date(date);
    const months = {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December',
    }
    const month = months[date.getMonth()];
    const day = date.getDate();
    // const monthString = month >= 10 ? month : `0${month}`;
    const dayString = day >= 10 ? day : `0${day}`;
    return `${month} ${dayString}, ${date.getFullYear()}`;
  };

  const displayEditDiv = (divId) => {
    const styleStatus = getComputedStyle(document.getElementById("div-" + divId)).display;
    if(styleStatus === "none") {
      document.getElementById("div-" + divId).style.display = 'block';
    } else {
      document.getElementById("div-" + divId).style.display = 'none';
    }
    
  };

  const delExpense = async (expenseId) => {
    const confirmResult = window.confirm("Are you sure you want to delete this expense? This will completely remove this expense for ALL people involved, not just you.");
    
    if(confirmResult) {
      const deleteStatus = await deleteExpense(expenseId);
      if(deleteStatus) {
        setSuccess(true);
      } else {
        setTimeout(() => {
          setError([]);
        }, 2000);
      }
    }

  };

  const editExpense = (expenseId, expenseDesc, expenseAmt, expenseNote, expenseDate, payingUsers, splitMethod, paidBy) => {

    setIsNewExpense(false);
    setIsAddExpenseModalOpen(true);
    setExpenseId(expenseId);
    setExpenseDescription(expenseDesc);
    setExpenseAmount(expenseAmt);
    setExpenseNote(expenseNote);
    setExpenseDate(new Date(expenseDate));
    // setIndividualAmount(0);

    let newSplitFriendsList = [];
    let newPayersList = [];

    for (let i = 0; i < payingUsers.length; i++) {
      const userId = payingUsers[i].user._id;
      const userName = payingUsers[i].user.name;
      const userEmail = payingUsers[i].user.email;
      const payAmt = payingUsers[i].paid;
      const shareAmt = payingUsers[i].share;
      const included = shareAmt > 0 ? true: false;

      const paidByLength = paidBy.split(' ');
      
      newPayersList.push({value: {_id: userId, name: userName, email: userEmail}, label: userName, includedInShare:  included, paid: payAmt, share: shareAmt, totalShares: 1});
      
      if(userId !== user._id){
        newSplitFriendsList.push({value: {_id: userId, name: userName, email: userEmail}, label: userName, includedInShare:  included, paid: payAmt, share: shareAmt, totalShares: 1});
      }

      if(paidByLength.length < 3) {
        if(userName.split(' ')[0] === paidByLength[0]) {
          setIndividualAmount(expenseAmount);
          setIndividualPayer({_id: userId, name: userName, email: userEmail});
        }
      } else {
        setIndividualAmount(0);
        setIndividualPayer({});
      }

    }
      
    setSplitFriends(newSplitFriendsList);

    setPayers(newPayersList);
    if(splitMethod === "equally") {
      const amt = (expenseAmt/payingUsers.length).toFixed(2);
      setSharePerPerson(amt);
    }

    // setLeftAmount(0);
    setSplitMethod(splitMethod);
    if(splitMethod === "amounts" || splitMethod === "shares") {
      setSplitMethod("amounts");
    }
    if(splitMethod === "equally") {
      setSplitUnequal(false);
    } else {
      setSplitUnequal(true);
    }
    
  };
  
  
  useEffect(() => {
    if(Object.keys(friendDetails).length === 0 || success) {
      fetchFriendDetails(location.pathname.split('/')[3]);
    }
    setViewTransactions(true);
  }, [success, friendDetails, fetchFriendDetails, location.pathname]);
  

  return (
    <>
      {/* Top bar */}
      <div id="top-bar" className="flex justify-between">
        <div className="flex align-items-center">
          <img src={avatar} alt="User Profile" className="user-avatar-friend" />
          <span className="userName-friend">{friendDetails.name ? (friendDetails.name).toUpperCase() : ""}</span>
        </div>
        <div id="actions">
          <button className="btn add-expense-btn" onClick={openModal}>Add an expense</button>
          <button className="btn settle-up-btn" onClick={() => {setIsSettleExpenseModalOpen(true)}}>Settle up!</button>
        </div>
      </div>

      {/* Friend balances */}
      {Object.keys(friendship).length !== 0 ?
        <div className="dashboard-balances flex justify-around">
          <div className="balance-display text-center">
            you owe
              <span className="negative-bal">₹{friendship.added_by === user._id ? (friendship.balances.owe).toFixed(2) : (friendship.balances.owed).toFixed(2)}</span>
          </div>
          <div className="border-right"></div>
          <div className="balance-display text-center">
            you owed
            <span className="positive-bal">₹{friendship.added_by === user._id ? (friendship.balances.owed).toFixed(2) : (friendship.balances.owe).toFixed(2)}</span>
          </div>
        </div>
      :
      ""
      }

      {/* Expense Section */}
      <div className="expenseContainer">

        {/* Buttons to toggle between expenses and settlements */}
        <div className="sectionButtons flex justify-evenly">
          <button className={`view-btn ${viewTransactions ?  "view-btn-active" : ""}`} onClick={() => setViewTransactions(true)}>View Transactions</button>
          <button className={`view-btn ${!viewTransactions ?  "view-btn-active" : ""}`} onClick={() => setViewTransactions(false)}>View Settlements</button>

          <button className="btn add-expense-btn" onClick={() => {friendship.added_by === user._id ? sendReminder(friendship.friend) : sendReminder(friendship.added_by)}}>Send reminder</button>
          
        </div>

        {/* Expenses */}
        {viewTransactions ?
          <>
          {friendExpenses.length >= 1 ?
            <>
              {friendExpenses.map((monthlyExpense) => {
                return (
                  <div className="expenses" key={monthlyExpense.index}>
                    <div className="monthName">
                      {(monthlyExpense.monthName).toUpperCase()}
                    </div>
                    
                    {(monthlyExpense.expenseList).map(({expense, paidBy, lentDetails}) => {
                      return (
                        <div key={expense._id}>

                          {/* Expense */}
                          <div className="expense-detail">
                            
                            {/* Main Content */}
                            <div className="friend-expense-info flex justify-between" onClick={() => {displayEditDiv(expense._id)}}>

                              {/* Expense Left side details */}
                              <div className="expense-left-content flex">
                                <span className="date justify-self-center">
                                  {((new Date(expense.date).toString()).split(' ')[1]).toUpperCase()}
                                  <br />
                                  <span>
                                  {((new Date(expense.date).toString()).split(' ')[2])}
                                    </span>
                                </span>
                                <img src={expenseCat} alt="Expense Category" className="expenseCatLogo" />
                                <span className="friend-expense-desc align-self-center">{expense.desc}&nbsp;{expense.notes !== "" ? <i className="fa-solid fa-comment"></i> : ""}</span>
                              </div>

                              {/* Expense right side details */}
                              <div className="expense-right-content flex ">
                                {/* Paid by details */}
                                <span className="expense-paidBy">
                                  {paidBy}
                                  <br />
                                  <span className="paid-amount">₹{(expense.amount).toFixed(2)}</span>
                                </span>

                                <span className="expense-lentTo nothing-position">
                                  {/* Lent details */}
                                  {lentDetails.type === "nothing" ? <div>you borrowed <br /> nothing</div> : lentDetails.message}
                                  <br />
                                  <span className={`lent-amount ${lentDetails.type === "lent" ? "positive-bal": "negative-bal"}`}>{lentDetails.amount > 0 ? "₹" + (lentDetails.amount).toFixed(2) : "" }</span>
                                </span>

                                {/* Delete expense button */}
                                <button className="delete-expense-btn" onClick={() => delExpense(expense._id)}>
                                  <i className="fa-solid fa-xmark"> </i>
                                </button>
                              </div>
                            </div>

                            {/* Hidden Content */}
                            <div className="expense-detailed-view" id={`div-${expense._id}`}>
                              <div className="basic-details-section flex">
                                <img src={expenseCat} alt="Expense category" className="basic-expenseCatImg" />
                                <div className="basic-details flex">
                                  <span>{expense.desc}</span>
                                  <span className="basic-detail-amount">₹{expense.amount}</span>
                                  <span className="basic-addedBy-detail">
                                    Added by {(expense.createdBy.name).split(' ')[0]} on {dateFormat(expense.created_at)}
                                    </span>
                                    <button className="btn add-expense-btn" onClick={() => editExpense(expense._id, expense.desc, expense.amount, expense.notes, expense.date, expense.split_between, expense.split_method, paidBy)}>Edit expense</button>
                                </div>
                              </div>
                              {expense.notes !== "" ?
                                <div className="basic-detail-note">
                                <span>Notes:</span>
                                &nbsp;
                                {expense.notes}
                                </div>
                              :
                              ""
                              }
                            </div>
                          </div>
                        </div>  
                      )
                    })}
                  </div>
                )
              })} 
            </>
            :
            <>
              {/* Empty Section */}
              <div className='dashboard flex'>
                <div id="dashboard-logo">
                  <img src= { splitManSide } alt="" />
                </div>

                <div id="dashboard-body">
                  <h2> You have not <br />added any expenses yet </h2>
                  <p>To add a new expense, click the <br /> orange "Add an expense" button.</p>
                </div>
              </div>
            </>
          }
          </>
          :
          <>
          {settlements.length >= 1 ?
            <>
              {settlements.map((settlement) => {
                return (
                  <div className="settlement-detail friend-expense-info flex justify-between" key={settlement._id}>
                    {/* Left detail */}
                    <div className="settlement-left-details flex">
                      <div className="rupee-symbol-container">
                        <div className="rupee-symbol">₹</div>
                      </div>
                      <div className="payment-detail align-self-center">
                        {(settlement.payee.name).split(' ')[0]} paid {(settlement.receiver.name).split(' ')[0]} ₹{settlement.amount}
                      </div>
                    </div>
      
                    {/* Right detail */}
                    <div className="settlement-right-details flex">
                      <span className="settlement-summary">
                        {settlement.payee._id === user._id ? "you paid" : "you received"}
                      </span>
                      <span className={`settlement-amount ${settlement.payee._id === user._id ? "positive-bal" : "negative-bal"}`}>₹{settlement.amount}</span>
                    </div>
                  </div>
                )
              })}
            </>
            :
            <>
              {/* Empty Section */}
              <div className='dashboard flex'>
              <div id="dashboard-logo">
                <img src= { splitManSide } alt="" />
              </div>

              <div id="dashboard-body">
                <h2> No settlements made yet. </h2>
              </div>
            </div>
          </>
          }
          </>
        }

      </div>
      
    </>
  );
}
