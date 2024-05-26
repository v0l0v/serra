

function handleGeoLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback, () => {
            alert("Error al obtener tu ubicación. Asegúrate de permitir el acceso a tu ubicación.");
        });
    } else {
        alert("Geolocalización no soportada en tu navegador. Intenta con otro dispositivo o navegador.");
    }
}

function displayNearestRestaurant(userLat, userLng) {
    const nearestRestaurant = getNearestRestaurant(userLat, userLng);
    renderRestaurant(nearestRestaurant, userLat, userLng);
}

function getNearestRestaurant(userLat, userLng) {
    return restaurants.reduce((nearest, restaurant) => {
        const dist = simplifiedDistance(userLat, userLng, restaurant.latitude, restaurant.longitude);
        return (dist < nearest.dist) ? { dist, restaurant } : nearest;
    }, { dist: Infinity }).restaurant;
}

function renderRestaurant(restaurant, userLat, userLng) {
    const list = document.getElementById('nearestList');
    const distKm = simplifiedDistance(userLat, userLng, restaurant.latitude, restaurant.longitude);
    const distMeters = (distKm * 1000).toFixed(0);

    const item = document.createElement('li');
    item.style = "display: flex; align-items: center; margin-bottom: 10px;";

    const link = document.createElement('a');
    link.href = restaurant.url;
    link.target = "_blank";
    link.style = "display: flex; align-items: center; text-decoration: none; color: inherit;";

    const image = document.createElement('img');
    image.src = restaurant.imageUrl;
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

const restaurants = [
    // Aquí debes copiar el arreglo de restaurantes del archivo scriptSaborea.js
    // Ejemplo:
    {
        name: "Parada 3",
        latitude: 39.4020715,
        longitude: -0.3895136,
        url: "parada3.html",
        imageUrl: "parada3/parada3.png",
        rating: 1
    },
    // Agrega el resto de restaurantes aquí...
];
