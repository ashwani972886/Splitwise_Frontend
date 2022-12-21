import React, {useContext, useEffect} from 'react';
import { splitManBlack, avatarBlue } from '../../Utils/img';
import GroupContext from '../../../context/groups/GroupContext';
import UserContext from '../../../context/user/UserContext';
import { Link } from 'react-router-dom';

export default function MainDashboard() {
  const auth = localStorage.getItem('auth');
  const {friends, fetchUser} = useContext(UserContext);
  const {groups, fetchGroups} = useContext(GroupContext);

  
  useEffect(() => {
    document.title = "Dashboard · Splitwise";
    if(auth) {
      fetchGroups();  
      fetchUser();
    }
  }, [auth]);
  return (
    <>
      <div id="top-bar" className='flex justify-between'>
        <span> Dashboard </span>
        <div id="actions">
        <a href='' className="btn add-expense-btn">Add an expense</a>
        <a href='' className="btn settle-up-btn">Settle up!</a>
        </div>
      </div>

      {/* Bottom Section */}
        
        {groups.length > 0 || friends.length > 0 ?
        <>
          <div className="dashboard-balances flex justify-around">
              <div className="balance-display text-center">
                total balance
                <span className="positive-bal">+₹200</span>
              </div>
              <div className="balance-display text-center">
                you owe
                <span className="negative-bal">-₹100</span>
              </div>
              <div className="balance-display text-center no-border">
                you are owed
                <span className="positive-bal">+₹300</span>
              </div>
          </div>

          <div className="balance-summary">
            <h3> YOU OWE <span className='float-right'>YOU ARE OWED</span></h3>
            <div className="list">
              <div className="summary-block owe inline-block" id='owe'>
                {/* You do not owe anything */}
                <Link className='summary-fields'>
                <img src={ avatarBlue } className="group-user-avatar-faded" />
                {/* <h5>Aqib Ali</h5> */}
                <span className='owe-person'>Aqib Ali</span>
                <span className='negative-bal owe-amount'>You owe ₹100</span>
                </Link>
              </div>
              <div className="summary-block owed inline-block" id='owed'>
                {/* You are not owed anything */}
                <Link className='summary-fields'>
                <img src={ avatarBlue } className="group-user-avatar-faded" />
                {/* <h5>Aqib Ali</h5> */}
                <span className='owe-person'>Manish Kumar</span>
                <span className='positive-bal owe-amount'>owes you ₹300</span>
                </Link>
              </div>
            </div>

          </div>

        </>
        :
        <>
          <div className='dashboard flex'>
            <div id="dashboard-logo">
              <img src= { splitManBlack } alt="" />
            </div>

            <div id="dashboard-body">
              <h2> Welcome to Splitwise! </h2>
              <p> Splitwise helps you split bills with friends. </p>
              <p> Click "Add on expense" above to get started, or invite some friends first! </p>
              <br />
              <a href='' className="btn add-expense-btn add-friend-btn">
                <i className="fa-solid fa-plus"></i>
                <i className="fa-solid fa-user"></i>
                &nbsp;&nbsp;Add friends on Splitwise
              </a>
            </div>
          </div>
        </>
        }

      </>
  )
}
