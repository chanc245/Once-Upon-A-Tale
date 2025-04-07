const recordButton = document.getElementById('recordButton');
const toggleButton = document.getElementById('toggleButton');
const recordingIndicator = document.getElementById('recordingIndicator');

let isRecordingToggle = false; 
let isSpacePressed = false; 

const isRecording = () => {
  recordingIndicator.textContent = 'Recording...'; 
  recordingIndicator.style.color = 'red'; 
};

const notRecording = () => {
  recordingIndicator.textContent = 'Not Recording';
  recordingIndicator.style.color = 'black'; 
};

recordButton.addEventListener('mousedown', () => {
    fetch('/start-recording', { method: 'POST' });
    isRecording(); 
});

recordButton.addEventListener('mouseup', () => {
    fetch('/stop-recording', { method: 'POST' });
    notRecording(); 
});

toggleButton.addEventListener('click', () => {
    if (!isRecordingToggle) {
        fetch('/start-recording', { method: 'POST' });
        isRecording();
        toggleButton.textContent = 'Stop Recording'; 
    } else {
        fetch('/stop-recording', { method: 'POST' });
        notRecording();
        toggleButton.textContent = 'Start Recording';
    }
    isRecordingToggle = !isRecordingToggle; 
});

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && !isSpacePressed) {
      isSpacePressed = true; 
      fetch('/start-recording', { method: 'POST' });
      isRecording();
  }
});

window.addEventListener('keyup', (e) => {
  if (e.code === 'Space' && isSpacePressed) { 
      isSpacePressed = false; 
      fetch('/stop-recording', { method: 'POST' });
      notRecording();
  }
});
