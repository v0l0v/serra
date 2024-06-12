const restaurants = [
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

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distancia en km
    return distance;
};

const displayRestaurants = (restaurants) => {
    const restaurantList = document.getElementById('restaurant-list');
    restaurantList.innerHTML = '';
    restaurants.forEach(restaurant => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${restaurant.url}">${restaurant.name}</a> - ${restaurant.distance.toFixed(2)} km`;
        restaurantList.appendChild(li);
    });
};

const successCallback = (position) => {
    const referencePoint = { 
        latitude: position.coords.latitude, 
        longitude: position.coords.longitude 
    };

    restaurants.forEach(restaurant => {
        restaurant.distance = calculateDistance(
            referencePoint.latitude, 
            referencePoint.longitude, 
            restaurant.latitude, 
            restaurant.longitude
        );
    });

    restaurants.sort((a, b) => a.distance - b.distance);

    displayRestaurants(restaurants);
};

const errorCallback = (error) => {
    console.error('Error getting the location:', error);
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
