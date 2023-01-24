// import React, { useContext } from 'react';
import React from 'react';

import { splitManSide } from '../../Utils/img';

// import ModalContext from '../../../context/modals/ModalContext';

export default function Group() {
  // const {isAddExpenseModalOpen, setIsAddExpenseModalOpen} = useContext(ModalContext);
  return (
    <>
        {/* <div id="top-bar" className='flex justify-between'>
          <span> Group Name </span>
          <div id="actions">
          <button className="btn add-expense-btn" onClick={() => {setIsAddExpenseModalOpen(true)}}>Add an expense</button>
          <button className="btn settle-up-btn">Settle up!</button>
          </div>
        </div> */}

          {/* Empty Section */}
          <div className='dashboard flex'>
          <div id="dashboard-logo">
            <img src= { splitManSide } alt="" />
          </div>

          <div id="dashboard-body">
            <h2> This feature will appear soon. </h2>
            <p>Soon, you will be able to view and add <br /> expenses in group.</p>
          </div>
        </div>
    </>
  )
};
