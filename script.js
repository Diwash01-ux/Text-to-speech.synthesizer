const textInput = document.getElementById("text");
const voiceSelect = document.getElementById("voice");
const speakBtn = document.getElementById("speakBtn");
const stopBtn = document.getElementById("stopBtn");
const status = document.getElementById("status");

let voices = [];

function loadVoices() {
    voices = window.speechSynthesis.getVoices();

    voiceSelect.innerHTML = "";

    if (voices.length === 0) {
        voiceSelect.innerHTML =
            '<option value="">Default voice</option>';
        return;
    }

    voices.forEach((voice, index) => {
        const option = document.createElement("option");

        option.value = index;
        option.textContent =
            `${voice.name} (${voice.lang})`;

        voiceSelect.appendChild(option);
    });
}

loadVoices();

if ("onvoiceschanged" in speechSynthesis) {
    speechSynthesis.onvoiceschanged = loadVoices;
}

speakBtn.addEventListener("click", function () {
    const text = textInput.value.trim();

    if (text === "") {
        status.textContent = "Please enter some text first!";
        return;
    }

    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    const selectedVoice = voices[voiceSelect.value];

    if (selectedVoice) {
        speech.voice = selectedVoice;
    }

    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;

    speech.onstart = function () {
        status.textContent = "🔊 Speaking...";
    };

    speech.onend = function () {
        status.textContent = "✅ Finished speaking!";
    };

    speech.onerror = function () {
        status.textContent = "Unable to speak. Try another voice.";
    };

    speechSynthesis.speak(speech);
});

stopBtn.addEventListener("click", function () {
    speechSynthesis.cancel();
    status.textContent = "Speech stopped.";
});
