import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import React, { Component } from 'react';
import Footer from './components/Footer';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsofServicePage';
import Contact from './pages/Contact'

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
          <Route path="/create-room" element={<div className="text-white text-center p-10">Create Room Page</div>} />
          <Route path="/join-room" element={<div className="text-white text-center p-10">Join Room Page</div>} />
          <Route path="/about" element={<div className="text-white text-center p-10">About Page</div>} />
          <Route path="/leaderboard" element={<div className="text-white text-center p-10">Leaderboard Page</div>} />
          <Route path='/contact-us' element={<Contact/>}/>
        </Routes>
        <Footer/>
      </ErrorBoundary>
    </div>
  );
}

export default App;