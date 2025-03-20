
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import {ForgotPassword, OtpEntry, ResetPassword } from "./Auth";
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';



const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search-results" element={<SearchResults />} />
      {/* >
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp-entry" element={<OtpEntry />} />
          <Route path="/reset-password" element={<ResetPassword />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
