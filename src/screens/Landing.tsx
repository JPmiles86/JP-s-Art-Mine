// my-gallery/src/screens/Landing.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';
import useStore from '../utils/store';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  //const { setCurrentFilter } = useStore();

  const handleSeriesClick = (seriesCode: string) => {
    //setCurrentFilter(seriesCode);
    navigate(`/${seriesCode}`);
  };

  return (
    <div className="landing" style={{ marginTop: '60px' }}>
      <h1 className="header">THE ART MINE</h1>
      <p className="subtext">
        Welcome to <b>"THE ART MINE".</b> <br></br>
        A place to explore, discover and experience the art of JP Miles.<br></br><br></br><br></br>
        As an independent artist without gallery representation, I believe in giving back. <br></br>
        That's why I'm <b>Creating for a Cause</b>, taking the 50% of profits typically earned 
        by galleries and donating it to <a href="http://charitywater.org"><b>Charity: Water</b></a>, an organization that provides access to clean 
        drinking water for people in need. By supporting my art, you're not just adding 
        beauty to your life, but also contributing to a life-changing cause.  
      </p>
      <div className="landing-series-grid">
        <div onClick={() => handleSeriesClick('FJI')} className="series">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/TST-dip.jpg`}
            alt="Fuji Tests"
          />
          <p>Fuji Tests</p>
        </div>
        <div onClick={() => handleSeriesClick('ATT')} className="series">
          <img src={`${process.env.PUBLIC_URL}/assets/images/TLS-dip.jpg`} alt="As Time Turns" />
          <p>As Time Turns</p>
        </div>
        <div onClick={() => handleSeriesClick('CST')} className="series">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/CST-dip.jpg`}
            alt="Chromatic Shades of Time"
          />
          <p>Chromatic Shades of Time</p>
        </div>
        <div onClick={() => handleSeriesClick('TRD')} className="series">
          <img src={`${process.env.PUBLIC_URL}/assets/images/MFI-dip.jpg`} alt="Traditional" />
          <p>Traditional</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
