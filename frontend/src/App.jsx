import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CreateRoom } from "./pages/CreateRoom.jsx";
import Home from './components/Home';
import Navbar from './components/Navbar';
import React, { Component } from 'react';
import Opensource from './components/Opensource';
import Footer from './components/Footer';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsofServicePage';
import Contact from './pages/Contact'
import BackToTopButton from "./components/BackToTopButton";
import Leaderboard from './pages/Leaderboard';
import FAQ from './components/FAQ';
import Tournaments from './components/Tournaments';
import Events from './components/Event';
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="text-white text-center p-10">Something went wrong. Please refresh the page.</div>;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <ErrorBoundary>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<PrivacyPolicyPage/>} />
          <Route path="/terms" element={<TermsOfServicePage/>} />
          <Route path="/create-room" element={<div className="text-white text-center p-10"><CreateRoom /></div>} />
          <Route path="/join-room" element={<div className="text-white text-center p-10">Join Room Page</div>} />
          <Route path="/about" element={<div className="text-white text-center p-10">About Page</div>} />
          <Route path="/opensource" element={<Opensource />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path='/contact-us' element={<Contact/>}/>
          <Route path='/tournaments' element={<Tournaments/>}/>
          <Route path="/events" element={<Events />} />
        </Routes>
        <Footer/>
        <BackToTopButton />
      </ErrorBoundary>
    </div>
  );
}

export default App;
