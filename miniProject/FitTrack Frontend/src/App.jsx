import React, { useState } from 'react';
import Navbar from './components/landing/Navbar';
import Hero from './components/landing/Hero';
import Stats from './components/landing/Stats';
import Features from './components/landing/Features';
import Testimonials from './components/landing/Testimonial';
import Footer from './components/landing/Footer';
import About from './components/landing/About';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import RecipeFinder from './components/RecipeFinder/RecipeFinder';
import './App.css';

const App = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showRecipeFinder, setShowRecipeFinder] = useState(false);
  const [showMealPlanner, setShowMealPlanner] = useState(false);

  // If Recipe Finder is active, show only that
  if (showRecipeFinder) {
    return <RecipeFinder onBack={() => setShowRecipeFinder(false)} />;
  }


  return (
    <>
      {/* Landing Page - Always Visible */}
      <Navbar
        onSignIn={() => setShowSignIn(true)}
        onSignUp={() => setShowSignUp(true)}
      />
      <Hero onGetStarted={() => console.log('Get Started')} />
      <Stats />
      <Features 
        onSmartRecipesClick={() => setShowRecipeFinder(true)}
        // onMealPlanningClick={() => setShowMealPlanner(true)}
      />
      <Testimonials />
      <About />
      <Footer />

      {/* SignIn Modal */}
      {showSignIn && (
        <SignIn
          onSwitchToSignUp={() => {
            setShowSignIn(false);
            setShowSignUp(true);
          }}
          onClose={() => setShowSignIn(false)}
        />
      )}

      {/* SignUp Modal */}
      {showSignUp && (
        <SignUp
          onSwitchToSignIn={() => {
            setShowSignUp(false);
            setShowSignIn(true);
          }}
          onClose={() => setShowSignUp(false)}
        />
      )}
    </>
  );
};

export default App;