const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";

function startListening() {
  recognition.start();
}

recognition.onresult = async function(event) {
  const text = event.results[0][0].transcript;
  document.getElementById("userText").innerText = "You: " + text;

  const res = await fetch("http://127.0.0.1:8000/ask", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({text})
  });

  const data = await res.json();
  document.getElementById("aiText").innerText = "AI: " + data.response;

  const speech = new SpeechSynthesisUtterance(data.response);
  speechSynthesis.speak(speech);
};