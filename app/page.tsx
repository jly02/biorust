// app/page.tsx
import Image from 'next/image';
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div>
      <h2>Welcome!</h2>
      <p>Select a tool from the sidebar to get started.</p>

      <div style={{ marginTop: '2rem' }}>
        <Image
          src="/dna-helix.png" // make sure this exists in public/
          alt="DNA Helix"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
};

export default HomePage;
