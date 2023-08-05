import { HashRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import postsReducer from './reducers/posts-reducer';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Home from './Home';
import Profile from './Profile';
import Details from './Details';
import Results from './Results';
import Login from './Login';
const store = configureStore({
  reducer: { posts: postsReducer }
});

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/details" element={<Details />} />
          <Route path="/results" element={<Results />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </HashRouter>
    </Provider>
  );
}

export default App;
