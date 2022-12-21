import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { logoOnly, avatarBlue } from '../Utils/img';
import UserContext from '../../context/user/UserContext';

export default function CreateGroup() {
    const navigate = useNavigate(); //Navigator
    
    const {user, error} = useContext(UserContext);

    const [groupDetails, setGroupDetails] = useState({name:"", type: "Home"});
    // const [user, setUser] = useState({});
    // const [error, setError] = useState([]);
    // const [members, setMembers] = useState([{name: "", email: ""},{name: "", email: ""},{name: "", email: ""}]);
    const [members, setMembers] = useState([{ email: "" },{ email: "" },{ email: "" }]);
    // Function to add a member details to group info
    const addMember = () => {
      // setMembers([...members, {name: "", email: ""}]);
      setMembers([...members, { email: "" }]);
    };

  // Function to remove a member details from group info
  const removeMember = (i, e) => {
    e.preventDefault();
    const rows = [...members];
    rows.splice(i, 1);
    setMembers(rows);
  };

  // To show form fields on keyup
  const toggleFormContent = () => {
   const groupMemberSection = document.getElementById('group-member-section');
   groupMemberSection.style.display = 'block';
   groupMemberSection.style.opacity = 1;
  };

  // To change field values
  const onchangeGroupDetails = (e) => {
    setGroupDetails({...groupDetails, [e.target.name]: e.target.value});
  };

  // To add member details
  const onchangeMembersList = (i, e) => {
    const list = [...members];
    list[i][e.target.name] = e.target.value;
    setMembers(list);
  };
  
// Add group function to create a user on form submit

  
  // Updating the title using useEffect() hook
  useEffect(() => {
    document.title = "Create a group :: Splitwise";
    const auth = localStorage.getItem('auth');
        if((auth)) {
            // setUser((user) => {
            //     user =JSON.parse(localStorage.getItem('user'));
            //     return user;
            // });
        } 
  }, []);
  
  return (
    <div className='create-group-container flex justify-center'>
        <Link to='/'><img src={ logoOnly } className="create-group-image" /></Link>
      <div className="create-group-content">
        <div className="create-group-form justify-center">
          <h2>START A NEW GROUP</h2>
          {error.length < 1  || !error ?
            "" : 
            <div className="create-group-error">
            The following errors occured:
            <ul>
              {/* {error} */}
              {error.map((err, i) => {
                return <li key = { i }>{err}</li>
              })}
            </ul>
          </div>
          }
          <form>
              <div id='name'>
                <label htmlFor="name" className="create-group-label-form">My group shall be called...</label>
                <br />
                <input type="text" className="create-group-form-control create-group-name" name="name" id="name-field"  value={groupDetails.name} onChange={onchangeGroupDetails} onKeyUp={toggleFormContent} placeholder="The Breakfast Club" />
              </div>

              <div id="group-member-section">
                <div className="hr"></div>
                {/* Group Members */}
                <div id='group-members'>
                  <label htmlFor="group-members" className="create-group-label-form group-members-label"> <strong>GROUP MEMBERS</strong> </label>
                  <br />
                  <p>
                    <img src={ avatarBlue }  className="group-user-avatar" />
                    <span className='default-email' >
                      {user.name} (<i>{user.email}</i>)
                    </span> 
                  </p>
                  {/* Group Members list */}
                  {members.map((data, i) => {
                    const { name, email } = data;
                    return(
                    <p className='member-detail' key={i}>
                      <img src={ avatarBlue } className="group-user-avatar-faded" />
                      <span className='members-list' >
                      {/* <input type="text" className="group-members-form-control group-member-name" name="name" id="email-field" value={name} onChange={(e) => {onchangeMembersList(i, e)}} placeholder="Name" /> */}
                      <input type="text" className="group-members-form-control group-member-email" name="email" id="email-field" value={email} onChange={(e) => {onchangeMembersList(i, e)}} placeholder="Email address" />
                      <button className='remove-member' onClick={(e)=> {removeMember(i, e)}}>
                        <i className="fa-sharp fa-solid fa-xmark"></i>
                      </button>
                      </span>  
                    </p>
                    )
                  })}
                <p className='add-group-member'onClick={addMember}>+&nbsp;Add a person</p>
                </div>
                <div className="hr"></div>
                {/* Group Type */}
                <div id=''>
                  <label htmlFor="group-type" className="create-group-label-form  group-type-label"> <strong>GROUP TYPE</strong> </label>
                  <br />
                  <select name="group-type" id="" value={groupDetails.type} className="create-group-form-select"  onChange={onchangeGroupDetails}>
                    <option value="Home">Home</option>
                    <option value="Trip">Trip</option>
                    <option value="Couple">Couple</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
                <button type='submit' className="btn create-group-btn" >Save</button>
            </form>
        </div>
      </div>
    </div>
  )
}
