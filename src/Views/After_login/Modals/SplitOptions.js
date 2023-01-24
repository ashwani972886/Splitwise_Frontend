import React, { useEffect, useContext } from 'react';
import Tooltip from 'rc-tooltip';

import { avatar } from '../../Utils/img';

import UserContext from '../../../context/user/UserContext';
import ModalContext from '../../../context/modals/ModalContext';

export default function SplitOptions() {

  const {user} = useContext(UserContext);

  const {
    isSplitOptionsModalOpen, setIsSplitOptionsModalOpen,
    expenseAmount,
    payers, setPayers,
    setSharePerPerson,
    leftAmount, setLeftAmount,
    splitMethod, setSplitMethod,
    splitType, setSplitType,
    setSplitUnequal,
    totalShareAmount, setTotalShareAmount,
    totalShareCount, setTotalShareCount
  } = useContext(ModalContext);  
  
  // Function to toggle check and split amount accordingly
  const onUncheck = async (e, thisUser) => {

    let updatedPayers = null;

    // Filtering out payers list and finding out the legth based on that user is included in share or not
    let payeeCounter = payers.filter((payee) => { 
      return payee.includedInShare === true;
    }).length;
    
    if(payeeCounter === 0) {
      setTotalShareAmount(0);
    }
    let newShare = 0;
    
    // Function to update Share amount on select and deselect
    const updatePayers = (isIncluded) => {
     
      newShare = parseFloat((expenseAmount/payeeCounter).toFixed(2));
      
      if(newShare === Infinity) {
        newShare = parseFloat((expenseAmount/payers.length).toFixed(2));
      }
      
      setSharePerPerson(newShare);
      
      let changePayers = payers.filter((thisPayee) => {

        if(thisPayee.includedInShare ){
          thisPayee.share = newShare;
        }
        if(thisPayee.value._id === thisUser.value._id) {
          thisPayee.includedInShare = isIncluded;

          if(isIncluded) {
            thisPayee.share = newShare;
          } else {
            thisPayee.share = 0;
          }
        } 

        return thisPayee;
      });

      return changePayers;
    };

    if(e.target.checked) {
      // Increase payee counter when user is included in share
      payeeCounter += 1;
      updatedPayers =  await updatePayers(true);

    } else {
      // Deccrease payee counter when user is deselected from share
      payeeCounter -= 1;
      updatedPayers = await updatePayers(false);

    }
   
    setPayers(updatedPayers);
  };

  // Function to hide/unhide different sections and update states as per selected section
  const toggleSplitSections = async (sectionName) => {
    // Hiding all split sections
    // document.getElementById('split-equally-section').style.display = 'none';
    // document.getElementById('split-by-amounts-section').style.display = 'none';
    // document.getElementById('split-by-percentages-section').style.display = 'none';
    // document.getElementById('split-by-shares-section').style.display = 'none';

    // Showing selected split section
    // document.getElementById(sectionName).style.display = 'block';
    
    // Function to update default share values based on selected section
    const updateShare = (shareAmount) => {
      const updatePayers = payers.filter((payee) => {
        payee.share = shareAmount;
        payee.totalShares = 1;
        return payee;
      });
      return updatePayers;
    };
    
    // Updating different states based on selected split section
    if(sectionName === 'split-equally-section' || sectionName === 'split-by-shares-section') {

      const newShare = parseFloat((expenseAmount/payers.length).toFixed(2));
      const updatedPayers = await updateShare(newShare);
      
      setPayers(updatedPayers);
      
      if(sectionName === "split-equally-section") {
        setSplitUnequal(false);
        setSplitMethod("equally");
      } else {
        setSplitUnequal(true);
        setSplitMethod("shares");
        setTotalShareCount(payers.length);
      }
  
    } else if(sectionName === 'split-by-amounts-section' || sectionName === 'split-by-percentages-section') {

      setSplitUnequal(true);

      const updatedPayers = await updateShare(0);

      setPayers(updatedPayers);

      setLeftAmount(expenseAmount);

      if(sectionName === 'split-by-amounts-section') {
        setSplitMethod("amounts");
      } else {
        setSplitMethod("percentages");
      }
    }
    
  };

  // Function to change share when there is only two members in list and one owe whole amount another
  const oweSplit = (newSplitType) => {
    let newShare = 0;
    let updatePayers = null;

    if(newSplitType === "Split") {
      document.getElementById('split-section-div').style.display = 'block';
      setSplitType("Split");
      newShare = parseFloat((expenseAmount/payers.length).toFixed(2));
      updatePayers = payers.filter((thisPayee) => {
        if(thisPayee.value._id === user._id) {
          thisPayee.paid = expenseAmount;
          thisPayee.share = newShare;
        } else {
          thisPayee.share = newShare;
        }
        
        return thisPayee;
      });
    } else if(newSplitType === "Owe Full") {
      document.getElementById('split-section-div').style.display = 'none';
      setSplitType("Owe Full");
      updatePayers = payers.filter((thisPayee) => {
        if(thisPayee.value._id === user._id) {
          thisPayee.paid = 0;
          thisPayee.share = expenseAmount;
        } else {
          thisPayee.paid = expenseAmount;
          thisPayee.share = 0;
        }

        return thisPayee;
      });
      
    } else {
      document.getElementById('split-section-div').style.display = 'none';
      setSplitType("Owed Full");
      updatePayers = payers.filter((thisPayee) => {
        if(thisPayee.value._id === user._id) {
          thisPayee.paid = expenseAmount;
          thisPayee.share = 0;
        } else {
          thisPayee.paid = 0;
          thisPayee.share = expenseAmount;
        }

        return thisPayee;
      });

    }

    setPayers(updatePayers);
  };

  // Function to update share values as per selected section
  const updateShareValues = (e, thisPayee, splitBy) => {
    let value = 0;
    let otherValue = 0;
    let total = 0;

    if(splitBy === 'equally' || splitBy === 'amount') {
      value = parseFloat(e.target.value); 
    } else if(splitBy === 'percentage') {
      value = (e.target.value/100)*expenseAmount;
    } else if(splitBy === 'share') {
      if(e.target.value === "" || isNaN(e.target.value)) {
        e.target.value = 0;
      }

      let finalTotalShareCount = 0;
      finalTotalShareCount = (totalShareCount - thisPayee.totalShares) + parseFloat(e.target.value);

      setTotalShareCount(finalTotalShareCount);

      value = ((expenseAmount/finalTotalShareCount)*e.target.value).toFixed(2);

      otherValue = (expenseAmount/finalTotalShareCount);
    }

    // Function to update share amount share wise
    const updatePayers = payers.filter((payee) => {
      if(payee.value._id === thisPayee.value._id) {
        if(isNaN(value)) {
          payee.share = 0;
        } else {
          payee.share = value;
          payee.totalShares = e.target.value;
        }
      } else {
        if(splitBy === 'share') {
          payee.share = (otherValue*payee.totalShares).toFixed(2);
        }
      }

      return payee;
    });

    const finalTotal = updatePayers.reduce((incrementer, currentValue) => incrementer + currentValue.share, total);

    setTotalShareAmount(finalTotal);
    setLeftAmount(expenseAmount - finalTotal);
    setPayers(updatePayers);

  };

  useEffect(() => {
    let total = 0;
    const finalTotal = payers.reduce((incrementer, currentValue) => incrementer + currentValue.share, total);
    setTotalShareAmount(finalTotal);
  }, [payers, setTotalShareAmount]);
  
  
  return (
    <>
      {isSplitOptionsModalOpen ?  
        <div className="splitOptionsModalPosition">
          <div className="modal splitOptions-modal">
            {/* Modal Header */}
            <div className="modalHeader">
              <h5 className="heading">Choose split options</h5>
            </div>
            {/* Close Button */}
            <button className="closeBtn" onClick={() => {setIsSplitOptionsModalOpen(false);}}>
              <i className="fa-solid fa-xmark"></i>
            </button>

            {/* Modal Content */}
            <div className="modalContent">

              {/* Different Split Criteria */}
              {payers.length === 2 ? 

                <div className="split-criteria split-criteria-border">

                  <button className={`splitCriteria-info-btn ${splitType === "Split" ? 'splitCriteria-info-btn-active': ''}`} onClick={() => {oweSplit("Split")}} > 
                    Split the expense
                  </button>

                  <button className={`splitCriteria-info-btn ${splitType === "Owe Full" ? 'splitCriteria-info-btn-active': ''}`} onClick={() => {oweSplit("Owe Full")}} >
                    {expenseAmount > 0 ? `You owe ${(payers[1].value.name).split(' ')[0]} ₹${expenseAmount}` : "You owe the full amount"}
                  </button>

                  <button className={`splitCriteria-info-btn ${splitType === "Owed Full" ? 'splitCriteria-info-btn-active': ''}`} onClick={() => {oweSplit("Owed Full")}}>
                    {expenseAmount > 0 ?`${(payers[1].value.name).split(' ')[0]} owes you ₹${expenseAmount}`: "They owe the full amount"}
                  </button>
                </div>
                :
                ""
              }
              
              {/* Split Section */}
              <div className="split-section" id='split-section-div'>
                {/* Split Button Section */}
                <div className="split-option-button-section flex">
                  <Tooltip placement="top" trigger={['hover']} overlay={<span>Split equally</span>}>
                    <button className="split-option-btn" onClick={() => {toggleSplitSections('split-equally-section')}}>
                      =
                    </button>
                  </Tooltip>
                  <Tooltip placement="top" trigger={['hover']} overlay={<span>Split by exact amounts</span>}>
                    <button className="split-option-btn" onClick={() => {toggleSplitSections('split-by-amounts-section')}}>
                      1.23
                    </button>
                  </Tooltip>
                  <Tooltip placement="top" trigger={['hover']} overlay={<span>Split by percentages</span>}>
                    <button className="split-option-btn" onClick={() => {toggleSplitSections('split-by-percentages-section')}}>
                      %
                    </button>
                  </Tooltip>
                  <Tooltip placement="top" trigger={['hover']} overlay={<span>Split by shares</span>}>
                    <button className="split-option-btn" onClick={() => {toggleSplitSections('split-by-shares-section')}}>
                      <i className="fa-solid fa-bars-progress"></i>
                    </button>
                  </Tooltip>
                </div>

                {/* Split Sections */}
                <div className="split-amounts-section">
                  {/* Split equally */}
                  {splitMethod === "equally" ?
                    <div className="split-equally" id='split-equally-section'>
                      <h2>Split equally</h2>
                      {payers.map((thisUser) => {
                        return (
                          <div className={`sharing-users ${!thisUser.includedInShare ? 'disabled-users': ''} flex justify-between`} key={thisUser.value._id}>
                            <div className='flex'>
                              <input type="checkbox" name="" id="" className='sharing-user-enable' checked={thisUser.includedInShare ? true: false} onChange={(e) => onUncheck(e, thisUser, 'equally')} />
                              <img src={avatar} alt="" className='sharing-user-avatar' />
                              <span className='sharing-user-name no-total-share'>
                                {thisUser.value.name}
                                {/* <br />
                                <span className='sharing-user-share'>Total share: ₹</span> */}
                              </span>
                            </div>
                            <div className='split-sharing-amount'>₹{thisUser.includedInShare ? <>{thisUser.share > 0 ? thisUser.share : "0.00"}</> : "0.00"}</div>
                          </div>
                        )
                      })}

                    </div>
                    :
                    ""
                  }

                  {/* Split by exact amounts */}
                  {splitMethod === "amounts" ? 
                    <div className="split-equally" id='split-by-amounts-section'>
                      <h2>Split by exact amounts</h2>
                      {payers.map((thisUser) => {
                        return (
                          <div className={`sharing-users flex justify-between`} key={thisUser.value._id}>
                            <div className='flex'>
                              <img src={avatar} alt="" className='sharing-user-avatar' />
                              <span className='sharing-user-name no-total-share'>
                                {thisUser.value.name}
                              </span>
                            </div>
                            <div className='split-sharing-amount exact-amounts-input'>
                              <span className="multiple-user-symbol">₹</span>
                              <input type="text" className='multiple-user-amount sharing-input' value={thisUser.share  > 0 ? thisUser.share : ""} onChange={(e) => {updateShareValues(e, thisUser, 'amount')}}  />
                            </div>
                          </div>
                        )
                      })}
                      {/* Total Share Amount Summary */}
                      <div className="total-share-amount flex justify-between">
                        <span className='total-text'>TOTAL</span>
                        <span className='total-amount-text'>
                          ₹{totalShareAmount > 0 ? totalShareAmount : "0.00"}
                          <br />
                          <span className="left-amount-text">
                            {leftAmount > 0 ? `₹${leftAmount}` : <> {leftAmount < 0 ? `-₹${-leftAmount}` : "0.00"} </>} left
                          </span> 
                        </span>
                      </div>

                    </div>
                    :
                    ""
                  }

                  {/* Split by percentages */}
                  {splitMethod === "percentages" ? 
                    <div className="split-equally" id='split-by-percentages-section'>
                      <h2>Split by percentages</h2>
                      {payers.map((thisUser) => {
                        return (
                          <div className={`sharing-users flex justify-between`} key={thisUser.value._id}>
                            <div className='flex'>
                              <img src={avatar} alt="" className='sharing-user-avatar' />
                              <span className='sharing-user-name no-total-share'>
                                {thisUser.value.name}
                              </span>
                            </div>
                            <div className='split-sharing-amount exact-amounts-input'>
                              <input type="text" className='percentage-amount-input' value={thisUser.share  > 0 && thisUser.share !== expenseAmount ? (thisUser.share/expenseAmount)*100 : ""} onChange={(e) => {updateShareValues(e, thisUser, 'percentage')}}  />
                              <span className="percentage-symbol">%</span>
                            </div>
                          </div>
                        )
                      })}
                      {/* Total Share Amount Summary */}
                      <div className="total-share-amount flex justify-between">
                        <span className='total-text'>TOTAL</span>
                        <span className='total-amount-text'>
                          {totalShareAmount > 0 ? `${((totalShareAmount/expenseAmount)*100).toFixed(2)}%` : "0.00%"}
                          <br />
                          <span className="left-amount-text">
                            {leftAmount > 0 ? `${((leftAmount/expenseAmount)*100).toFixed(2)}%` : <> {leftAmount < 0 ? `${((leftAmount/expenseAmount)*100).toFixed(2)}%` : "0.00"} </>} left
                          </span> 
                        </span>
                      </div>

                    </div>
                    :
                    ""
                  }

                  {/* Split by shares */}
                  {splitMethod === "shares" ?
                    <div className="split-equally" id='split-by-shares-section'>
                      <h2>Split by shares</h2>
                      {payers.map((thisUser) => {
                        return (
                          <div className={`sharing-users flex justify-between`} key={thisUser.value._id}>
                            <div className='flex'>
                              <img src={avatar} alt="" className='sharing-user-avatar' />
                              <span className='sharing-user-name no-total-share'>
                                {thisUser.value.name}
                                <br />
                                <span className='sharing-user-share'>Total share: ₹{thisUser.share > 0 ? thisUser.share: "0.00"}</span>
                              </span>
                            </div>
                            <div className='split-sharing-amount exact-amounts-input'>
                              <input type="text" className='shares-amount-input' value={thisUser.share  > 0 ? ((thisUser.share*totalShareCount)/expenseAmount).toFixed(2) : ""} onChange={(e) => {updateShareValues(e, thisUser, 'share')}}  />
                              <span className="share-symbol">share(s)</span>
                            </div>
                          </div>
                        )
                      })}

                    </div>
                    :
                    ""
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      :
      ""
      }
    </>
  )
}
