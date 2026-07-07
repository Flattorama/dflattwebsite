import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import ScrollManager from './components/ScrollManager';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Speaking from './pages/Speaking';
import Community from './pages/Community';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/about" element={<About />} />
        <Route path="/speaking" element={<Speaking />} />
        <Route path="/community" element={<Community />} />
        {/* Services page retired; its case-study content lives in the cards and About */}
        <Route path="/services" element={<Navigate to="/about" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
