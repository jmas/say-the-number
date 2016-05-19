var isActive = false;

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  sendResponse({ isActive: isActive });
});

function handleBrowserActionClick () {
  isActive = ! isActive;
  chrome.browserAction.setIcon({
    path: isActive ? 'icon-active.png': 'icon.png'
  });
  chrome.tabs.executeScript({
    code: 'window.__numberToTextChromeExtensionSskBackgroundScriptAboutState && window.__numberToTextChromeExtensionSskBackgroundScriptAboutState();'
  });
}

chrome.browserAction.onClicked.addListener(handleBrowserActionClick);
