let startingAddress = "google.com"
let mymap

apiCall(startingAddress) //Starting map

async function apiCall(userInput) {

    let ipAddress;
    let domain;

    if ((userInput.match(/./g) || []).length !== 3) { //domain and ip address input filter
        domain = userInput;
    } else {
        ipAddress = userInput;
    }

    try {
        const response = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_XvloqUFN9zhtJn1eDLTI96k8VF5wC&ipAddress=${ipAddress}&domain=${domain}`);
        const data = await response.json();

        const locationCode = [data.location.lat, data.location.lng];
        const address = data.ip;
        const location = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;
        const timezone = data.location.timezone;
        const ISP = data.isp;

        renderMap(locationCode);
        addInfo(address, location, timezone, ISP);

    } catch (err) {
        let error = "<p class='error'> Please provide valid IP address or domain name </p>"
        console.log("Invalid input")
        document.querySelector(".search").insertAdjacentHTML("afterend", error)
    }
}

function renderMap(coordinate) {

    if (mymap != undefined) {
        mymap.remove();
    }

    mymap = L.map("mapid").setView(coordinate, 13);

    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: "pk.eyJ1Ijoid2luc2VuIiwiYSI6ImNrZmRheWYzbzA0dDYyeHQ3NDkwbHZvN2UifQ.GnPvoiPZHPV-PqDNeJMPfw",
    }).addTo(mymap);

    var marker = L.marker(coordinate).addTo(mymap);
}

function getInput() { // get user input 
    let userInput = document.getElementById("ip-search").value;
    apiCall(userInput);
    document.getElementById("ip-search").value = ""; // Reset input element 
    document.querySelector(".error").remove() //Remove error message
}

// "Enter" key eventlistener
var input = document.getElementById("ip-search");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("mybtn").click();
    }
});

//Info diplay
function addInfo(ipAddress, location, timezone, isp) {
    document.querySelector(".info").innerHTML = "" //reset info bar

    document.getElementById("ip").innerHTML = `${ipAddress}`;
    document.getElementById("location").innerHTML = `${location}`;
    document.getElementById("timezone").innerHTML = `${timezone}`;
    document.getElementById("isp").innerHTML = `${isp}`;
}