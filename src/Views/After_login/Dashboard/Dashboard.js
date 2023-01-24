import React, { useContext, useEffect, useState } from 'react';
import { useLocation, Link, Outlet, useNavigate } from "react-router-dom";

import { logoOnly } from '../../Utils/img';

import GroupContext from '../../../context/groups/GroupContext';
import ModalContext from '../../../context/modals/ModalContext';
import UserContext from '../../../context/user/UserContext';

export default function Dashboard() {
  let location = useLocation();
  let navigate = useNavigate();
  const auth = localStorage.getItem('auth');
  const {user, friends, fetchUser, inviteFriends, fetchFriendDetails} = useContext(UserContext);
  const {groups, fetchGroups} = useContext(GroupContext);
  const {success, setSuccess, setIsAddFriendModalOpen} = useContext(ModalContext);

  const [inviteEmail, setInviteEmail] = useState({email: ""});

  // To change field values
  const onChangeEmail = (e) => {
    setInviteEmail({...inviteEmail, [e.target.name]: e.target.value});
  };

  // Invite Friends function
  const handleInviteFriends = async (e) => {
    e.preventDefault();

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(inviteEmail.email.match(validRegex)) {

      const data = {
        invitedUsers: [inviteEmail.email]
      };
    
      const inviteFriendStatus = await inviteFriends(data);
    
      if(inviteFriendStatus) {
        navigate('/dashboard');
        setInviteEmail({email: ""});
      }
    } else {
      alert("Please enter a valid email address!");
    }


  };

  useEffect( () => {
    if(auth) {
      if(groups.length < 1) {
        fetchGroups();  
      }
      if(Object.keys(user).length === 0) {
        fetchUser();
      }
      // navigate('/dashboard');
    }
    if(success) {
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  }, [auth, success, setSuccess, groups, user]);
    return (
      <>
        {/* Expense Status */}
        {success ? 
          <div className="expenseStatus">
            <i className="fa-solid fa-check expense-icon"></i>
            <span className='expenseStatus-text'>Done</span>
          </div>
          :
          ""
        }
        
        {/* Dashboard Content */}
        <div id="center-container" className='flex justify-between'>
          {/* Left Bar */}
          <div id="left-bar">
            {/* Navigation menu on left side */}
            <div className="main-nav">
              <Link to="/dashboard" id="dashboard" className={`left-nav-item ${location.pathname==='/dashboard' ? 'group-active': ''}`}>
                <img src= { logoOnly } alt="" className='main-nav-logo' />
                Dashboard
              </Link>
              <br />
              {/* <Link to="activity" id="activity-nav" className={`left-nav-item ${location.pathname==='/dashboard/activity' ? 'group-active': ''}`}>
                <i className="fa-sharp fa-solid fa-flag icon-logo"></i>
                Recent activity
              </Link>
              <br />
              <Link to="all" id="all-expenses-nav" className={`left-nav-item ${location.pathname==='/dashboard/all' ? 'group-active': ''}`}>
                <i className="fa-sharp fa-solid fa-list icon-logo"></i>
                All expenses
              </Link> */}
            </div>
            {/* Left Bar Sections */}
            <div className='left-sections'>

              {/* Group Section */}
              <div className="left-sec-head flex justify-between align-items-center">
                GROUPS
                <Link to="/groups/new">
                  <i className="fa-solid fa-plus"></i>
                  add
                </Link>
              </div>
              <div className="left-sec-body">
                {groups.length > 0 ? 
                <>
                {groups.map((group) => {
                  return (
                    <Link to={`groups/${group._id}`} id={group._id} className={`group-item ${location.pathname===`/dashboard/groups/${group._id}` ? 'group-active': ''}`} key={group._id}>
                      <i className="fa-solid fa-tag icon-logo"></i>
                      {group.groupName}
                    </Link>

                  )
                })}
                </>
              : 
                <p className='empty-block'>You do not have any groups yet. <span><i className="fa-solid fa-question"></i></span></p>
                }
              </div>

              {/* Friends Section */}
              <div className="left-sec-head flex justify-between align-items-center">
                FRIENDS
                <Link onClick={() => {setIsAddFriendModalOpen(true);}}>
                  <i className="fa-solid fa-plus"></i>
                  add
                </Link>
              </div>
              <div className="left-sec-body">
                { friends.length > 0 ? 
                  <>
                    {friends.map(({friend}) => {
                      return (
                        <Link to={`friends/${friend._id}`} id={friend._id} className={`group-item ${location.pathname===`/dashboard/friends/${friend._id}` ? 'group-active': ''}`} key={friend._id} onClick={() => {fetchFriendDetails(friend._id)}} >
                          <i className="fa-solid fa-user icon-logo"></i>
                          {friend.name}
                        </Link>
                        
                      )
                    })}
                  </>
                :
                  <p className='empty-block'>You have not added any friends yet.</p>
                }
              </div>
              
              {/* Invite Section */}
              <div className="invite-friends-section">
                <div className="invite-head">Invite friends</div>
                <div className="invite-body">
                  <input type='email' className='invite-email' name='email' placeholder='Enter email address' onChange={onChangeEmail} value={inviteEmail.email} />
                  <button type='submit' className='btn send-invite-btn' onClick={handleInviteFriends}> Send Invite</button>
                </div>
              </div>
            </div>
            
          </div>

          {/* Center Bar */}
          <div id="center-bar">
            
            {/* Top bar */}
            <Outlet />

          </div>

          {/* Right Bar */}
          {/* <div class="right-bar">
            
          </div> */}
        </div>
      </>
  )
}
