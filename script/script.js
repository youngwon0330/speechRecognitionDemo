    const SpeecRecognition = window.SpeecRecognition || window.webkitSpeechRecognition;
    let Recognition;

    if(!SpeecRecognition){
      alert('this browser did not support web speech API')
    } else {
      recognition = new SpeecRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = true;
      recognition.continuous = false;
      recognition.onstart = () =>{
        console.log('speech recognition has been started')
      };
      recognition.onresult = (event) => {
        // 음성 인식 결과가 들어오면 여기서 처리
        
        const transcript = event.results[event.resultIndex][0].transcript;
        const textarea = document.getElementById('floatingTextarea2');
        textarea.value = transcript;
        console.log('인식 결과:', transcript);
      };
      
      recognition.onerror = (event) => {
        console.error('에러 발생:', event.error);
      };
      
      recognition.onend = () => {
        console.log('음성 인식이 종료되었습니다.');
        document.getElementById('startBtn').disabled = false;
        document.getElementById('stopBtn').disabled = true;
      };
    }

    // 버튼 제어
    document.getElementById('startBtn').addEventListener('click', () => {
      if (recognition) {
        recognition.start();
        document.getElementById('startBtn').disabled = true;
        document.getElementById('stopBtn').disabled = false;
      }
    });

    document.getElementById('stopBtn').addEventListener('click', () => {
      if (recognition) {
        recognition.stop();
      }
    });

document.getElementById('copyBtn').addEventListener('click', function() {
  const textarea = document.getElementById('floatingTextarea2');
  
  // Select the text in the textarea
  textarea.select();
  textarea.setSelectionRange(0, 99999); // For mobile devices

  // Attempt to copy the text
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      // Optional: Show a success message using Bootstrap's Toast or Alert
      showCopySuccess();
    } else {
      // Optional: Show an error message
      showCopyError();
    }
  } catch (err) {
    // Optional: Show an error message
    showCopyError();
  }

  // Deselect the text
  window.getSelection().removeAllRanges();
});

// Optional: Functions to display feedback to the user
function showCopySuccess() {
  // Create a Bootstrap toast or alert
  const alertPlaceholder = document.createElement('div');
  alertPlaceholder.innerHTML = `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
      Text copied to clipboard!
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
  document.body.appendChild(alertPlaceholder);

  // Remove the alert after 3 seconds
  setTimeout(() => {
    alertPlaceholder.remove();
  }, 3000);
}

function showCopyError() {
  const alertPlaceholder = document.createElement('div');
  alertPlaceholder.innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      Failed to copy text. Please try again.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
  document.body.appendChild(alertPlaceholder);

  // Remove the alert after 3 seconds
  setTimeout(() => {
    alertPlaceholder.remove();
  }, 3000);
}

