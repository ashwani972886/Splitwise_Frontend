import React, { useContext } from 'react';
import { avatar } from '../../Utils/img';

import UserContext from '../../../context/user/UserContext';
import SettleModalContext from '../../../context/modals/SettleModalContext';

export default function ChooseRecipient() {
    const {friends} = useContext(UserContext);
    const {
        isSettleChooseRecipientModalOpen, setIsSettleChooseRecipientModalOpen, friendsIncludingUser, setFriendsIncludingUser, settleIndividualRecipient, setSettleIndividualRecipient
    } = useContext(SettleModalContext);

     // Function to change default recipient
     const toggleDefaultRecipient = (thisUser) => {
        setSettleIndividualRecipient({_id: thisUser._id, name: thisUser.name, email: thisUser.name})
    };
  return (
    <>
        {isSettleChooseRecipientModalOpen ?
            <>
                <div className="payerModalPosition">
                    <div className="modal payer-modal">

                        {/* Modal Header */}
                        <div className="modalHeader">
                            <h5 className="heading">Choose a recipient</h5>
                        </div>

                        {/* Close Button */}
                        <button className="closeBtn" onClick={() => {setIsSettleChooseRecipientModalOpen(false)}}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>

                        {/* Modal Content */}
                        <div className="modalContent">
                            {friendsIncludingUser.map(({friend}) => {
                                return(
                                    <div className={`individual-members flex ${settleIndividualRecipient._id === friend._id ? " individual-members-active" : ""}`} key={friend._id}  onClick={() => {toggleDefaultRecipient(friend)}}>
                                      <img src={avatar} alt='User-avatar' className='user-avatar payer-avatar' />
                                      <div className='user-name'>{friend.name}</div>
                                    </div>
                                )
                            })}
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
