import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import LogOut from './Logout';
import Bookings from './Bookings';
import MovieDetail from './MovieDetail';
import Profile from './Profile';
import Searched from './Searched';
import BookingHistory from './BookingHistory';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/booking" element={<Bookings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/searched" element={<Searched />} />
        <Route path="/movie-detail" element={<MovieDetail />} />
        <Route path="/bookingHistory" element={<BookingHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
