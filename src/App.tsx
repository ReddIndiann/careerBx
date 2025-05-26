import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import {ForgotPassword, OtpEntry, ResetPassword } from "./Auth";
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import SchoolTest from './pages/SchoolTest';
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';
import ExcelUpload from './pages/ExcelUpload';
import PostsUpload from './pages/PostsUpload';




const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/school-test" element={<SchoolTest />} />
          <Route path="/excel-upload" element={<ExcelUpload />} />
          <Route path="/posts-upload" element={<PostsUpload />} />
         
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
