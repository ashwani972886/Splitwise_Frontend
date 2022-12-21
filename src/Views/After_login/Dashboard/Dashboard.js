import React, { useContext, useEffect } from 'react';
import { logoOnly } from '../../Utils/img';
import GroupContext from '../../../context/groups/GroupContext';
import UserContext from '../../../context/user/UserContext';

import {
  useLocation,
  Link,
  Outlet,
  useNavigate
} from "react-router-dom";

export default function Dashboard() {
  let location = useLocation();
  let navigate = useNavigate();
  const auth = localStorage.getItem('auth');
  const {friends, fetchUser} = useContext(UserContext);
  const {groups, fetchGroups} = useContext(GroupContext);
  useEffect( () => {
    if(auth) {
      fetchGroups();  
      fetchUser();
      navigate('/dashboard');
    }
  }, [auth]);
    return (
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
          <Link to="activity" id="activity-nav" className={`left-nav-item ${location.pathname==='/dashboard/activity' ? 'group-active': ''}`}>
            <i className="fa-sharp fa-solid fa-flag icon-logo"></i>
            Recent activity
          </Link>
          <br />
          <Link to="all" id="all-expenses-nav" className={`left-nav-item ${location.pathname==='/dashboard/all' ? 'group-active': ''}`}>
            <i className="fa-sharp fa-solid fa-list icon-logo"></i>
            All expenses
          </Link>
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

              {/* <a href="#trips" id='trips' className='group-item group-active'>
                <i className="fa-solid fa-tag icon-logo"></i>
                Trip
              </a>
              <br />
              <a href="#college-friends" id='college-friends'  className='group-item group-active' >
                <i className="fa-solid fa-tag icon-logo"></i>
                College Friends
              </a> */}
          </div>

          {/* Friends Section */}
          <div className="left-sec-head flex justify-between align-items-center">
            FRIENDS
            <a href="#">
            <i className="fa-solid fa-plus"></i>
            add
            </a>
          </div>
          <div className="left-sec-body">
            { friends.length > 0 ? 
              <>
                {friends.map((friend) => {
                  return (
                    <Link to={`friends/${friend.friend._id}`} id={friend.friend._id} className={`group-item ${location.pathname===`/dashboard/friends/${friend.friend._id}` ? 'group-active': ''}`} key={friend.friend._id}>
                      <i className="fa-solid fa-user icon-logo"></i>
                      {friend.friend.name}
                    </Link>
                    
                  )
                })}
              </>
            :
              <p className='empty-block'>You have not added any friends yet.</p>
            }

            {/* <a href="#aqib" id='aqib' className='group-item group-active'>
              <i className="fa-solid fa-user icon-logo"></i> 
              aqib.ali0401
            </a>
            <br />
            <a href="#aqib" id='aqib' className='group-item group-active'>
              <i className="fa-solid fa-user icon-logo"></i> 
              aqib.ali0401
            </a> */}

          </div>
        </div>
      </div>

      {/* Center Bar */}
      <div id="center-bar">
        
        {/* Top bar */}
        <Outlet />

      </div>

      {/* Right Bar */}
      {/* <div id="right-bar">
        
      </div> */}
    </div>
  )
}
