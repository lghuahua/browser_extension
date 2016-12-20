chrome.app.runtime.onLaunched.addListener(function () {
    nWindows = chrome.app.window.getAll().length;
    var width = 400;
    var height = 600;
    if (nWindows === 0) {
      chrome.app.window.create('./popup.html', {
          "id": "main",
          "bounds": {
              width: width,
              height: height
          },
          "outerBounds": {
              width: width,
              height: height
          }
      })
    }

})