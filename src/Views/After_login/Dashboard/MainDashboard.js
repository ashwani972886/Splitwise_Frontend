import React, {useContext, useEffect} from 'react';

import { splitManBlack, avatarBlue } from '../../Utils/img';
import { Link } from 'react-router-dom';

import GroupContext from '../../../context/groups/GroupContext';
import UserContext from '../../../context/user/UserContext';
import ModalContext from '../../../context/modals/ModalContext';
import SettleModalContext from '../../../context/modals/SettleModalContext';


export default function MainDashboard() {
  const auth = localStorage.getItem('auth');
  const { user, friends, fetchUser, totalBalance, oweBalance, owedBalance } = useContext(UserContext);
  const { groups, fetchGroups } = useContext(GroupContext);
  const {setIsNewExpense, setIsAddExpenseModalOpen} = useContext(ModalContext);
  const {setIsSettleExpenseModalOpen} = useContext(SettleModalContext);

  
  useEffect(() => {
    document.title = "Dashboard · Splitwise";
    if(auth) {
      if(groups.length < 1) {
        fetchGroups();  
      }
      if(Object.keys(user).length === 0) {
        fetchUser();
      }
    }
  }, [auth, fetchGroups, fetchUser]);
  return (
    <>
      <div id="top-bar" className='flex justify-between'>
        <span> Dashboard </span>
        <div id="actions">
        <button className="btn add-expense-btn" onClick={() => {setIsNewExpense(true); setIsAddExpenseModalOpen(true)}}>Add an expense</button>
        <button className="btn settle-up-btn" onClick={() => {setIsSettleExpenseModalOpen(true)}}>Settle up!</button>
        </div>
      </div>

      {/* Bottom Section */}
        
        {groups.length > 0 || friends.length > 0 ?
        <>
          <div className="dashboard-balances flex justify-around">
              <div className="balance-display text-center">
                total balance
                { totalBalance >= 0 ? 
                    <span className="positive-bal">{totalBalance !== 0 ? "+" : ""}₹{totalBalance}</span>
                    :
                    <span className="negative-bal">-₹{-totalBalance}</span>

                }
              </div>
              <div className="border-right"></div>
              <div className="balance-display text-center">
                you owe
                <span className="negative-bal">₹{oweBalance}</span>
              </div>
              <div className="border-right"></div>
              <div className="balance-display text-center no-border">
                you are owed
                <span className="positive-bal">₹{owedBalance}</span>
              </div>
          </div>

          <div className="balance-summary">
            <h3> YOU OWE <span className='float-right'>YOU ARE OWED</span></h3>
            <div className="list flex justify-around  ">
              
                {oweBalance > 0 ? 
                  <>
                    <div className="summary-block" id='owe'>
                      {friends.map((friend) => {
                        return(
                          <ul key={friend.friend._id} className="summary-list">
                            {friend.balances.owe > 0 ?
                            <li>
                              <Link to={`friends/${friend.friend._id}`} id={friend.friend._id}  className='summary-fields' >
                                <img src={ avatarBlue } alt="User Profile" className="group-user-avatar-faded" />
                                <span className='owe-person'>{friend.friend.name}</span>
                                <span className='negative-bal owe-amount'>you owe ₹{(friend.balances.owe).toFixed(2)}</span>
                              </Link>
                              </li>
                              :
                              ""
                            }
                          </ul>
                        )
                      })}
                    </div>
                  </>
                  :
                    <div className="summary-block" id='owe'>
                      You do not owe anything
                    </div>
                }
              <div className="border-right"></div>
              {owedBalance > 0 ? 
                <>
                  <div className="summary-block" id='owed'>
                    {friends.map((friend) => {
                      return (
                        <ul key={friend.friend._id}>
                          {friend.balances.owed > 0 ?
                            <li>
                              <Link to={`friends/${friend.friend._id}`} id={friend.friend._id} className='summary-fields'>
                                <img src={ avatarBlue } className="group-user-avatar-faded" alt="User" />
                                <span className='owe-person'>{friend.friend.name}</span>
                                <span className='positive-bal owe-amount'>owes you ₹{(friend.balances.owed).toFixed(2)}</span>
                              </Link>
                            </li>
                            :
                            ""
                          }

                        </ul>
                      )
                    })}
                  </div>
                </>
              :
              <div className="summary-block owed-empty owed inline-block" id='owed'>
                You are not owed anything
              </div>

              }

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
              <p> Click "Add on expense" above to get started, <br /> or invite some friends first! </p>
              <br />
              <Link className="btn add-expense-btn add-friend-btn" onClick={() => {setIsNewExpense(true); setIsAddExpenseModalOpen(true)}}>
                <i className="fa-solid fa-plus"></i>
                <i className="fa-solid fa-user"></i>
                &nbsp;&nbsp;Add friends on Splitwise
              </Link>
            </div>
          </div>
        </>
        }

      </>
  )
}
