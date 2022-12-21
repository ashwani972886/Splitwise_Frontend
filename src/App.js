import './App.css';
//  Components CSS
import './Views/Utils/css';

// Components Before Login
import { Header, Home, Signup, Login, ResetPass, Footer } from './Views/Before_Login/';

// Components After Login
import { Setup, Dashboard, MainDashboard, RecentActivity,AllExpenses, CreateGroup, Group } from './Views/After_login/';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

function App() {
  let location = useLocation();
  let navigate = useNavigate();
  let authenticated = false;
  if(localStorage.getItem('auth')) {
    authenticated = true;
    // navigate('dashboard');
  }

  return (
    <>
      {location.pathname !== '/signup'  ? <Header /> : ""}
      <Routes>
        <Route exact path='/' element={ !authenticated ? <Home /> : <Dashboard /> } />
        <Route path='signup' element={ !authenticated ? <Signup /> : <Dashboard />} />
        <Route path='login' element={ !authenticated ? <Login /> : <Dashboard />} />
        <Route path='password_reset' element={ !authenticated ? <ResetPass /> : <Dashboard />} />
        <Route path='dashboard' element={ <Dashboard /> } >
          <Route index element={ <MainDashboard /> } />
          <Route path='activity' element={ <RecentActivity /> } />
          <Route path='all' element={ <AllExpenses /> } />
          <Route path='groups/:groupId' element={ <Group /> } />
          <Route path='friends/:friendId' element={ <AllExpenses /> } />
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
