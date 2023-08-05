import { HashRouter } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router';
import Home from './Home';
import Profile from './Profile';
import Details from './Details';
import Results from './Results';
import Login from './Login';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/details" element={<Details />} />
        <Route path="/results" element={<Results />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
