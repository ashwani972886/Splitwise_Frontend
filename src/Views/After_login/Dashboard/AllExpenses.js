import React, {useEffect} from 'react';
import { splitManSide } from '../../Utils/img';

export default function AllExpenses() {
  useEffect(() => {
    document.title = "All expenses · Splitwise";
  }, []);
  return (
    <>
      <div id="top-bar" className='flex justify-between'>
        <span> All expenses </span>
        <div id="actions">
        <a href='' className="btn add-expense-btn">Add an expense</a>
        <a href='' className="btn settle-up-btn">Settle up!</a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className='dashboard flex'>
        <div id="dashboard-logo">
          <img src= { splitManSide } alt="" />
        </div>

        <div id="dashboard-body">
          <h2> You have not added any expenses yet </h2>
          <p>To add a new expense, click the orange "Add an expense" button.</p>
        </div>
      </div>
    </>
  )
}
