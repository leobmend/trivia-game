import React from 'react';
import './style.css';

import triviaLogo from '../../images/trivia.png';
import loadingGif from '../../images/loading.gif';

const Loading = () => (
  <main className="Loading">
    <div className="loading-pg-container">
      <div className="loading-pg-box">
        <img
          className="logo-img"
          src={ triviaLogo }
          alt="Loading gif"
        />
        <img
          className="loading-pg-gif"
          src={ loadingGif }
          alt="Loading gif"
        />
      </div>
    </div>
  </main>
);

export default Loading;
