document.addEventListener("DOMContentLoaded", function() {
    console.log("Document loaded. Checking for stored vehicle data...");

    if (document.getElementById("year")) {
        populateYears();
        populateMakes();
    }

    if (localStorage.getItem("vehicle")) {
        console.log("Vehicle data found. Loading vehicle...");
        loadVehicle();
    } else {
        console.log("No vehicle data found in localStorage.");
    }

    if (document.getElementById("menuButton")) {
        document.getElementById("menuButton").addEventListener("click", toggleMenu);
    }

    // Check if there's an oil change reminder saved and display it on the main page
    if (localStorage.getItem("oilChangeReminder")) {
        const reminder = JSON.parse(localStorage.getItem("oilChangeReminder"));
        const nextOilChangeKm = reminder.currentKm + reminder.nextChange;
        document.getElementById("oilChangeBubble").classList.remove("hidden");
        document.getElementById("nextOilChangeKM").innerText = `${nextOilChangeKm}`;
    }
});

// Toggle the driver’s guide menu
function toggleMenu() {
    let menu = document.getElementById("sideMenu");
    menu.classList.toggle("open");
}

// Save vehicle details to localStorage and navigate to the main page
function saveVehicle() {
    const year = document.getElementById("year").value;
    const make = document.getElementById("make").value;
    const model = document.getElementById("model").value;

    console.log(`Saving vehicle: Year=${year}, Make=${make}, Model=${model}`);

    if (year && make && model) {
        localStorage.setItem("vehicle", `${year} ${make} ${model}`);
        window.location.href = "mainpage.html";
    } else {
        console.warn("Please select all vehicle details.");
    }
}

// Load the stored vehicle details
function loadVehicle() {
    const vehicle = localStorage.getItem("vehicle");
    if (vehicle) {
        document.getElementById("vehicleBanner").innerText = vehicle;
    }
}

// Save oil change information and navigate to the main page
function saveOilChange() {
    const currentKm = document.getElementById("currentKm").value;
    const nextChange = document.getElementById("nextChange").value;

    if (currentKm && nextChange) {
        const oilChangeReminder = {
            currentKm: parseInt(currentKm),
            nextChange: parseInt(nextChange)
        };

        // Save the oil change reminder in localStorage
        localStorage.setItem("oilChangeReminder", JSON.stringify(oilChangeReminder));

        // Redirect to main page after saving
        window.location.href = "mainpage.html";
    } else {
        alert("Please enter both values.");
    }
}

// Populating vehicle years
function populateYears() {
    let yearSelect = document.getElementById("year");
    for (let year = 2025; year >= 1980; year--) {
        let option = document.createElement("option");
        option.value = year;
        option.text = year;
        yearSelect.add(option);
    }
}

// Full list of manufacturers and models, including older and discontinued ones
const manufacturers = {
    "Toyota": ["Camry", "Corolla", "RAV4", "Tacoma", "Tundra", "Highlander", "Prius", "Supra", "Celica", "MR2", "Avalon"],
    "Ford": ["F-150", "Mustang", "Escape", "Explorer", "Edge", "Bronco", "Focus", "Taurus", "Fiesta", "Ranger", "Thunderbird"],
    "Honda": ["Civic", "Accord", "CR-V", "Pilot", "Fit", "Ridgeline", "Prelude", "S2000", "Element", "Insight", "HR-V"],
    "Chevrolet": ["Silverado", "Malibu", "Equinox", "Tahoe", "Camaro", "Traverse", "Impala", "Corvette", "Blazer", "Monte Carlo"],
    "Nissan": ["Altima", "Sentra", "Rogue", "Murano", "Frontier", "Pathfinder", "350Z", "370Z", "GT-R", "Maxima", "Xterra"],
    "BMW": ["3 Series", "5 Series", "7 Series", "X3", "X5", "M3", "M4", "Z4", "X7", "i4"],
    "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLA", "GLC", "GLE", "AMG GT", "SL-Class", "A-Class"],
    "Audi": ["A3", "A4", "A6", "Q3", "Q5", "Q7", "TT", "RS3", "RS7", "e-tron"],
    "Hyundai": ["Elantra", "Sonata", "Tucson", "Santa Fe", "Kona", "Palisade", "Veloster", "Genesis Coupe"],
    "Kia": ["Soul", "Forte", "Sportage", "Sorento", "Telluride", "Stinger", "Optima", "K5"],
    "Volkswagen": ["Golf", "Jetta", "Passat", "Tiguan", "Atlas", "GTI", "CC", "Beetle", "Touareg"],
    "Subaru": ["Outback", "Forester", "Impreza", "WRX", "Legacy", "BRZ", "Baja", "Crosstrek"],
    "Mazda": ["Mazda3", "Mazda6", "CX-5", "CX-9", "MX-5 Miata", "RX-7", "RX-8", "CX-30"],
    "Tesla": ["Model S", "Model 3", "Model X", "Model Y", "Cybertruck", "Roadster"],
    "Jeep": ["Wrangler", "Grand Cherokee", "Cherokee", "Renegade", "Gladiator", "Liberty", "Patriot"],
    "Dodge": ["Charger", "Challenger", "Durango", "Ram 1500", "Neon", "Viper", "Magnum", "Dart"],
    "GMC": ["Sierra", "Yukon", "Acadia", "Canyon", "Envoy", "Terrain", "Jimmy"],
    "Lexus": ["RX", "ES", "NX", "IS", "GX", "LS", "SC", "RC"],
    "Acura": ["TLX", "MDX", "RDX", "ILX", "NSX", "RSX", "TSX", "Integra", "Legend", "Vigor", "CL"],
    "Volvo": ["XC40", "XC60", "XC90", "S60", "S90", "V60", "V90"],
    "Porsche": ["911", "Cayenne", "Macan", "Panamera", "Taycan", "Boxster", "Carrera", "918 Spyder"]
};

// Populate the vehicle manufacturers dropdown
function populateMakes() {
    let makeSelect = document.getElementById("make");
    Object.keys(manufacturers).forEach(make => {
        let option = document.createElement("option");
        option.value = make;
        option.text = make;
        makeSelect.add(option);
    });

    makeSelect.addEventListener("change", function() {
        populateModels(this.value);
    });
}

// Populate models based on selected manufacturer
function populateModels(make) {
    let modelSelect = document.getElementById("model");
    modelSelect.innerHTML = "<option value=''>Select Model</option>";
    if (manufacturers[make]) {
        manufacturers[make].forEach(model => {
            let option = document.createElement("option");
            option.value = model;
            option.text = model;
            modelSelect.add(option);
        });
    }
}
