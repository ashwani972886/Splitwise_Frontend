import React, {useContext, useEffect} from 'react';
import { splitManSide } from '../../Utils/img';
import ModalContext from '../../../context/modals/ModalContext';

export default function AllExpenses() {
  const {setIsAddExpenseModalOpen} = useContext(ModalContext);
  
  useEffect(() => {
    document.title = "All expenses · Splitwise";
  }, []);
  return (
    <>
      <div id="top-bar" className='flex justify-between'>
        <span> All expenses </span>
        <div id="actions">
          <button className="btn add-expense-btn" onClick={() => {setIsAddExpenseModalOpen(true)}}>Add an expense</button>
          <button className="btn settle-up-btn">Settle up!</button>
        </div>
      </div>

      {/* Bottom Section */}
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
  )
}
