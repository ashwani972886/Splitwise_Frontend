import React, { useState, useContext } from 'react';
import {avatar} from '../../Utils/img/index';

import UserContext from '../../../context/user/UserContext';
import ModalContext from '../../../context/modals/ModalContext';

export default function PaidByPeople() {

  const {user} = useContext(UserContext);

  const {
    isPayerModalOpen, setIsPayerModalOpen,
    expenseAmount,
    individualAmount, setIndividualAmount,
    individualPayer, setIndividualPayer,
    payers, setPayers
  } = useContext(ModalContext);

  // State to check whether if each person in share paid their own share
  const [isPaidOwnShare, setIsPaidOwnShare] = useState(false);

  // Function to update paid & share amount when each person paid their own share is set to true
  const checked = (e) => {
    if(e.target.checked) {
      const newIndividualAmount = parseFloat((expenseAmount/payers.length).toFixed(2));

      setIsPaidOwnShare(true);

      setIndividualAmount(newIndividualAmount);

      const updatePayers = payers.filter((payee) => {
        payee.paid = newIndividualAmount;
        payee.share = newIndividualAmount;
        return payee;
      });

      setPayers(updatePayers);
    } else {

      setIsPaidOwnShare(false);
      setIndividualAmount(0);

    }
  };

  // Function to toggle multiple people section 
  const showSection = () => {
    const section = document.getElementById('multiple-people-section');
    section.style.display = 'block';

    const multiplePeople = document.getElementById('multiple-people-div');
    multiplePeople.classList.remove('multiple-people-border');

    setIndividualPayer({});
  }

  // Function to change default payer
  const toggleDefaultPayer = (thisUser) => {

    const updatedPayers = payers.filter((payee) => {
      if((payee.value._id === user._id && thisUser.value._id !== user._id )|| payee.value._id !== thisUser.value._id) {
        payee.paid = 0;
      } else if(payee.value._id === thisUser.value._id) {
        payee.paid = parseFloat(expenseAmount);
      }

      return payee;
    });
    
    setPayers(updatedPayers);
    setIndividualPayer({_id: thisUser.value._id, name: thisUser.value.name, email: thisUser.value.name});
  };

  // Function to update payment values when different user paid some but not equal value
  const updatePaidValues = (e, thisPayee) => {
    const value = parseInt(e.target.value);
    const updatePayers = payers.filter((payee) => {
      if(payee.value._id === thisPayee.value._id) {
        payee.paid = value;
      }
      return payee;
    });
    setPayers(updatePayers);
  };
  
  return (
    <>
      {isPayerModalOpen ?
        <div className="payerModalPosition">
          <div className="modal payer-modal">

            {/* Modal Header */}
            <div className="modalHeader">
              <h5 className="heading">Choose payer</h5>
            </div>

            {/* Close Button */}
            <button className='closeBtn' onClick={() => {setIsPayerModalOpen(false)}}>
              <i className="fa-solid fa-xmark"></i>
            </button>
    
          {/* Modal Content */}
          <div className="modalContent">
            {payers.map((thisUser) => {
              return(
                <div className={`individual-members flex ${individualPayer._id === thisUser.value._id ? " individual-members-active" : ""}`} key={thisUser.value._id} onClick={() => {toggleDefaultPayer(thisUser)}} >
                  <img src={avatar} alt='User-avatar' className='user-avatar payer-avatar' />
                  <div className='user-name'>{thisUser.value.name}</div>
                </div>
              )
            })}
            {payers.length > 1 ?
              <>
                {/* Multiple People */}
                <div className="multiple-people multiple-people-border" id='multiple-people-div'>
                  <p className='multiple-people-text' onClick={showSection}>Multiple People</p>

                  <div id="multiple-people-section">
                    <span className='own-share'>
                      <input type="checkbox" onClick={checked} />
                      Each person paid their own share
                    </span>

                    {payers.map((thisUser) => {
                    return(
                      <div className={`individual-members`} key={thisUser.value._id} >
                        {/* User Name */}
                        <div className='user-name multiple-user'>{thisUser.value.name}</div>
                        {/* User Share Input */}
                        <div className="multiple-user-input">
                          <span className="multiple-user-symbol">₹</span>
                          <input type="text" className='multiple-user-amount' value={isPaidOwnShare ?  individualAmount: `${thisUser.paid > 0 && thisUser.paid !== expenseAmount ? thisUser.paid : ""}`} onChange={(e) => {updatePaidValues(e, thisUser)}} disabled={isPaidOwnShare ? true : false} />
                        </div>

                      </div>
                    )
                    })}

                  </div>
                </div>
              </>
              :
              ""
            }

          </div>
    
          </div>
        </div>
      :
      ""
      }
    </>
  )
};
