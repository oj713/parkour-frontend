import { HashRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import postsReducer from './reducers/posts-reducer';
import authReducer from './reducers/auth-reducer';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Navigation from './navigation';
import Home from './home/Home';
import ProfileRouter from './profile/profile-router';
import Details from './details';
import Results from './Results';
import Login from './auth/Login';
import Register from './auth/Register';
import Search from './searchResults';
import AuthContext from './auth/AuthContext';
const store = configureStore({
  reducer: { posts: postsReducer, auth: authReducer }
});

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <AuthContext>
          <div className="row">
            <div className="col-2">
              <Navigation />
            </div>
            <div className="container col-9">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile/*" element={<ProfileRouter />} />
                <Route path="/details" element={<Details />} />
                <Route path="/results" element={<Results />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/search" element={<Search />} />
              </Routes>
            </div>
          </div>
        </AuthContext>
      </HashRouter>
    </Provider>
  );
}

export default App;
