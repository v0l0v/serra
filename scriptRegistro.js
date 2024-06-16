document.addEventListener('DOMContentLoaded', function() {
    watchUserLocation();
    centerRestaurantName();
});

function watchUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                displayRestaurants(latitude, longitude);
            },
            error => {
                console.error("Error al obtener la ubicación: ", error);
                displayRestaurants(); // Aún mostrar los restaurantes sin ubicación
            },
            { enableHighAccuracy: true }
        );
    } else {
        alert("Geolocalización no soportada en tu navegador.");
        displayRestaurants(); // Mostrar los restaurantes sin ubicación
    }
}

function displayRestaurants(userLat, userLng) {
    const list = document.getElementById('restaurantsList');
    list.innerHTML = ''; // Limpia la lista existente

    const visitedList = [];
    const notVisitedList = [];

    restaurants.forEach(restaurant => {
        const listItem = createRestaurantListItem(restaurant, userLat, userLng);
        const visited = localStorage.getItem(`visited_${restaurant.name}`) === 'true';
        if (visited) {
            visitedList.push(listItem);
        } else {
            notVisitedList.push(listItem);
        }
    });

    // Añadir primero los no visitados y luego los visitados
    notVisitedList.forEach(item => list.appendChild(item));
    visitedList.forEach(item => list.appendChild(item));
}

function createRestaurantListItem(restaurant, userLat, userLng) {
    const listItem = document.createElement('li');
    listItem.style = "display: flex; align-items: center; justify-content: center; margin-bottom: 10px;";
    
    const image = document.createElement('img');
    image.src = restaurant.imageUrl;
    image.alt = `Imagen de ${restaurant.name}`;
    image.style = "width: 50px; height: 50px; margin-right: 10px; cursor: pointer;";
    image.onclick = () => toggleVisited(restaurant.name, listItem, visitedStatus);

    const label = document.createElement('label');
    label.style = "flex-grow: 1; margin-right: 10px; display: flex; align-items: center; justify-content: center;";

    const name = document.createTextNode(restaurant.name + ' ');

    const visitedStatus = document.createElement('span');
    visitedStatus.style = "margin-left: 10px; color: green; font-weight: bold;";
    if (localStorage.getItem(`visited_${restaurant.name}`) === 'true') {
        visitedStatus.textContent = 'VISITADO';
        listItem.style.filter = 'blur(1px)'; // Aplicar un desenfoque ligero
        listItem.style.opacity = '0.6';
    }

    label.appendChild(name);
    label.appendChild(visitedStatus);
    listItem.appendChild(image);
    listItem.appendChild(label);

    return listItem;
}

function toggleVisited(restaurantName, listItem, visitedStatus) {
    const visited = localStorage.getItem(`visited_${restaurantName}`) === 'true';
    localStorage.setItem(`visited_${restaurantName}`, !visited);
    visitedStatus.textContent = !visited ? 'VISITADO' : '';
    listItem.style.filter = !visited ? 'blur(1px)' : 'none'; // Aplicar o quitar el desenfoque
    listItem.style.opacity = !visited ? '0.6' : '1';
}
document.addEventListener('DOMContentLoaded', () => {
    const pathname = window.location.pathname; // Obtener la ruta del archivo actual
    const buttons = document.querySelectorAll('.button-container button'); // Obtener todos los botones
    buttons.forEach(button => {
        if (button.onclick.toString().includes(pathname)) {
            button.classList.add('active'); // Añadir la clase 'active' si la ruta coincide
        }
    });
});