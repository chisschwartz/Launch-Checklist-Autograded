// Write your helper functions here!

//const { default: test } = require('node:test');

require('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, image) {
    // Here is the HTML formatting for our mission target div.
    let target = document.getElementById("missionTarget");
    target.innerHTML = (`
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name}</li>
                     <li>Diameter: ${diameter}</li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance}</li>
                     <li>Number of Moons: ${moons} </li>
                 </ol>
                 <img src="${image}">
`);
};


    function validateInput(testInput) {
        if (testInput === "") {
            return "Empty";
        } else if (isNaN(testInput)) {
            return "Not a Number";
        } else if (typeof Number(testInput) === "number") {
            return "Is a Number";
        };
    };

    function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
        let status = document.getElementById("launchStatus");
        let pilotStatus = document.getElementById("pilotStatus");
        let copilotStatus = document.getElementById("copilotStatus");
        let fuel = document.getElementById("fuelStatus");
        let cargo = document.getElementById("cargoStatus");

        if ((validateInput(fuelLevel) === "Empty") || (validateInput(cargoLevel) === "Empty") || (
            (validateInput(pilot) === "Empty")) || ((validateInput(copilot) === "Empty"))) {
                alert("ALL FIELDS REQUIRED!!");
            } else if (validateInput(pilot) === "Is a Number") {
                alert("INVALID PILOT NAME!!");
            } else if (validateInput(copilot) === "Is a Number") {
                alert("INVALID COPILOT NAME!!");
            } else if (validateInput(fuelLevel) === "Not a Number") {
                alert("INVALID FUEL LEVEL");
            } else if (validateInput(cargoLevel) === "Not a Number") {
                alert("INVALID FUEL LEVEL");
            };

        if (fuelLevel < 10000 && cargoLevel < 10000) {
            list.style.visibility = "visible";
            //list.style = "visibility: visible";
            fuel.innerHTML = `Fuel level too low for launch`;
            status.innerHTML = `Shuttle Not Ready for Launch`;
            status.style.color = "red";   
            copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
            pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
            cargo.innerHTML = `Cargo mass low enough for launch`;

        } else if (cargoLevel > 10000 && fuelLevel >= 10000) {
            list.style.visibility = "visible";
            //list.style = "visibility: visible";
            cargo.innerHTML = `Cargo mass too heavy for launch`;
            status.innerHTML = `Shuttle Not Ready for Launch`;
            status.style.color = "red";
            copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
            pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch;`
            fuel.innerHTML = `Fuel level high enough for launch`;

        } else if ((cargoLevel > 10000) && (fuelLevel < 10000)) {
            list.style.visibility = "visible";
            //list.style = "visibility: visible";
            cargo.innerHTML = `Cargo mass too heavy for launch`;
            fuel.innerHTML = `Fuel level too low for launch`;
            status.innerHTML = `Shuttle Not Ready for Launch`;
            status.style.color = "red";
            copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
            pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;

        } else {
            list.style.visibility = "visible";
            //list.style = "visibility: visible";
            status.innerHTML = `Shuttle is Ready for Launch`;
            status.style.color = "green";
            copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
            pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
            fuel.innerHTML = `Fuel level high enough for launch`;
            cargo.innerHTML = `Cargo mass low enough for launch`;
        };  
    };

async function myFetch() {
    //let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        return response.json()
    });

    return planetsReturned;
};

function pickPlanet(planets) {
    let rando = Math.floor(Math.random() * planets.length);
    return planets[rando];
};

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;