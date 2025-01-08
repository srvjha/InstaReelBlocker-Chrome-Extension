chrome.storage.onChanged.addListener((changes,namespace)=>{
    console.log("in backgorund js",changes,namespace)
   
    if(changes.focusmode){
        chrome.tabs.query({url:'https://www.instagram.com/*'},(tabs)=>{
            tabs.forEach((tab)=>{
                if(changes.focusmode.newValue){
                    chrome.scripting.executeScript({
                        target:{tabId:tab.id},
                        files:["../src/content.jsx"]
                    })
                }else {
                    chrome.tabs.reload(tab.id); // Reload page to undo restriction
                  }
            })
        })
    }
})