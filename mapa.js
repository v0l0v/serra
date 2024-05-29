const restaurants = [
    { 
        name: "El Valle de Seta", 
        latitude: 39.4020715, 
        longitude: -0.3895136, 
        url: "parada1.html", 
        imageUrl: "parada1/parada1.png"
    },
    { 
        name: "Castell de Cabres", 
        latitude: 39.3994776, 
        longitude: -0.3913431, 
        url: "parada2.html", 
        imageUrl: "parada2/parada2.png"
    },
    // Añade los demás restaurantes aquí con su respectiva imagen URL
];

// Inicializar el mapa
const map = L.map('map').setView([39.4, -0.39], 13); // Coordenadas centrales y zoom

// Añadir capa de mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);

// Añadir marcadores de restaurantes
restaurants.forEach(restaurant => {
    const marker = L.marker([restaurant.latitude, restaurant.longitude]).addTo(map);
    marker.bindPopup(`<b>${restaurant.name}</b><br><a href="${restaurant.url}">Ir a la página</a>`);
});

// Añadir marcador para la posición del usuario
const userMarker = L.marker([0, 0]).addTo(map).bindPopup('Tu posición actual');
let userPosition;

// Actualizar la posición del usuario
function updateUserPosition(position) {
    const { latitude, longitude } = position.coords;
    userMarker.setLatLng([latitude, longitude]);
    map.setView([latitude, longitude], 13); // Centrar el mapa en la nueva posición
    if (!userPosition) {
        userMarker.openPopup();
        userPosition = [latitude, longitude];
    }
}

// Manejar errores de geolocalización
function handleLocationError(error) {
    console.error('Error al obtener la ubicación:', error);
}

// Obtener la posición del usuario en tiempo real
if (navigator.geolocation) {
    navigator.geolocation.watchPosition(updateUserPosition, handleLocationError, {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000
    });
} else {
    alert("Geolocalización no soportada en tu navegador. Intenta con otro dispositivo o navegador.");
}
