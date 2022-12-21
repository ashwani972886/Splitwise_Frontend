import React from 'react'

export default function Group() {
  return (
    <>
        <div id="top-bar" className='flex justify-between'>
            <span> Dashboard </span>
            <div id="actions">
            <a href='' className="btn add-expense-btn">Add an expense</a>
            <a href='' className="btn settle-up-btn">Settle up!</a>
            </div>
        </div>
    </>
  )
}
