document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playButton = document.getElementById('playButton');
    const pauseButton = document.getElementById('pauseButton');
    const stopButton = document.getElementById('stopButton');

    // Reproducir audio al cargar la página
    audio.play();

    playButton.addEventListener('click', () => {
        audio.play();
        playButton.style.display = 'none';
        pauseButton.style.display = 'inline-block';
    });

    pauseButton.addEventListener('click', () => {
        audio.pause();
        pauseButton.style.display = 'none';
        playButton.style.display = 'inline-block';
    });

    stopButton.addEventListener('click', () => {
        audio.pause();
        audio.currentTime = 0;
        pauseButton.style.display = 'none';
        playButton.style.display = 'inline-block';
    });
});
