let button = document.querySelector("button");
let error = document.getElementById('errorMessage');

button.addEventListener("click", apiQuery);
window.addEventListener("keydown", enterKey);

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
today = dd + "/" + mm + "/" + yyyy;
document.getElementById('date').innerText = today;

snowStorm.start();
snowStorm.stop();
snowStorm.freeze();

document.body.style.animation = "none";

function enterKey(e) {
    if(e.keyCode === 13) {
        document.querySelector("input").blur();
        apiQuery();
    }
}

function apiQuery() {
    let place = document.getElementById("inputPlace").value;
    let query = "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&appid=d54a7dcc244b2e97f8abaa82d976ff44&units=metric";
    let xhr = new XMLHttpRequest();
    xhr.open("GET", query, true);
    xhr.send();
    xhr.onload = queryResult;
}

function queryResult() {
    if(this.status === 200) {
        let result = JSON.parse(this.responseText);
        error.innerText = "";
        displayResult(result);
    } else {
        error.innerText = "Could not find location";
    }
}

function displayResult(result) {
    let overall = result.weather[0].description;
    let place = result.name;
    let country = result.sys.country;
    let temp = result.main.temp;
    let humidity = result.main.humidity;
    let wind = result.wind.speed;
    let windDirection = "<small><small>  " + result.wind.deg + "°</small></small>";
    let cloud = result.clouds.all / 12.5;


    snowStorm.stop();
    snowStorm.freeze();
    document.getElementById('sunnyDiv').innerHTML = "";
    document.getElementById('cloudyDiv').innerHTML = "";
    document.getElementById('fogDiv').innerHTML = "";
    demo.createCanvas();

    if(temp < 5) {
        snowStorm.show();
        snowStorm.resume();
    }
    else if(temp > 5 && temp <= 15) {
        document.getElementById('fogDiv').innerHTML = foggyDay;
    }
    else if(temp > 15 && temp <= 22) {
        demo.init();
    }
    else if(temp > 22 && temp <= 27) {
        document.getElementById('cloudyDiv').innerHTML = cloudyDay;
    }
    else {
        document.getElementById('sunnyDiv').innerHTML = sunnyDay;
    }


    let HumidityStyle = "<small style=\"font-size: 25px\">%</small>";
    let windStyle = "<small style=\"font-size: 25px\"> Knots</small>";
    let cloudStyle = "<small style=\"font-size: 25px\">Okta</small>";
    document.getElementById("overall").innerText= overall;
    document.getElementById("place").innerText = place + ", ";
    document.getElementById("country").innerText = country;
    document.getElementById("temp").innerText = temp + "°C";
    document.getElementById("humidity").innerHTML = humidity + HumidityStyle;
    document.getElementById("wind").innerHTML = wind + windStyle + windDirection;
    document.getElementById("cloud").innerHTML = cloud + cloudStyle;
}

let foggyDay =
    "<div id=\"foglayer_01\" class=\"fog\">\n" +
    "      <div class=\"image01\"></div>\n" +
    "      <div class=\"image02\"></div>\n" +
    "    </div>\n" +
    "      <div id=\"foglayer_02\" class=\"fog\">\n" +
    "        <div class=\"image01\"></div>\n" +
    "        <div class=\"image02\"></div>\n" +
    "      </div>\n" +
    "      <div id=\"foglayer_03\" class=\"fog\">\n" +
    "        <div class=\"image01\"></div>\n" +
    "        <div class=\"image02\"></div>\n" +
    "      </div>";

let sunnyDay =
    "      <div id=\"sky\">\n" +
    "        <div class=\"theSun\">\n" +
    "          <div class=\"ray_box\">\n" +
    "            <div class=\"ray ray1\"></div>\n" +
    "            <div class=\"ray ray2\"></div>\n" +
    "            <div class=\"ray ray3\"></div>\n" +
    "            <div class=\"ray ray4\"></div>\n" +
    "            <div class=\"ray ray5\"></div>\n" +
    "            <div class=\"ray ray6\"></div>\n" +
    "            <div class=\"ray ray7\"></div>\n" +
    "            <div class=\"ray ray8\"></div>\n" +
    "            <div class=\"ray ray9\"></div>\n" +
    "            <div class=\"ray ray10\"></div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"cloudwrapperTwo\">\n" +
    "          <div class=\"cloud c2\"></div>\n" +
    "        </div>\n" +
    "        <div class=\"cloudwrapperThree\">\n" +
    "          <div class=\"cloud c3\"></div>\n" +
    "        </div>\n" +
    "      </div>";

let cloudyDay =
    "      <div id=\"sky\">\n" +
    "        <div class=\"cloudwrapper01\">\n" +
    "           <div class=\"cloud c01\"></div>\n" +
    "       </div>\n" +
    "        <div class=\"cloudwrapper02\">\n" +
    "          <div class=\"cloud c02\"></div>\n" +
    "        </div>\n" +
    "        <div class=\"cloudwrapper03\">\n" +
    "          <div class=\"cloud c03\"></div>\n" +
    "        </div>\n" +
    "        <div class=\"cloudwrapper04\">\n" +
    "          <div class=\"cloud c04\"></div>\n" +
    "        </div>\n" +
    "      </div>";