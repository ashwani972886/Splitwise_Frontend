import React, {useEffect, useState} from 'react';
import { avatar, logoWithBg } from '../../Utils/img';

export default function RecentActivity() {
    const [activity, setActivity] = useState([]);
    useEffect(() => {
        document.title = "Recent activity · Splitwise";
      }, []);
  return (
    <>
        <div id="top-bar" className='flex justify-between'>
            <span> Recent Activity </span>
        </div>

        {/* Content Section */}
        {/* {activity.length < 1 || !activity ?
        <div className="dashboard">
            There is no activity in your account yet. Try adding an expense!
        </div>
        : */}
        <>
        <div className='dashboard'>
            {/* Item 1 */}
            <div className="recent-act-item">
                <a href="" className='flex justify-between'>
                    {/* User Image */}
                    <div>
                        <img src= { logoWithBg } className='recent-act-lead-avatar' />
                        <img src= { avatar } className='recent-act-user-avatar' />

                        {/* Recent Item Content */}
                        <div className="recent-text-content">
                            <p> 
                                <b>You</b> deleted the group <b>"Trip"</b>. 
                                <span>Today</span>
                            </p>
                        </div>
                    </div>
                    
                    {/* Item action button */}
                    <a href='' className='recent-act-btn'>Undelete group</a>
                </a>
            </div>

            {/* Item 2 */}
            <div className="recent-act-item">
                <a href="" className='flex justify-between'>
                    {/* User Image */}
                    <div>
                        <img src= { logoWithBg } className='recent-act-lead-avatar' />
                        <img src= { avatar } className='recent-act-user-avatar' />

                        {/* Recent Item Content */}
                        <div className="recent-text-content">
                            <p> 
                                <b>You</b> created the group <b>"Trip"</b>. 
                                <span>Today</span>
                            </p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        <a href='' className='recent-act-btn show-more-btn'>Show more</a>
        </>
        {/* } */}

    </>
  )
}
