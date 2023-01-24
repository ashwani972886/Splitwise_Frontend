import React, { useState, useContext } from 'react';

import ModalContext from '../../context/modals/ModalContext';
import UserContext from '../../context/user/UserContext';

export default function AddFriendModal() {

  const {setError, addFriends, notFoundFriends, setNotFoundFriends, inviteFriends} = useContext(UserContext);

  const {isAddFriendModalOpen, setIsAddFriendModalOpen} = useContext(ModalContext);
  
  const [email, setEmail] = useState("");
  const [friendsList, setFriendsList] = useState([]);

  // Function to add friends to list which have to be added
  const addFriendToList = async (e) => {
    e.preventDefault();
    let arr = friendsList;
    arr.push(email);
    setFriendsList(arr);
    setEmail("");
  };

  // Function to remove a friend from list which have to be added
  const removeFriend = (e, i) => {
    const rows = [...friendsList];
    rows.splice(i, 1);
    setFriendsList(rows);
  };

  // Function to close modal and reset all values to default
  const closeModal = () => {
    setIsAddFriendModalOpen(false);
    setEmail("");
    setFriendsList([]);
    setNotFoundFriends([]);
    setError([]);
  };
  
  // Function to add friends into database
  const addFriendsList = async () => {

      const data = {
        friends: friendsList
      };

      const addFriendStatus = await addFriends(data);

      if(addFriendStatus.status) {
        if(addFriendStatus.notFoundFriends.length < 1) {
          closeModal();
        } else {
          setFriendsList([]);
        }
      } else {
        alert(addFriendStatus.error);
      }

  };

  // Function to inviteFriends those are not found out of all the entered email addresses while adding
  const inviteNotFoundFriends = async () => {
    const data = {
      invitedUsers: notFoundFriends
    };

    const inviteFriendStatus = await inviteFriends(data);

    if(inviteFriendStatus) {
      alert("Invitation sent successfully!");
      closeModal();
    }
  };

  return (
    <>
      {isAddFriendModalOpen ?
        <>
          <div className="darkBG" onClick={closeModal}/>

          <div className="centered">
            <div className="modal">
              {/* Modal Header */}
              <div className="modalHeader">
                <h5 className="heading">Add friends</h5>
              </div>

              {/* Close Button */}
              <button className="closeBtn" onClick={closeModal}>
                <i className="fa-solid fa-xmark"></i>
              </button>

              {/* Modal Context */}
              <div className="modalContent">

                {/* Input Section with button */}
                <form onSubmit={addFriendToList }>
                  <div className="add-friend-input-section">
                    <label htmlFor="add-friend-input" className="add-friend-input-label">
                      To:
                      <input type="email" className="add-friend-input" name='add-friend-input' value={email} onChange={(e) => {setEmail(e.target.value);}} />
                    </label>
                  </div>
                    <button type='submit' className="add-friend-btn">Add friend to list</button>
                </form>

                {/* Added Friends List */}
                {friendsList.length >= 1 ?
                  <>
                    <div className="added-friends flex justify-center">
                      <div className="friends-to-be-added">Friends to be added</div>
                      <div className="extra-margin  flex justify-center">
                        {friendsList.map((thisFriend, index)=> {
                          return (
                              <div className="added-friend flex justify-center" key={index}>
                                <span className='added-friend-email'>{thisFriend}</span>
                                <span className='closeIcon' onClick={(e, i) => {removeFriend(e, i)}}><i className="fa-solid fa-xmark"></i></span>
                              </div>
                          )
                        })}
                      </div>
                    </div>
                  </>
                  :
                  ""
                }

                {/* Friends Do not Exist */}
                {notFoundFriends.length >= 1 ?
                  <div className="added-friends flex justify-center">
                    <div className="friends-dont-exist">Friends don't exist with us</div>
                      <div className="extra-margin extra-bottom-margin flex justify-center">
                        {notFoundFriends.map((thisFriend, index) => {
                          return (
                            <div className="added-friend flex justify-center" key={index}>
                              <span className="added-friend-email">{thisFriend}</span>
                              <span className="closeIcon"><i className="fa-solid fa-xmark"></i></span>
                            </div>
                          )
                        })}
                      </div>
                    <button className="invite-friends-btn" onClick={inviteNotFoundFriends}>Click here to invite them to Splitwise now!</button>
                  </div>
                  :
                  ""
                }
              </div>

              {/* Modal Actions */}
              <div className="modalActions myModalAction">
                <div className="actionsContainer">
                  <button className="cancelBtn" onClick={closeModal}>
                    Close
                  </button>
                  <button type="submit" className="saveBtn" onClick={addFriendsList}>
                    Save
                  </button>
                </div>
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

