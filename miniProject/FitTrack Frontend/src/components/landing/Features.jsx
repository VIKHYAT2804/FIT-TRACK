import React from 'react';
import FeatureCard from './FeatureCard.jsx';

const Features = ({ onSmartRecipesClick }) => {
  const features = [
    {
      icon: '🍳',
      title: 'Smart Recipes',
      desc: 'Personalized recipe ideas that match your calories and diet type.'
    }
  ];

  const handleFeatureClick = (title) => {
    if (title === 'Smart Recipes') {
      onSmartRecipesClick();
    } else {
      console.log(`${title} clicked - feature coming soon!`);
    }
  };

  return (
    <section className="features" id="features">
      <h2>Everything You Need</h2>
      <p>Tools built to help you achieve your goals</p>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} onClick={() => handleFeatureClick(feature.title)}>
            <FeatureCard 
              icon={feature.icon}
              title={feature.title}
              description={feature.desc}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
