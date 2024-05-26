
const restaurants = [
    { 
        name: "Parada 3", 
        latitude: 39.4020715, 
        longitude: -0.3895136, 
        url: "parada3.html", 
        imageUrl: "parada3/parada3.png",
        rating: 1
    },
    { 
        name: "Parada 4", 
        latitude: 39.3994776, 
        longitude: -0.3913431, 
        url: "parada4.html", 
        imageUrl: "parada4/parada4.png",
        rating: 2
    },
    { 
        name: "Parada 14", 
        latitude: 39.400659,
        longitude: -0.3945479, 
        url: "parada14.html", 
        imageUrl: "parada14/parada14.png",
        rating: 1 
    },
    { 
        name: "Parada 13", 
        latitude: 39.3996542,
        longitude: -0.3948841, 
        url: "parada13.html", 
        imageUrl: "parada13/parada13.png",
        rating: 1 
    },
    { 
        name: "Restaurante Kamaka", 
        latitude: 39.398679, 
        longitude: -0.3950342, 
        url: "https://gila.ovh/saborea/restaurante_kamaka.html", 
        imageUrl: "https://gila.ovh/saborea/rkamaka/rkamaka.png",
        rating: 1 
    },
    { 
        name: "Restaurante Castilla", 
        latitude: 39.3993797, 
        longitude: -0.3969805, 
        url: "https://gila.ovh/saborea/restaurante_castilla.html", 
        imageUrl: "https://gila.ovh/saborea/rcastilla/rcastilla.png",
        rating: 1 
    },
    { 
        name: "Restaurante El Ravachol", 
        latitude: 39.3997543, 
        longitude: -0.3967426, 
        url: "https://gila.ovh/saborea/restaurante_elravachol.html", 
        imageUrl: "https://gila.ovh/saborea/relravachol/relravachol.png",
        rating: 1 
    },
    { 
        name: "Restaurante Los Pines", 
        latitude: 39.4012488, 
        longitude: -0.3944826, 
        url: "https://gila.ovh/saborea/restaurante_lospines.html", 
        imageUrl: "https://gila.ovh/saborea/rlospines/rlospines.png",
        rating: 1 
    },
    { 
        name: "Parada 1", 
        latitude: 39.4015487, 
        longitude: -0.3925008, 
        url: "parada1.html", 
        imageUrl: "parada1/parada1.png",
        rating: 1 
    },
    { 
        name: "Restaurante La Casa Vella", 
        latitude: 39.400603, 
        longitude: -0.3978505, 
        url: "https://gila.ovh/saborea/restaurante_lacasavella.html", 
        imageUrl: "https://gila.ovh/saborea/rlacasavella/rlacasavella.png",
        rating: 1 
    },
    { 
        name: "Parada 2", 
        latitude: 39.397548, 
        longitude: -0.3976812, 
        url: "parada2.html", 
        imageUrl: "parada2/parada2.png",
        rating: 1 
    },
    { 
        name: "Restaurante La Esquina", 
        latitude: 39.3960963, 
        longitude: -0.394664, 
        url: "https://gila.ovh/saborea/restaurante_laesquina.html", 
        imageUrl: "https://gila.ovh/saborea/rlaesquina/rlaesquina.png",
        rating: 1 
    },
    { 
        name: "Restaurante La Bonita", 
        latitude: 39.395143, 
        longitude: -0.3964856, 
        url: "https://gila.ovh/saborea/restaurante_labonita.html", 
        imageUrl: "https://gila.ovh/saborea/rlabonita/rlabonita.png",
        rating: 1 
    },
    { 
        name: "Restaurante Villanueva", 
        latitude: 39.397268, 
        longitude: -0.389776, 
        url: "https://gila.ovh/saborea/restaurante_villanueva.html", 
        imageUrl: "https://gila.ovh/saborea/rvillanueva/rvillanueva.png",
        rating: 1 
    },
    { 
        name: "Restaurante Gila", 
        latitude: 39.397548, 
        longitude: -0.3950342, 
        url: "https://gila.ovh/saborea/restaurante_gila.html", 
        imageUrl: "https://gila.ovh/saborea/rgila/rgila.png",
        rating: 1 
    },
    // Añade los demás restaurantes aquí con su respectiva imagen URL
];

document.addEventListener('DOMContentLoaded', function() {
    findRestaurants(); toggleList()
});

function handleGeoLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback, () => {
            alert("Error al obtener tu ubicación. Asegúrate de permitir el acceso a tu ubicación.");
        });
    } else {
        alert("Geolocalización no soportada en tu navegador. Intenta con otro dispositivo o navegador.");
    }
}

function findRestaurants() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                displayRestaurants(latitude, longitude);
            },
            (error) => {
                alert("Error al obtener tu ubicación. Asegúrate de permitir el acceso a tu ubicación.");
            },
            {
                enableHighAccuracy: true, // Para mayor precisión
                maximumAge: 10000, // Acepta posiciones cacheadas de hasta 10 segundos de antigüedad
                timeout: 5000 // Tiempo máximo en milisegundos que se espera para obtener una posición
            }
        );
    } else {
        alert("Geolocalización no soportada en tu navegador. Intenta con otro dispositivo o navegador.");
    }
}

