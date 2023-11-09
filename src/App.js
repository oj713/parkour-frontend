import { HashRouter, Navigate } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import postsReducer from './reducers/posts-reducer';
import authReducer from './reducers/auth-reducer';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Navigation from './nav/navigation';
import Home from './home';
import ProfileRouter from './profile/profile-router';
import Details from './details';
import Login from './auth/Login';
import Register from './auth/Register';
import Search from './searchResults';
import AuthContext from './auth/AuthContext';
import NavigationHorizontal from './nav/NavigationHorizontal';
import RightSide from './home-right-side';
import UserResults from './searchResults/userSearch.js';
const store = configureStore({
  reducer: { posts: postsReducer, auth: authReducer }
});

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <AuthContext>
          <div className="container-fluid m-0 p-0">
            <div className="d-lg-none row m-0 p-0">
              <NavigationHorizontal />
            </div>
            <div className="row m-2">
              <Navigation/>
              <div className = "d-none d-sm-block col-1 col-lg-2"></div>
              <div className="col">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Navigate to="/" />} />
                  <Route path="/profile/*" element={<ProfileRouter />} />
                  <Route path="/details" element={<Details />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/search" element={<Search />} />
                </Routes>
              </div>
            </div>
          </div>
        </AuthContext>
      </HashRouter>
    </Provider>
  );
}

export default App;
