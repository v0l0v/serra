const paradas = [
    { 
        name: "El Valle de Seta", 
        latitude: 39.4032738, 
        longitude: -0.3991262, 
        url: "parada1.html", 
        imageUrl: "parada1/parada1.png",
        rating: 1
    },
    { 
        name: "Castell de Cabres", 
        latitude: 39.3994776, 
        longitude: -0.3913431, 
        url: "parada2.html", 
        imageUrl: "parada2/parada2.png",
        rating: 2
    },
    { 
        name: "Tollos", 
        latitude: 39.400659,
        longitude: -0.3945479, 
        url: "parada3.html", 
        imageUrl: "parada3/parada3.png",
        rating: 1 
    },
    { 
        name: "Sacañet", 
        latitude: 39.3996542,
        longitude: -0.3948841, 
        url: "parada4.html", 
        imageUrl: "parada4/parada4.png",
        rating: 1 
    },
    { 
        name: "Espadilla", 
        latitude: 39.398679, 
        longitude: -0.3950342, 
         url: "parada5.html", 
        imageUrl: "parada5/parada5.png",
        rating: 1 
    },
    { 
        name: "Peña Saganta", 
        latitude: 39.3993797, 
        longitude: -0.3969805, 
         url: "parada6.html", 
        imageUrl: "parada6/parada6.png",
        rating: 1 
    },
    { 
        name: "La Cueva de Zanzano", 
        latitude: 39.3997543, 
        longitude: -0.3967426, 
         url: "parada7.html", 
        imageUrl: "parada7/parada7.png",
        rating: 1 
    },
    { 
        name: "Caminos del agua", 
        latitude: 39.4012488, 
        longitude: -0.3944826, 
         url: "parada8.html", 
        imageUrl: "parada8/parada8.png",
        rating: 1 
    },
    { 
        name: "Pavías", 
        latitude: 39.4015487, 
        longitude: -0.3925008, 
        url: "parada9.html", 
        imageUrl: "parada9/parada9.png",
        rating: 1 
    },
    { 
        name: "Puente Viejo", 
        latitude: 39.400603, 
        longitude: -0.3978505, 
         url: "parada10.html", 
        imageUrl: "parada10/parada10.png",
        rating: 1 
    },
    { 
        name: "El Valle de Travadell", 
        latitude: 39.397548, 
        longitude: -0.3976812, 
        url: "parada11.html", 
        imageUrl: "parada11/parada11.png",
        rating: 1 
    },
    { 
        name: "Mercado del pueblo", 
        latitude: 39.3960963, 
        longitude: -0.394664, 
         url: "parada12.html", 
        imageUrl: "parada12/parada12.png",
        rating: 1 
    },
    { 
        name: "Amor Propio", 
        latitude: 39.395143, 
        longitude: -0.3964856, 
         url: "parada13.html", 
        imageUrl: "parada13/parada13.png",
        rating: 1 
    },
    { 
        name: "Iglesia N.S. del Rosario", 
        latitude: 39.397268, 
        longitude: -0.389776, 
         url: "parada14.html", 
        imageUrl: "parada14/parada14.png",
        rating: 1 
    },
    { 
        name: "Iglesia de San Lorenzo", 
        latitude: 39.397548, 
        longitude: -0.3950342, 
         url: "parada15.html", 
        imageUrl: "parada15/parada15.png",
        rating: 1 
    },
];

function askForLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            userLat = position.coords.latitude;
            userLng = position.coords.longitude;

            // Luego puedes llamar a renderParada para cada parada en tu lista
            for (let parada of paradas) {
                renderParada(parada, userLat, userLng);
            }
        }, error => {
            console.error("Error obteniendo la ubicación: ", error);
        });
    } else {
        console.log("Geolocalización no es soportada por este navegador.");
    }
}

// Pregunta al usuario si quiere compartir su ubicación
if (confirm("¿Quieres compartir conmigo tus coordenadas para que pueda guiarte en nuestro paseo?")) {
    askForLocation();
}

function renderParada(parada, userLat, userLng) {
    const distKm = simplifiedDistance(userLat, userLng, parada.latitude, parada.longitude);
    const distMeters = (distKm * 1000).toFixed(0);
    const list = document.getElementById('paradasList');

    const item = document.createElement('li');
    item.style = "display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; width: 100%;";

    const link = document.createElement('a');
    link.href = parada.url;
    link.style = "display: flex; align-items: center; text-decoration: none; color: inherit; width: 100%;";

    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';
    const image = document.createElement('img');
    image.src = parada.imageUrl;
    image.alt = `Imagen de ${parada.name}`;
    image.style = "width: 50px; height: 50px; margin: 0 auto;";
    imageContainer.appendChild(image);

    const nameContainer = document.createElement('div');
    nameContainer.className = 'name-container';
    const name = document.createElement('span');
    name.textContent = parada.name;
    nameContainer.appendChild(name);

    const distanceContainer = document.createElement('div');
    distanceContainer.className = 'distance-container';
    const distance = document.createElement('span');
    distance.textContent = `${distMeters} m`;
    distanceContainer.appendChild(distance);

    link.appendChild(imageContainer);
    link.appendChild(nameContainer);
    link.appendChild(distanceContainer);

    item.appendChild(link);
    list.appendChild(item);
}

// Asegúrate de tener las coordenadas del usuario en estas variables
let userLat = ...;
let userLng = ...;

// Luego puedes llamar a renderParada para cada parada en tu lista
for (let parada of paradas) {
    renderParada(parada, userLat, userLng);
}