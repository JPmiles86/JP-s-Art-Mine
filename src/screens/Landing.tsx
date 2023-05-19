import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing: React.FC = () => {
  useEffect(() => {
    const hoverImages = [
      `${process.env.PUBLIC_URL}/assets/images/TST-Dip.jpg`,
      `${process.env.PUBLIC_URL}/assets/images/TLS-Dip.jpg`,
      `${process.env.PUBLIC_URL}/assets/images/CST-Dip.jpg`,
      `${process.env.PUBLIC_URL}/assets/images/MFI-Dip.jpg`,
    ];

    const originalImages = [
      `${process.env.PUBLIC_URL}/assets/images/TST.jpg`,
      `${process.env.PUBLIC_URL}/assets/images/TLS.jpg`,
      `${process.env.PUBLIC_URL}/assets/images/CST.jpg`,
      `${process.env.PUBLIC_URL}/assets/images/MFI.jpg`,
    ];

    const seriesImages = document.querySelectorAll('.series img');

    seriesImages.forEach((img, index) => {
      img.addEventListener('mouseenter', () => {
        (img as HTMLImageElement).src = hoverImages[index];
      });

      img.addEventListener('mouseleave', () => {
        (img as HTMLImageElement).src = originalImages[index];
      });
    });
  }, []);

  return (
    <div className="landing">
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
        <Link to="/TST" className="series">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/TST.jpg`}
            alt="Transforming Space Time"
          />
          <p>Transforming Space Time</p>
        </Link>
        <Link to="/TLS" className="series">
          <img src={`${process.env.PUBLIC_URL}/assets/images/TLS.jpg`} alt="Time Lines" />
          <p>Time Lines</p>
        </Link>
        <Link to="/CST" className="series">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/CST.jpg`}
            alt="Chromatic Shades of Time"
          />
          <p>Chromatic Shades of Time</p>
        </Link>
        <Link to="/MFI" className="series">
          <img src={`${process.env.PUBLIC_URL}/assets/images/MFI.jpg`} alt="My Flippin’ iPhone" />
          <p>My Flippin’ iPhone</p>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
