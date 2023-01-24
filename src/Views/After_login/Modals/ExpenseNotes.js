import React, { useContext } from 'react';
import ModalContext from '../../../context/modals/ModalContext';

export default function ExpenseNotes() {
    const {isExpenseNotesModalOpen, setIsExpenseNotesModalOpen, expenseNote, setExpenseNote} = useContext(ModalContext);

  return (
    <>
    {isExpenseNotesModalOpen ? 
      <div className="expenseNotesModalPosition">
          <div className="modal expenseNotes-modal">
              {/* Modal Header */}
              <div className="modalHeader">
                  <h5 className="heading">
                      Add notes
                  </h5>
              </div>
              {/* Close Button */}
              <button className="closeBtn" onClick={() => setIsExpenseNotesModalOpen(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>

              {/* Modal Content */}
              <div className="modalContent">
                <textarea className='expense-notes-text' cols="35" rows="10" value={expenseNote} onChange={(e) => setExpenseNote(e.target.value)}  />
              </div>
          </div>
      </div>
      :
      ""
    }
    </>
  )
}