// Cache DOM element to avoid repeated lookups
const list = document.getElementById('restaurantsList');
list.innerHTML = ''; // Limpiar lista existente

restaurants.forEach(restaurant => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <div class="restaurant-entry">
            <img src="${restaurant.logo}" alt="Logo de ${restaurant.name}" class="logo">
            <div class="info">
                <span class="name">${restaurant.name}</span>
                <span class="distance">${restaurant.distance}</span>
            </div>
        </div>
    `;
    list.appendChild(listItem);
});

// Conexión WebSocket
const socket = new WebSocket('ws://gila.ovh/saborea');

socket.onopen = function(event) {
    console.log('Conexión WebSocket establecida');
};

socket.onmessage = function(event) {
    try {
        const data = JSON.parse(event.data);
        // Asegúrate de que los datos incluyan latitud y longitud válidas
        if (data.latitude && data.longitude) {
            displayRestaurants(data.latitude, data.longitude);
        } else {
            console.error('Formato de datos incorrecto:', data);
        }
    } catch (error) {
        console.error('Error procesando los datos:', error);
    }
};

socket.onerror = function(error) {
    console.error('WebSocket error:', error);
};

//  reconexión automática en caso de que la conexión WebSocket se pierda
socket.onclose = function() {
    console.log('WebSocket cerrado. Reintentando conexión...');
    setTimeout(function() {
        connectWebSocket();
    }, 5000); // Reintentar conexión cada 5 segundos
};

function connectWebSocket() {
    // Intenta reconectar
    socket = new WebSocket('ws://gila.ovh/saborea');
}

// Agrega validación para asegurarte de que los datos recibidos a través de WebSocket sean válidos.
socket.onmessage = function(event) {
    try {
        const data = JSON.parse(event.data);
        if(data.latitude && data.longitude) {
            displayRestaurants(data.latitude, data.longitude);
        } else {
            console.error('Formato de datos incorrecto:', data);
        }
    } catch (error) {
        console.error('Error procesando los datos:', error);
    }
};


function displayRestaurants(userLat, userLng) {
    restaurants.sort((a, b) => compareRestaurants(a, b, userLat, userLng));

    list.innerHTML = ''; // Limpiar entradas anteriores
    restaurants.forEach(restaurant => {
        renderRestaurant(restaurant, userLat, userLng);
    });
}

function compareRestaurants(a, b, userLat, userLng) {
    const distA = simplifiedDistance(userLat, userLng, a.latitude, a.longitude);
    const distB = simplifiedDistance(userLat, userLng, b.latitude, b.longitude);
    return distA !== distB ? distA - distB : b.rating - a.rating;
}

function renderRestaurant(restaurant, userLat, userLng) {
    const distKm = simplifiedDistance(userLat, userLng, restaurant.latitude, restaurant.longitude);
    const distMeters = (distKm * 1000).toFixed(0);
    const item = document.createElement('li');
    item.style = "display: flex; align-items: center; margin-bottom: 10px;"; // Estilos para alinear los elementos en una fila

    const link = document.createElement('a');
    link.href = restaurant.url;
    link.target = "_blank"; // para abrir en una nueva pestaña
    link.style = "display: flex; align-items: center; text-decoration: none; color: inherit;"; // Estilos para el enlace

    const image = document.createElement('img');
    image.src = restaurant.imageUrl; // Usa la URL de la imagen específica para cada restaurante
    image.alt = `Imagen de ${restaurant.name}`;
    image.style = "width: 50px; height: 50px; margin-right: 10px;"; // Estilos para la imagen

    const name = document.createElement('span');
    name.textContent = restaurant.name;
    name.style = "flex-grow: 1; margin-right: 10px;"; // Flex-grow para que el nombre ocupe el espacio disponible

    const distance = document.createElement('span');
    distance.textContent = `${distMeters} m`;

    link.appendChild(image); // Primero la imagen
    link.appendChild(name); // Segundo el nombre
    link.appendChild(distance); // Tercero la distancia

    item.appendChild(link);
    list.appendChild(item);
}

// Simplified distance calculation to reduce complexity
function simplifiedDistance(lat1, lon1, lat2, lon2) {
    const x = lat2 - lat1;
    const y = (lon2 - lon1) * Math.cos(Math.PI / 180 * lat1);
    return Math.sqrt(x * x + y * y) * 111.32; // Approximation for kilometers
}

function redirectToNearest() {
    handleGeoLocation((position) => {
        const { latitude, longitude } = position.coords;
                window.location.href = `nearest.html?lat=${latitude}&lng=${longitude}`;
    });
}

function getNearestRestaurant(userLat, userLng) {
    return restaurants.reduce((nearest, restaurant) => {
        const dist = simplifiedDistance(userLat, userLng, restaurant.latitude, restaurant.longitude);
        return (dist < nearest.dist) ? { dist, restaurant } : nearest;
    }, { dist: Infinity }).restaurant;
}

function redirectToBestRated() {
    const maxRating = Math.max(...restaurants.map(r => r.rating));
    const bestRatedRestaurants = restaurants.filter(r => r.rating === maxRating);
    window.location.href = bestRatedRestaurants[Math.floor(Math.random() * bestRatedRestaurants.length)].url;
}

function toggleList() {
    list.style.display = window.getComputedStyle(list).display === 'none' ? 'block' : 'none';
}


