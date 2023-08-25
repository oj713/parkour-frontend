import { HashRouter } from 'react-router-dom';
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
const store = configureStore({
  reducer: { posts: postsReducer, auth: authReducer }
});

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <AuthContext>
          <div className="container-fluid">
            <div className="row">
            <div className="d-md-none">
                <NavigationHorizontal />
                </div>
            </div>
            <div className="row">
              <div className="d-none d-md-block col-2">
                <Navigation />
              </div>
              <div className="col-md-10 col-12 ms-5 ms-md-0">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
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
