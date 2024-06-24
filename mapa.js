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
        name: "Táctica y estrategia", 
        latitude: 39.3994776, 
        longitude: -0.3913431, 
        url: "parada2.html", 
        imageUrl: "parada2/parada2.png",
        rating: 2
    },
    { 
        name: "La culpa es de uno", 
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

// Inicializar el mapa
const map = L.map('map', {
    zoomControl: true, 
    dragging: true, 
    scrollWheelZoom: true, 
    doubleClickZoom: true, 
    boxZoom: true, 
    touchZoom: true
}).setView([39.4, -0.39], 15);

// Añadir capa de mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);

// Definir los límites del mapa basados en los puntos de los restaurantes
const bounds = L.latLngBounds(restaurants.map(restaurant => [restaurant.latitude, restaurant.longitude]));
map.setMaxBounds(bounds.pad(0.1)); // Añadir un padding del 10% alrededor de los puntos

// Crear iconos personalizados para los restaurantes
restaurants.forEach(restaurant => {
    const icon = L.icon({
        iconUrl: restaurant.imageUrl,
        iconSize: [32, 32], // Tamaño del icono
        iconAnchor: [16, 32], // Punto del icono que corresponde a la coordenada
        popupAnchor: [0, -32] // Punto desde el cual se abre el popup en relación con el icono
    });
    const marker = L.marker([restaurant.latitude, restaurant.longitude], { icon: icon }).addTo(map);
    marker.bindPopup(`<b>${restaurant.name}</b><br><a href="${restaurant.url}">Ir a la página</a>`);
});

// Añadir marcador para la posición del usuario
const userMarker = L.marker([0, 0]).addTo(map).bindPopup('Tu posición actual');
let userPosition;

// Actualizar la posición del usuario
function updateUserPosition(position) {
    const { latitude, longitude } = position.coords;
    userMarker.setLatLng([latitude, longitude]);
    const currentZoom = map.getZoom(); // Obtener el nivel de zoom actual
    map.setView([latitude, longitude], currentZoom); // Mantener el nivel de zoom actual
    if (!userPosition) {
        userMarker.openPopup();
        userPosition = [latitude, longitude];
    } else {
        map.panTo([latitude, longitude], { animate: true }); // Centrar el mapa en la posición del usuario
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
