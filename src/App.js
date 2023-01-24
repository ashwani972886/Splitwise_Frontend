import './App.css';
//  Components CSS
import './Views/Utils/css';

// Components Before Login
import { Header, Home, Signup, Login, ResetPass, Footer } from './Views/Before_Login/';

// Components After Login
// import { Setup, Dashboard, MainDashboard, RecentActivity,AllExpenses, CreateGroup, Group, AddExpense, PaidByPeople, SplitOptions, ExpenseNotes, SettleExpense } from './Views/After_login/';
import {  Dashboard, MainDashboard, RecentActivity,AllExpenses, CreateGroup, Group, Friend, Modals } from './Views/After_login/';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useContext } from 'react';
import UserContext from './context/user/UserContext';

function App() {
  let location = useLocation();
  let navigate = useNavigate();
  // let isAuthenticated = false;
  const {isAuthenticated, setIsAuthenticated} = useContext(UserContext);

  useEffect(() => {
    if(localStorage.getItem('auth') && (location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/password_reset")) {
      setIsAuthenticated(true);
      navigate('/dashboard');
    }
  }, []);
  

  return (
    <>
      {location.pathname !== '/signup'  ? <Header /> : ""}
      <Routes>
        <Route exact path='/' element={ !isAuthenticated ? <Home /> : <Dashboard /> } />
        <Route path='signup' element={ !isAuthenticated ? <Signup /> : <Dashboard />} />
        <Route path='login' element={ !isAuthenticated ? <Login /> : <Dashboard />} />
        <Route path='password_reset' element={ !isAuthenticated ? <ResetPass /> : <Dashboard />} />
        <Route path='dashboard' element={ <> <Dashboard /> <Modals /> </>} >
          <Route index element={ <MainDashboard /> } />
          <Route path='activity' element={ <RecentActivity /> } />
          <Route path='all' element={ <AllExpenses /> } />
          <Route path='groups/:groupId' element={ <Group /> } />
          <Route path='friends/:friendId' element={ <Friend /> } />
        </Route>
        <Route path='groups/new' element={ <CreateGroup /> } />
        <Route path='password_reset/:token' element={<Login />} />
      </Routes>
      {location.pathname !== '/signup' ? <Footer /> : ""}
        
    {/* <Header2 /> */}
    {/* <Setup /> */}
    {/* <Dashboard />  */}
    </>
  );
}

export default App;
