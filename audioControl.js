document.addEventListener("DOMContentLoaded", function() { var audio = 
    document.getElementById("audio"); var button = document.getElementById("audioControl"); var 
    icon = button.querySelector("i");
    // Reproducir audio al cargar la página
    audio.play(); button.addEventListener("click", function() { if (audio.paused) { 
            audio.play(); icon.classList.remove("fa-play"); icon.classList.add("fa-pause");
        } else {
            audio.pause(); icon.classList.remove("fa-pause"); icon.classList.add("fa-play");
        }
    });
});
