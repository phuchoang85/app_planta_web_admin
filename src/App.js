import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {
  BrowserRouter as Router, Routes, Route,
  Navigate,
  Outlet
} from 'react-router-dom';

import Login from './screen/Login/Login';
import VerifiEmail from './screen/VerifiEmail';
import { useState } from 'react';
import Navigation from './screen/Navigation';

function App() {
  // đọc thông tin user từ localStorage
  const getUserInfoFromLocalStorage = () => {
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      return JSON.parse(userInfo);
    }
    return null;
  }
  // lưu thông tin user vào localStorage
  const saveUserInfoToLocalStorage = (userInfo) => {
    if (!userInfo) {
      localStorage.removeItem('user');
      setUser(null);
    } else {
      localStorage.setItem('user', JSON.stringify(userInfo));
      setUser(userInfo);
    }
  }
  // state user
  const [user, setUser] = useState(getUserInfoFromLocalStorage());

  // các route không cần login
  const PublicRoute = () => {
    if (user) { // nếu đã login thì cho vào trang chủ
      return <Navigate to="/" />
    }
    return <Outlet />// cho đi tiếp
  }

  // các route cần login
  const PrivateRoute = () => {
    if (!user) { // nếu chưa login thì cho vào trang login
      return <Navigate to="/login" />
    }
    return <Outlet />
  }

  return (
    <div>
      <Router>
        <Routes>
          
        <Route path='/verifiEmail' element={<VerifiEmail />} />
          <Route element={<PublicRoute />}>
            <Route path='/login' element={<Login />} />
            <Route path='/verifiEmail' element={<VerifiEmail />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path='/' element={<Navigation />} />
          </Route>

        </Routes>

      </Router>
    </div>
  );
}

export default App;
