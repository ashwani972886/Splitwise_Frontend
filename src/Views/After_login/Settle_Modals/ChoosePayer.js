import React, { useContext } from 'react';
import { avatar } from '../../Utils/img';

// import UserContext from '../../../context/user/UserContext';
import SettleModalContext from '../../../context/modals/SettleModalContext';
// import ModalContext from '../../../context/modals/ModalContext';

export default function ChoosePayer() {
    // const {user, oweBalance, owedBalance, friends} = useContext(UserContext);

    const {
        isSettleChoosePayerModalOpen, setIsSettleChoosePayerModalOpen,
        setIsSettleChooseRecipientModalOpen, settleIndividualPayer, setSettleIndividualPayer, friendsIncludingUser, setFriendsIncludingUser
    } = useContext(SettleModalContext);

    // Function to change default payer
    const toggleDefaultPayer = (thisUser) => {
        setSettleIndividualPayer({_id: thisUser._id, name: thisUser.name, email: thisUser.name})
    };

  return (
    <>
        {isSettleChoosePayerModalOpen ?
            <>
                <div className="payerModalPosition">
                    <div className="modal payer-modal">

                        {/* Modal Header */}
                        <div className="modalHeader">
                            <h5 className="heading">Choose Payer</h5>
                        </div>

                        {/* Close Button */}
                        <button className="closeBtn" onClick={() => {setIsSettleChoosePayerModalOpen(false)}}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>

                        {/* Modal Content */}
                        <div className="modalContent">
                            {friendsIncludingUser.map(({friend}) => {
                                return(
                                    <div className={`individual-members flex ${settleIndividualPayer._id === friend._id ? " individual-members-active" : ""}`} key={friend._id}  onClick={() => {toggleDefaultPayer(friend)}}>
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
