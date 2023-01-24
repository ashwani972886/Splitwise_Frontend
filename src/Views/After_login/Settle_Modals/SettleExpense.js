import React, { useContext, useEffect } from 'react';
import DatePicker from "react-datepicker";

import { avatarBlue } from '../../Utils/img';

import SettleModalContext from '../../../context/modals/SettleModalContext';
import UserContext from '../../../context/user/UserContext';
import ModalContext from '../../../context/modals/ModalContext';

export default function SettleExpense() {

    const {user, friends} = useContext(UserContext);

    const {setSuccess} = useContext(ModalContext);

    const {
        setError,
        isSettleExpenseModalOpen, setIsSettleExpenseModalOpen,
        isSettleChoosePayerModalOpen, setIsSettleChoosePayerModalOpen,
        isSettleChooseRecipientModalOpen, setIsSettleChooseRecipientModalOpen,
        isSettleNotesModalOpen, setIsSettleNotesModalOpen,
        settleIndividualPayer, setSettleIndividualPayer,
        settleIndividualRecipient, setSettleIndividualRecipient,
        settleAmount, setSettleAmount,
        settleDate, setSettleDate,
        settleNote, setSettleNote,
        saveSettlement
    } = useContext(SettleModalContext);

    // Function to toggle Modals
    const toggleModals = (modalName) => {
        setIsSettleChoosePayerModalOpen(false);
        setIsSettleChooseRecipientModalOpen(false);
        setIsSettleNotesModalOpen(false);

        if(modalName === "payer") {
            if(isSettleChoosePayerModalOpen) {
                setIsSettleChoosePayerModalOpen(false);
            } else {
                setIsSettleChoosePayerModalOpen(true);
            }
        } else if (modalName === "recipient") {
            if(isSettleChooseRecipientModalOpen) {
                setIsSettleChooseRecipientModalOpen(false);
            } else {
                setIsSettleChooseRecipientModalOpen(true);
            }
        } else {
            if(isSettleNotesModalOpen) {
                setIsSettleNotesModalOpen(false);
            } else {
                setIsSettleNotesModalOpen(true);
            }
        }
    };

    // Function to close all settle modals
    const closeModals = () => {
        setIsSettleExpenseModalOpen(false);
        setIsSettleChoosePayerModalOpen(false);
        setIsSettleChooseRecipientModalOpen(false);
        setIsSettleNotesModalOpen(false);

        setSettleAmount(0);
        setSettleDate(new Date());
        setSettleNote("");

        setSettleIndividualPayer({_id: user._id, name: user.name, email: user.name});

        setSettleIndividualRecipient({_id: friends[0].friend._id, name: friends[0].friend.name, email: friends[0].friend.name});
    };

    // Function to save settlement
    const handleSaveSettlement = async () => {

        let myErrors = [];
        if(settleAmount === 0) {
            myErrors.push("You must enter an amount.");
        } else if(settleIndividualPayer._id === settleIndividualRecipient._id) {
            myErrors.push("You cannot pay to yourself.");
        }

        if(myErrors.length < 1) {
            // Managing data to pass into the body
            const data = {
                settleWithin: "Individual",
                notes: settleNote,
                amount: settleAmount,
                payee: settleIndividualPayer._id,
                receiver: settleIndividualRecipient._id
            };

            const saveSettlementStatus = await saveSettlement(data);

            if(saveSettlementStatus) {
                setSuccess(true);
                closeModals();
            } else {
                setTimeout(() => {
                    setError([]);
                }, 2000);
            }

        } else {
            alert (myErrors);
        }

    };

    useEffect(() => {
      if(Object.keys(settleIndividualRecipient).length === 0 && isSettleExpenseModalOpen){
        alert("There are no friends associated with you to settle up! Please add a friend and expense first!");
        setIsSettleExpenseModalOpen(false);
      }
    }, [isSettleExpenseModalOpen, setIsSettleExpenseModalOpen, settleIndividualRecipient]);
    

  return (
    <>
        {isSettleExpenseModalOpen ? 
            <> 
                <div className="darkBG" onClick={closeModals} />

                <div className={`centered ${isSettleChoosePayerModalOpen || isSettleChooseRecipientModalOpen || isSettleNotesModalOpen ? 'go-left' : ""}`}>
                    <div className="modal">
                        {/* Modal Header */}
                        <div className="modalHeader">
                            <h5 className="heading">Settle up</h5>
                        </div>

                        {/* Close Button */}
                        <button className="closeBtn" onClick={closeModals}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>

                        {/* Modal Content */}
                        <div className="modalContent">
                            <div className="avatar-section">
                                <img src={avatarBlue} className="user-avatar-settle" alt="" />                    
                                <i className="fa-solid fa-right-long paying-to-icon"></i>
                                <img src={avatarBlue} className="user-avatar-settle" alt="" />                    
                            </div>

                            {/* Who paying to whom container */}
                            <div className="split-container">
                                <p className="paying-detail">
                                    <button className="pay-btn paid-by-button" onClick={() => {toggleModals("payer")}}>
                                        {settleIndividualPayer._id === user._id ? "You" : (settleIndividualPayer.name).split(' ')[0]}
                                    </button>
                                    &nbsp;<strong>paid</strong>&nbsp;
                                    <button className="pay-btn paid-by-button" onClick={() => {toggleModals("recipient")}}>
                                    {settleIndividualRecipient._id === user._id ? "You" : <>{Object.keys(settleIndividualRecipient).length !== 0 ?(settleIndividualRecipient.name).split(' ')[0] : "You"}</>}
                                    </button>
                                </p>
                            </div>

                            {/* Settle Info */}
                            <div className="settle-info">
                                <span className='expense-amount-label'>₹</span>
                                <input type="text" name="" id="" placeholder='0.00' className='expense-input expense-amount settle-input' value={settleAmount !== 0 ? settleAmount : ""} onChange={(e) => {if(!isNaN(e.target.value)){setSettleAmount(e.target.value)}}} />

                                <DatePicker className='date-picker expense-info-btn' selected={settleDate} dateFormat='MMMM dd, yyyy' onChange={(date) => {setSettleDate(date)}} />

                                <button className='expense-info-btn' onClick={() => {toggleModals("notes")}}>Add note</button>
                            </div>

                            {/* Modal Actions */}
                            <div className='modalActions'>
                                <div className='actionsContainer'>
                                    <button className='cancelBtn' onClick={closeModals}>
                                        Cancel
                                    </button>
                                    <button type='submit' className='saveBtn' onClick={handleSaveSettlement}>
                                        Save
                                    </button>
                                </div>
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
}
