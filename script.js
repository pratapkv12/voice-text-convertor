document.addEventListener('DOMContentLoaded', (event) => {
    const startButton = document.getElementById('start-button');
    const resultText = document.getElementById('result-text');
    const instructions = document.getElementById('instructions');

    let recognition;
    let recognizing = false;

    // Check if the browser supports the Web Speech API
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = function() {
            recognizing = true;
            instructions.textContent = 'Voice recognition is on. Start speaking...';
            startButton.textContent = 'Stop Speaking';
        };

        recognition.onresult = function(event) {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = 0; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                } else {
                    interimTranscript += transcript;
                }
            }

            resultText.value = finalTranscript + interimTranscript;
        };

        recognition.onerror = function(event) {
            instructions.textContent = 'Error occurred in recognition: ' + event.error;
        };

        recognition.onend = function() {
            recognizing = false;
            instructions.textContent = 'Voice recognition stopped. Click the button to start again.';
            startButton.textContent = 'Start Speaking';
        };

        startButton.addEventListener('click', () => {
            if (recognizing) {
                recognition.stop();
                recognizing = false;
            } else {
                resultText.value = '';
                recognition.start();
            }
        });
    } else {
        instructions.textContent = 'Sorry, your browser does not support speech recognition.';
    }

    // Background Animation Configuration
    const config = {
        colors: [
            { color: "#0b3954", enabled: true },
            { color: "#087e8b", enabled: true },
            { color: "#bfd7ea", enabled: true },
            { color: "#ff5a5f", enabled: true },
            { color: "#c81d25", enabled: true }
        ],
        speed: 6,
        horizontalPressure: 0,
        verticalPressure: 0,
        waveFrequencyX: 2,
        waveFrequencyY: 2,
        waveAmplitude: 5,
        shadows: 5,
        highlights: 8,
        colorBrightness: 1.65,
        colorSaturation: 10,
        wireframe: false,
        colorBlending: 10,
        backgroundColor: "#FF0000",
        backgroundAlpha: 1,
        resolution: 2
    };

    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');
    let width, height;

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function animate() {
        ctx.fillStyle = config.backgroundColor;
        ctx.globalAlpha = config.backgroundAlpha;
        ctx.fillRect(0, 0, width, height);

        ctx.globalAlpha = 1;
        // Animation logic based on the config
        // For simplicity, this is a placeholder for dynamic background animation
        ctx.fillStyle = config.colors[Math.floor(Math.random() * config.colors.length)].color;
        ctx.beginPath();
        ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 100, 0, Math.PI * 2);
        ctx.fill();

        requestAnimationFrame(animate);
    }

    animate();
});
