import { useState } from 'react';
import DataProvider from './context/DataProvider';
//To enable routing in the application
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

//importing all the components
import Login from './components/accounts/login';
import Home from './components/home/Home';
import Header from './components/header/Header';
import CreatePost from './components/create/CreatePost';


//Creating a private route
const PrivateRoute = ({ isAuthenticated, ...props }) => {

  return isAuthenticated ?
    <>
      <Header />
      <Outlet />
    </>
    : <Navigate replace to='/login' />
}

function App() {

  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (

    <DataProvider>
      <BrowserRouter>
        <div style={{ marginTop: 64 }}>
          <Routes>
            <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated} />} />

            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/' element={<Home />} />
            </Route>

            <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/create' element={<CreatePost />} />
            </Route>

          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>

  );
}

export default App;
