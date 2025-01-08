import React,{useEffect, useState} from "react";


function App() {
  const [isFocusModeOn,setIsFocusModeOn] = useState(false);
 
  const handleFocusMode = async()=>{
    try {
      const newState = !isFocusModeOn // will storing true;
      await chrome.storage.sync.set({focusmode:newState})
      // If turning off focus mode, find and reload Instagram tabs
      if (!newState) {
        const tabs = await chrome.tabs.query({ url: 'https://www.instagram.com/*' });
        tabs.forEach(tab => {
          chrome.tabs.reload(tab.id);
        });
      }
      setIsFocusModeOn(newState)
    } catch (error) {
      console.error("Error occurred while setting the focus mode: ",error.message)
    }
  }

  useEffect(()=>{
    chrome.storage.sync.get("focusmode",(result)=>{
      setIsFocusModeOn(result.focusmode || false)
      console.log("Inside the chrome getting: ",result);
      })
  },[])
  return (
    <div className="w-72 h-96 bg-gray-100 p-4 flex flex-col items-center justify-between shadow-lg rounded-lg">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-xl font-bold text-gray-800 mb-2">Focus Mode Activated</h1>
        <p className="text-sm text-gray-600">
          Stay on track! Instagram Reels are blocked to help you focus on messaging.
        </p>
      </div>

      {/* Status Indicator */}
      <div className="flex items-center justify-center bg-blue-100 space-x-2  flex-row text-blue-600 py-2 px-4 rounded-full my-4">
        <span className="text-sm font-medium cursor-pointer" onClick={handleFocusMode}>Focus Mode </span>
        <div className={`w-5 h-5 shadow-xl rounded-full  ${!isFocusModeOn? "bg-red-600": "bg-green-500"}`}></div>
      </div>

      {/* Motivational Message */}
      <div className="text-center">
        <p className="text-gray-700 italic">"Distractions don't build dreams."</p>
      </div>

      {/* Footer */}
      <div className="text-sm text-gray-500">
        Powered by <span className="font-semibold text-gray-700">Insta Reel Blocker</span>
      </div>
    </div>
  );
}

export default App;
