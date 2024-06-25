
const paradas = [
    { 
        name: "Estados de ánimo", 
        latitude: 39.4032738, 
        longitude: -0.3991262, 
        url: "parada1.html", 
        imageUrl: "parada1/parada1.png",
        rating: 1
    },
    { 
        name: "Táctica y estrategia", 
        latitude: 39.3994776, 
        longitude: -0.3913431, 
        url: "parada2.html", 
        imageUrl: "parada2/parada2.png",
        rating: 2
    },
    { 
        name: "Almohadas", 
        latitude: 39.400659,
        longitude: -0.3945479, 
        url: "parada3.html", 
        imageUrl: "parada3/parada3.png",
        rating: 1 
    },
    { 
        name: "El hijo", 
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
    // Añade los demás paradaes aquí con su respectiva imagen URL
];

document.addEventListener('DOMContentLoaded', function() {
    console.log('Documento cargado y listo');
    findParadas();
    checkProximity();
});

function findParadas() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                console.log('Ubicación obtenida:', latitude, longitude);
                displayParadas(latitude, longitude);
            },
            (error) => {
                console.error('Error de geolocalización:', error);
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        alert("Permiso denegado para acceder a la ubicación.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert("Información de ubicación no disponible.");
                        break;
                    case error.TIMEOUT:
                        alert("Se agotó el tiempo de espera para obtener la ubicación.");
                        break;
                    default:
                        alert("Error desconocido al obtener la ubicación.");
                }
            },
            {
                enableHighAccuracy: true,
                maximumAge: 10000,
                timeout: 5000
            }
        );
    } else {
        alert("Geolocalización no soportada en tu navegador. Intenta con otro dispositivo o navegador.");
    }
}


function displayParadas(userLat, userLng) {
    const list = document.getElementById('paradasList');
    list.innerHTML = ''; // Limpiar entradas anteriores

    paradas.sort((a, b) => compareParadas(a, b, userLat, userLng));
    
    paradas.forEach(parada => {
        renderParada(parada, userLat, userLng);
    });
}

function compareParadas(a, b, userLat, userLng) {
    const distA = simplifiedDistance(userLat, userLng, a.latitude, a.longitude);
    const distB = simplifiedDistance(userLat, userLng, b.latitude, b.longitude);
    return distA !== distB ? distA - distB : b.rating - a.rating;
}

function renderParada(parada, userLat, userLng) {
    const distKm = simplifiedDistance(userLat, userLng, parada.latitude, parada.longitude);
    const distMeters = (distKm * 1000).toFixed(0);
    const list = document.getElementById('paradasList');

    const item = document.createElement('li');
    item.style = "display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; width: 100%;"; // Asegura que el contenido esté distribuido equitativamente

    const link = document.createElement('a');
    link.href = parada.url;
    link.style = "display: flex; align-items: center; text-decoration: none; color: inherit; width: 100%;"; // Distribuye el espacio entre los elementos

    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';
    const image = document.createElement('img');
    image.src = parada.imageUrl; // Usa la URL de la imagen específica para cada paradae
    image.alt = `Imagen de ${parada.name}`;
    image.style = "width: 50px; height: 50px; margin: 0 auto;"; // Centra la imagen dentro de su contenedor
    imageContainer.appendChild(image);

    const nameContainer = document.createElement('div');
    nameContainer.className = 'name-container'; // Contenedor para el nombre centrado
    const name = document.createElement('span');
    name.textContent = parada.name;
    nameContainer.appendChild(name);

    const distanceContainer = document.createElement('div');
    distanceContainer.className = 'distance-container'; // Contenedor para la distancia centrada
    const distance = document.createElement('span');
    distance.textContent = `${distMeters} m`;
    distanceContainer.appendChild(distance);

    link.appendChild(imageContainer); // Primero la imagen centrada
    link.appendChild(nameContainer); // Luego el nombre centrado
    link.appendChild(distanceContainer); // Finalmente la distancia centrada

    item.appendChild(link);
    list.appendChild(item);
}

// Simplified distance calculation to reduce complexity
function simplifiedDistance(lat1, lon1, lat2, lon2) {
    const x = lat2 - lat1;
    const y = (lon2 - lon1) * Math.cos(Math.PI / 180 * lat1);
    return Math.sqrt(x * x + y * y) * 111.32; // Approximation for kilometers
}

function checkProximity() {
    // Implementación de la función para verificar proximidad
}

function redirectToBestRated() {
    const maxRating = Math.max(...paradas.map(r => r.rating));
    const bestRatedParadas = paradas.filter(r => r.rating === maxRating);
    window.location.href = bestRatedParadas[Math.floor(Math.random() * bestRatedParadas.length)].url;
}

function checkAnswer() {
    const selectElement = document.getElementById('questionSelect');
    const selectedValue = selectElement.value;

    const hiddenText = document.getElementById('hiddenText');
    const incorrectText = document.getElementById('incorrectText');

    // Ocultar ambos mensajes al principio
    hiddenText.style.display = 'none';
    incorrectText.style.display = 'none';

    if (selectedValue === 'correct') {
        // Si la respuesta es correcta, mostrar el mensaje de acierto
        hiddenText.style.display = 'block';
    } else if (selectedValue === 'incorrect') {
        // Si la respuesta es incorrecta, mostrar el mensaje de error
        incorrectText.style.display = 'block';
    }
}