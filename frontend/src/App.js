import {useEffect,useState} from 'react';
import {
  Routes,
  Route,
  useNavigate,
  useLocation
} from "react-router-dom";
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import NoteState from './context/NoteState';
import DisplayNotes from './components/DisplayNotes';
import AddNote from './components/AddNote';
import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';
import Footer from './components/Footer';

function App() {

  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    const lastPathSegment = pathname.substring(pathname.lastIndexOf('/') + 1);
    document.title = lastPathSegment ? lastPathSegment : 'Home';
  }, [location]);

  

                                              // darkmode start
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    // icon
    const sunIcon   =  document.querySelector(".sun-icon");
    const moonIcon  =  document.querySelector(".moon-icon");
  
    //  cheak theme
    const cheakTheme  = ()  =>{
      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        moonIcon.classList.add("display-none");
        setIsDarkMode(!isDarkMode);

      } else {
        document.documentElement.classList.remove('dark');
        sunIcon.classList.add('display-none');
      }
    }
    cheakTheme();
  
  
  }, []);
    // iconToggle
    const iconToggle  = ()  =>{
      document.querySelector(".sun-icon").classList.toggle("display-none");
      document.querySelector(".moon-icon").classList.toggle('display-none');
      setIsDarkMode(!isDarkMode);
    }
    // toggleTheme
    const toggleTheme = ()  =>{
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
        iconToggle();
      }else{
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
        iconToggle();
      }

    }
                                              // darkmode end



                                              // alert
                      
  const [alert, setAlert] = useState(null)
  const showAlert=(type,msg)=>{
    setAlert({
      msg:msg,
      type:type
    });
    setTimeout(()=>{setAlert(null)},5000);
  }


                                        // authinticate
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      localStorage.removeItem('authToken');
      navigate('/login');
    }
  }, [])
  return (
    <>
    <NoteState>
      <NavBar toggleTheme={toggleTheme} alert={alert} darkMode={isDarkMode}/>
      <Routes>
        <Route key="home" exact path='/' element={<Home/>}/>
        {/* <Route key="logout" path='/logout' element={<Logout showAlert={showAlert}/>}/>
          <Route key="notes" path='/notes' element={<DisplayNotes/>}/>
          <Route key="addNote" path='/addNote' element={<AddNote showAlert={showAlert}/>}/> */}
          {/* <Route key="login" path='/login' element={<Login showAlert={showAlert}/>}/>
          <Route key="signup" path='/signup' element={<Signup showAlert={showAlert}/>}/> */}
        {localStorage.getItem('authToken')?(
          <>
          <Route key="logout" path='/logout' element={<Logout showAlert={showAlert}/>}/>
          <Route key="notes" path='/notes' element={<DisplayNotes/>}/>
          <Route key="addNote" path='/addNote' element={<AddNote showAlert={showAlert}/>}/>
          </>
        ):(
          <>
        <Route key="login" path='/login' element={<Login showAlert={showAlert} darkMode={isDarkMode}/>}/>
        <Route key="signup" path='/signup' element={<Signup showAlert={showAlert}/>}/>
          </>
        )}
      </Routes>
      <Footer></Footer>
    </NoteState>
    </>
  );
}

export default App;
