import appContext from './Context/AppContext'
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Main } from './Components/Main';
import { Login } from './Components/Login';
import { useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Grid } from '@mui/material';
import red from '@mui/material/colors/deepPurple';
import grey from '@mui/material/colors/grey';
import { Register } from './Components/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Profile } from './Components/Profile';


// yellow: amber

const defaultTheme = createTheme({
  palette: {
    primary: red,
    secondary: grey
  },
});

function App() {
  const AppContext = useContext(appContext);
  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer position="top-right" autoClose={5000} />
      <CssBaseline />
      {AppContext?.auth ? <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Main />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/*' element={<Navigate to="/home" replace />} />
      </Routes>
        :
        <Grid container component="main" sx={{ background: "#f7f7f8", height: "100vh" }}>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/sign-up' element={<Register />} />
            <Route path='/*' element={<Navigate to="/" replace />} />
          </Routes>
        </Grid>
      }
    </ThemeProvider>
  );
}

export default App;
