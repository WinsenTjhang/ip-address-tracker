let mymap;

mymap = L.map("mapid").setView([51.505, -0.09], 13);

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "pk.eyJ1Ijoid2luc2VuIiwiYSI6ImNrZmRheWYzbzA0dDYyeHQ3NDkwbHZvN2UifQ.GnPvoiPZHPV-PqDNeJMPfw",
}).addTo(mymap);

async function apiCall(userInput) {
    let ipAddress;
    let domain;

    if ((userInput.match(/./g) || []).length !== 3) {
        domain = userInput;
    } else {
        ipAddress = userInput;
    }

    const response = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_XvloqUFN9zhtJn1eDLTI96k8VF5wC&ipAddress=${ipAddress}&domain=${domain}`);
    const data = await response.json();
    const locCode = [data.location.lat, data.location.lng];
    const address = data.ip;
    const location = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;
    const timezone = data.location.timezone;
    const ISP = data.isp;
    getLocation(locCode);
    addInfo(address, location, timezone, ISP);
}

function getLocation(coordinate) {
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

    document.getElementById("ip-search").value = "";
}

function getInput() {
    let userInput = document.getElementById("ip-search").value;
    apiCall(userInput);
}

// Enter key event listener
var input = document.getElementById("ip-search");
input.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("mybtn").click();
    }
});

function addInfo(ipAddress, location, timezone, isp) {
    document.getElementById("ip").innerHTML = "";
    document.getElementById("ip").insertAdjacentHTML("beforeend", `<p>${ipAddress}</p>`);

    document.getElementById("location").innerHTML = "";
    document.getElementById("location").insertAdjacentHTML("beforeend", `<p>${location}</p>`);

    document.getElementById("timezone").innerHTML = "";
    document.getElementById("timezone").insertAdjacentHTML("beforeend", `<p>UTC ${timezone}</p>`);

    document.getElementById("isp").innerHTML = "";
    document.getElementById("isp").insertAdjacentHTML("beforeend", `<p>${isp}</p>`);
}