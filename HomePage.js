import React, { useState } from "react";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import Content from "../components/Content";
import Profile from "../components/Profile";
import { gsap } from "gsap";
import "../style/HomePage.css"

function HomePage() {
    const [showContent, setShowContent] = useState(true);
    const [showProfile, setShowProfile] = useState(false);
  
    const handleNameClick = (name) => {
      // Handle the click event for the name
      console.log(`Clicked on ${name}`);
      // You can perform any other actions here
  
      // Use GSAP to animate fade-out and fade-in
      gsap.to(".Swap", { opacity: 0, duration: 0.5, ease: "power2.inOut" });
      setTimeout(() => {
        setShowContent(false);
        setShowProfile(true);
        gsap.to(".Swap", { opacity: 1, duration: 0.5, ease: "power2.inOut" });
      }, 500); // Delay the showing of Profile to allow fade-out effect
    };
  
    return (
        <div className="App">
          <TopBar />
          <div className="MainContainer">
            <div className="Side">
              <SideBar handleNameClick={handleNameClick} />
            </div>
            <div className="Swap">
              {showContent && <Content />}
              {showProfile && <Profile />}
            </div>
          </div>
        </div>
      );
  }
  
  export default HomePage;
