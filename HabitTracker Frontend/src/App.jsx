import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { CssBaseline } from '@mui/material';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import HabitTracker from './components/HabitTracker';

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/" element={<HabitTracker />} />
          {/* </Route> */}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;