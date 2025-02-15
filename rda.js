const restaurants = [
    { 
        name: "El Valle de Seta", 
        latitude: 39.4020715, 
        longitude: -0.3895136, 
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
        name: "Parada 9", 
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
    // Añade los demás restaurantes aquí con su respectiva imagen URL
];

document.addEventListener('DOMContentLoaded', function() {
    const list = document.getElementById('restaurantsList');
    if (!list) {
        console.error('Elemento restaurantsList no encontrado');
        return;
    }
    findRestaurants(list);
    connectWebSocket(list);
});

function findRestaurants(list) {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                displayRestaurants(list, latitude, longitude);
            },
            (error) => {
                alert("Error al obtener tu ubicación. Asegúrate de permitir el acceso a tu ubicación.");
                displayRestaurants(list, null, null); // Mostrar sin ubicación
            },
            {
                enableHighAccuracy: true,
                maximumAge: 10000,
                timeout: 5000
            }
        );
    } else {
        alert("Geolocalización no soportada en tu navegador. Intenta con otro dispositivo o navegador.");
        displayRestaurants(list, null, null); // Mostrar sin ubicación
    }
}

function displayRestaurants(list, userLat, userLng) {
    restaurants.sort((a, b) => compareRestaurants(a, b, userLat, userLng));

    list.innerHTML = ''; // Limpiar entradas anteriores
    restaurants.forEach(restaurant => {
        renderRestaurant(list, restaurant, userLat, userLng);
    });
}

function compareRestaurants(a, b, userLat, userLng) {
    if (userLat !== null && userLng !== null) {
        const distA = simplifiedDistance(userLat, userLng, a.latitude, a.longitude);
        const distB = simplifiedDistance(userLat, userLng, b.latitude, b.longitude);
        return distA !== distB ? distA - distB : b.rating - a.rating;
    } else {
        return b.rating - a.rating; // Comparar solo por rating si no hay coordenadas de usuario
    }
}

function renderRestaurant(list, restaurant, userLat, userLng) {
    let distMeters = 'N/A';
    if (userLat !== null && userLng !== null) {
        const distKm = simplifiedDistance(userLat, userLng, restaurant.latitude, restaurant.longitude);
        distMeters = (distKm * 1000).toFixed(0);
    }
    
    const item = document.createElement('li');
    item.style = "display: flex; align-items: center; margin-bottom: 10px;";

    const link = document.createElement('a');
    link.href = restaurant.url;
    link.style = "display: flex; align-items: center; text-decoration: none; color: inherit;";

    const image = document.createElement('img');
    image.src = restaurant.imageUrl; // Usa la URL de la imagen específica para cada restaurante
    image.alt = `Imagen de ${restaurant.name}`;
    image.style = "width: 50px; height: 50px; margin-right: 10px;";

    const name = document.createElement('span');
    name.textContent = restaurant.name;
    name.style = "flex-grow: 1; margin-right: 10px;";

    const distance = document.createElement('span');
    distance.textContent = `${distMeters} m`;

    link.appendChild(image);
    link.appendChild(name);
    link.appendChild(distance);

    item.appendChild(link);
    list.appendChild(item);
}

// Simplified distance calculation to reduce complexity
function simplifiedDistance(lat1, lon1, lat2, lon2) {
    const x = lat2 - lat1;
    const y = (lon2 - lon1) * Math.cos(Math.PI / 180 * lat1);
    return Math.sqrt(x * x + y * y) * 111.32; // Approximation for kilometers
}

function handleGeoLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback, () => {
            alert("Error al obtener tu ubicación. Asegúrate de permitir el acceso a tu ubicación.");
        });
    } else {
        alert("Geolocalización no soportada en tu navegador. Intenta con otro dispositivo o navegador.");
    }
}

function redirectToNearest() {
    handleGeoLocation((position) => {
        const { latitude, longitude } = position.coords;
        window.location.href = getNearestRestaurant(latitude, longitude).url;
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

// WebSocket connection and handling
function connectWebSocket(list) {
    const socket = new WebSocket('wss://gila.ovh/rutadelamor');

    socket.onopen = function(event) {
        console.log('Conexión WebSocket establecida');
    };

    socket.onmessage = function(event) {
        try {
            const data = JSON.parse(event.data);
            if (data.latitude && data.longitude) {
                displayRestaurants(list, data.latitude, data.longitude);
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

    socket.onclose = function() {
        console.log('WebSocket cerrado. Reintentando conexión...');
        setTimeout(() => connectWebSocket(list), 5000); // Reintentar conexión cada 5 segundos
    };
}