import React, {useContext} from 'react';
import SettleModalContext from '../../../context/modals/SettleModalContext';

export default function SettleNote() {

    const {
        isSettleNotesModalOpen, setIsSettleNotesModalOpen,
        settleNote, setSettleNote
    } = useContext(SettleModalContext);

  return (
    <>
        {isSettleNotesModalOpen ?
            <div className="expenseNotesModalPosition">
                <div className="modal expenseNotes-modal">
                    {/* Modal Header */}
                    <div className="modalHeader">
                        <h5 className="heading">
                            Add notes
                        </h5>
                    </div>
                    {/* Close Button */}
                    <button className="closeBtn" onClick={() => {setIsSettleNotesModalOpen(false)}}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>

                    {/* Modal Content */}
                    <div className="modalContent">
                        <textarea className='expense-notes-text' cols="35" rows="10" value={settleNote} onChange={(e) => setSettleNote(e.target.value)}  />
                    </div>
                </div>
            </div>
            :
            ""
        }
    </>
  )
}
