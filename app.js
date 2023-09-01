// Initialize variables
let recpause = false;
let stopdown = false;
let capture;
const chunks = [];

// Function to start capturing the screen
async function startCapture(displayMediaOptions) {
  let captureStream = null;

  try {
    captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
  return captureStream;
}

//function to start recording the stream
function startRecord(stream) {
  let recorder = null;
  try {
    recorder = new MediaRecorder(stream, { mimeType: "video/webm; codecs=vp9" });
    recorder.start();
  } catch (err) {
    console.error(`Error: ${err}`);
  }
  return recorder;
}

// Function to handle the pause/resume recording button click
function recpauseswitch() {
  if (!recpause) {
    recpause = true;

    document.getElementById("recpause").innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm224-72V328c0 13.3-10.7 24-24 24s-24-10.7-24-24V184c0-13.3 10.7-24 24-24s24 10.7 24 24zm112 0V328c0 13.3-10.7 24-24 24s-24-10.7-24-24V184c0-13.3 10.7-24 24-24s24 10.7 24 24z'/></svg>"
    if (!capture) {
      startCapture({ video: true, audio: false })
        .then(stream => {
          capture = stream;
          capture.getVideoTracks()[0].onended = () => {
            window.alert("Recording was stopped due to screensharing permission being revoked.");
            stopdownswitch()
          }

          recorder = startRecord(capture);
          recorder.ondataavailable = e => chunks.push(e.data); // Attach data available event listener
        })
        .catch(err => {
          console.error(`Error starting capture: ${err}`);
        });

      

      // Reset Download and Stop
      stopdown = false
      document.getElementById("stopdown").innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm192-96H320c17.7 0 32 14.3 32 32V320c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32V192c0-17.7 14.3-32 32-32z'/></svg>"


    } else {
      recorder.resume();
    }
  } else {
    recpause = false;
    document.getElementById("recpause").innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z'/></svg>"
    recorder.pause();
  }
}


// Function to handle the stop/download button click
function stopdownswitch() {

  //if there is no recorded stream exit the function
  if (!recorder) {
    return
  }

  // if the stop button is pressed then stop the recording
  if (!stopdown) {

    recpause = false;
    document.getElementById("recpause").innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z'/></svg>"

    const tracks = capture.getTracks();
    tracks.forEach(track => track.stop());
    recorder.stop();
    capture = null;
    chunks.length = 0;
    document.getElementById("stopdown").innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M256 464a208 208 0 1 1 0-416 208 208 0 1 1 0 416zM256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM376.9 294.6c4.5-4.2 7.1-10.1 7.1-16.3c0-12.3-10-22.3-22.3-22.3H304V160c0-17.7-14.3-32-32-32l-32 0c-17.7 0-32 14.3-32 32v96H150.3C138 256 128 266 128 278.3c0 6.2 2.6 12.1 7.1 16.3l107.1 99.9c3.8 3.5 8.7 5.5 13.8 5.5s10.1-2 13.8-5.5l107.1-99.9z'/></svg>"
    stopdown = true;

  } else {
    

    //Default filename is stream_date
    const now = new Date();
    const formattedDate = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}-${now.getHours()}-${now.getMinutes()}`;
    const defaultFilename = `stream_${formattedDate}`;


    //Download the recorded stream as a mp4 file
    const blob = new Blob(chunks, { type: 'video/mp4' });

    const elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = `${defaultFilename}.mp4`;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);

    // Reset UI
    console.log("stopdown finished")
    stopdown=false
    document.getElementById("stopdown").innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm192-96H320c17.7 0 32 14.3 32 32V320c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32V192c0-17.7 14.3-32 32-32z'/></svg>"
  };
}

// Add event listeners to the buttons
document.getElementById("recpause").addEventListener("click", recpauseswitch)
document.getElementById("stopdown").addEventListener("click", stopdownswitch)






