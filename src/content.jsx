import React from "react";
import ReactDOM from "react-dom";


const FocusOverlay = () => {
    const [imageSrc, setImageSrc] = React.useState('');

    React.useEffect(() => {
      // Get the URL for the image from the extension
      const imageUrl = chrome.runtime.getURL('./assets/work.png');
      setImageSrc(imageUrl);
    }, []);
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        color: "white",
        display: "flex",
        fontSize:"35px",
        fontWeight:"bold",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
        zIndex: 10000,
      }}
    >
        <div>
            <img src="https://i.ibb.co/1MxVnXt/Flexible-work-arrangements-removebg-preview.png" alt="work" srcset=""  
            style={{
            maxWidth: "300px",  // Adjust size as needed
            marginBottom: "20px"
          }} />
        </div>
      <p style={{ 
        borderWidth:"2px",
        borderStyle:"dotted",
        padding:"17px",
        borderColor:"gray",
        borderRadius:"10px",
       }}>
        Stay focused and avoid distractions. Get back to your work!</p>
    </div>
  );
};

// Function to check and handle URL changes
const handleUrlChange = () => {
  chrome.storage.sync.get("focusmode", (data) => {
    if (data.focusmode && window.location.pathname.includes("/reels")) {
      const existingOverlay = document.getElementById("focus-overlay-root");
      if (!existingOverlay) {
        const root = document.createElement("div");
        root.id = "focus-overlay-root";
        document.body.appendChild(root);
        ReactDOM.render(<FocusOverlay />, root);
      }
    }
  });
};

// Listen for URL changes using the History API
const observer = new MutationObserver(() => {
  handleUrlChange();
  console.log("something changed")
});

// Start observing changes to the URL
observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// Check URL on initial load
handleUrlChange();