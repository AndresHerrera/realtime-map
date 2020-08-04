const mymap = L.map('mymap').setView([ 3.4516, -76.5320 ], 13);

//socket
const socket = io();

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
    }).addTo(mymap);


mymap.locate({enableHighAccuracy: true });
mymap.on('locationfound', e =>
{
    //console.log(e);
    const coords = [e.latlng.lat, e.latlng.lng];
    const  marker = L.marker(coords);
    marker.bindPopup("<b>Hola Clase!</b><br>Esta es mi propia ubicacion").openPopup();   
    mymap.addLayer(marker); 
    socket.emit('userCoordinates', e.latlng);
});  

socket.on('newUserCoordinates', (coords) => 
{
    console.log('A new user is connected !');
    const  marker = L.marker([coords.lat, coords.lng] );
    marker.bindPopup("<b>Hola Clase!</b><br>Soy un usuario conectado").openPopup();   
    mymap.addLayer(marker);     
});


socket.on('totalUsersConnected', (msg) => 
{
    document.getElementById('msgusers').innerHTML = `<b>${msg}</b>`;
});

const  marker = L.marker([3.4316, -76.5220]);
marker.bindPopup("<b>Hola Clase!</b><br>Soy un popup").openPopup();   
mymap.addLayer(marker); 
    

