var recpause = false
var stopdown = false


recpauseswitch = () => {  
  if (recpause == false) {
    recpause = true
    document.getElementById("recpause").innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm224-72V328c0 13.3-10.7 24-24 24s-24-10.7-24-24V184c0-13.3 10.7-24 24-24s24 10.7 24 24zm112 0V328c0 13.3-10.7 24-24 24s-24-10.7-24-24V184c0-13.3 10.7-24 24-24s24 10.7 24 24z'/></svg>" 
    capture = startCapture({video: true, audio: false})
  }
  else {  
    recpause = false
    document.getElementById("recpause").innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z'/></svg>"
  }
}

stopdownswitch = () => {
  if (stopdown == false) {
    stopdown = true
    document.getElementById("stopdown").innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M256 464a208 208 0 1 1 0-416 208 208 0 1 1 0 416zM256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM376.9 294.6c4.5-4.2 7.1-10.1 7.1-16.3c0-12.3-10-22.3-22.3-22.3H304V160c0-17.7-14.3-32-32-32l-32 0c-17.7 0-32 14.3-32 32v96H150.3C138 256 128 266 128 278.3c0 6.2 2.6 12.1 7.1 16.3l107.1 99.9c3.8 3.5 8.7 5.5 13.8 5.5s10.1-2 13.8-5.5l107.1-99.9z'/></svg>"
  }
  else {
    stopdown = false 
    document.getElementById("stopdown").innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm192-96H320c17.7 0 32 14.3 32 32V320c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32V192c0-17.7 14.3-32 32-32z'/></svg>"
  }
}


document.getElementById("recpause").addEventListener("click", recpauseswitch)
document.getElementById("stopdown").addEventListener("click", stopdownswitch)



async function startCapture(displayMediaOptions) {
    let captureStream = null;
  
    try {
      captureStream = await navigator.mediaDevices.getDisplayMedia(
        displayMediaOptions,
      );
    } catch (err) {
      console.error(`Error: ${err}`);
    }
    return captureStream;
  }
  

  