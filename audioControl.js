document.addEventListener("DOMContentLoaded", function() { var audio = 
    document.getElementById("audio"); var button = document.getElementById("audioControl");
    // Reproducir audio al cargar la página
    audio.play(); button.addEventListener("click", function() { if (audio.paused) { 
            audio.play(); button.textContent = "Pausar Música";
        } else {
            audio.pause(); button.textContent = "Reproducir Música";
        }
    });
});
