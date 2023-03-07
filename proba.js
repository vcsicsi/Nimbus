var zip = new JSZip();
var zip2 = new JSZip();
const code = 44505,
      code2 = 44527;

let url= 'http://terkeptar.elte.hu/~saman/get.php?url=https://odp.met.hu/climate/observations_hungary/10_minutes/now/HABP_10M_'+code+'_now.zip';    
let url2= 'http://terkeptar.elte.hu/~saman/get.php?url=https://odp.met.hu/climate/observations_hungary/hourly/now/HABP_1H_'+code2+'_now.zip';    

fetch(url)
.then(r=>r.arrayBuffer())
                .then(d=>zip.loadAsync(d))
                    .then(z=>z.file(/./)[0].async("text"))
                        .then(d=>{
                            let sorok=d.split('\n'); 
                        
                            var ta = document.getElementById("ta");
                            var tas = document.createTextNode(sorok[sorok.length-2].split(";")[4]+" °C");
                            ta.innerHTML = '';
                            ta.appendChild(tas);

                            var fs = document.getElementById("fs");
                            var fas = document.createTextNode(sorok[sorok.length-2].split(";")[24]+" m/s");
                            fs.innerHTML = '';
                            fs.appendChild(fas);

                            var fsd = document.getElementById("fsd");
                            var fsds = document.createTextNode(sorok[sorok.length-2].split(";")[26]+" °");
                            fsd.innerHTML = '';
                            fsd.appendChild(fsds);

                            var fx = document.getElementById("fx");
                            var fxs = document.createTextNode(sorok[sorok.length-2].split(";")[28]+" m/s");
                            fx.innerHTML = '';
                            fx.appendChild(fxs);

                            var p = document.getElementById("p");
                            var ps = document.createTextNode(sorok[sorok.length-2].split(";")[14]+" hpa");
                            p.innerHTML = '';
                            p.appendChild(ps);  

                            //sunset times
                            var sr = document.getElementById("sunrise");
                            var ss = document.getElementById("sunset");
                            // get today's sunlight times for station
                            var times = SunCalc.getTimes(new Date(), 47.4747, 19.0619);
                            // format sunrise time from the Date object
                            var sunriseStr = times.sunrise.getHours() + ':' + times.sunrise.getMinutes();
                            var sunsetStr  = times.sunset.getHours() + ':' + times.sunset.getMinutes();

                            var textrise = document.createTextNode(sunriseStr);
                            var textset = document.createTextNode(sunsetStr);
                            sr.innerHTML = '';
                            ss.innerHTML = '';
                            sr.appendChild(textrise);
                            ss.appendChild(textset);

                        });

fetch(url2)
.then(r=>r.arrayBuffer())
.then(d=>zip2.loadAsync(d))
.then(z=>z.file(/./)[0].async("text"))
    .then(d=>{
            let sorok=d.split('\n');
            for (let i=7;i<sorok.length;i++) {
                let adatok=sorok[i].split(';');
                for (let j in adatok) {
                    adatok[j]=adatok[j].trim()}
                if (adatok.length<2) continue; 
            };
            var jelenido = sorok[sorok.length-2].split(";")[34];
            console.log(jelenido);                                   
            if (jelenido == 1)  {
                document.getElementById("jelenido").innerHTML = " derült";
                document.getElementById("jelenimg").src = "weather-icons-master/svg/wi-day-sunny.svg";
            }else if (jelenido == 2) {
                document.getElementById("jelenido").innerHTML = " kissé felhős";
                document.getElementById("jelenimg").src = "weather-icons-master/svg/wi-day-sunny-overcast.svg";
            }else if (jelenido == 3) {
                document.getElementById("jelenido").innerHTML =  " közepesen felhős";
                document.getElementById("jelenimg").src = "weather-icons-master/svg/wi-day-cloudy.svg";
            }else if (jelenido == 4) {
                document.getElementById("jelenido").innerHTML = " erősen felhős";
                document.getElementById("jelenimg").src = "weather-icons-master/svg/wi-cloud.svg";
            }else if (jelenido == 5) {
                document.getElementById("jelenido").innerHTML = " borult";
                document.getElementById("jelenimg").src = "weather-icons-master/svg/wi-cloudy.svg";
            }else if (jelenido == 6) {
                document.getElementById("jelenido").innerHTML = " fátyolfelhős";
                document.getElementById("jelenimg").src = "weather-icons-master/svg/wi-day-light-wind.svg";
            }else if (jelenido == 7) {
                document.getElementById("jelenido").innerHTML = " ködös";
                document.getElementById("jelenimg").src = "weather-icons-master/svg/wi-fog.svg";
            }else if (jelenido == 9) {
                document.getElementById("jelenido").innerHTML = " derült, párás";
                document.getElementById("jelenimg").src = "weather-icons-master/svg/wi-day-haze.svg";
            }else if (jelenido == 10) {
                document.getElementById("jelenido").innerHTML = " közepesen felhős, párás";
                document.getElementById("jelenimg").src = "weather-icons-master/svg/wi-day-fog.svg";
            }else if (jelenido == 11) {
                document.getElementById("jelenido").innerHTML = " borult, párás";
                document.getElementById("jelenimg").src = "weather-icons-master/svg/wi-cloudy-windy.svg";
            }else if (jelenido == 12) {
                document.getElementById("jelenido").innerHTML = " erősen fátyolfelsős";
                document.getElementById("jelenimg").src = "weather-icons-master/svg/wi-windy.svg";
            }else if (jelenido == 101) {
                document.getElementById("jelenido").innerHTML = " szitálás";
                document.getElementById("jelenimg").src = "";
            }else if (jelenido == 102) {
                document.getElementById("jelenido").innerHTML = " eső";
                document.getElementById("jelenimg").src = "weather-icons-master/svg/wi-day-rain.svg";
            }else if (jelenido == 103) {
                document.getElementById("jelenido").innerHTML = " zápor",
                document.getElementById("jelenimg").src = "weather-icons-master/svg/wi-day-shower.svg";
            }else if (jelenido == 104) {
                document.getElementById("jelenido").innerHTML = " zivatar esővel";
                document.getElementById("jelenimg").src = "weather-icons-master/svg/wi-day-thunderstorm.svg";
            }else if (jelenido == 105) {
                document.getElementById("jelenido").innerHTML = " ónos szitálás";
                document.getElementById("jelenimg").src = "weather-icons-master/svg/wi-day-sleet.svg";
            }else if (jelenido == 106) {
                document.getElementById("jelenido").innerHTML = " ónos eső";
                document.getElementById("jelenimg").src = "weather-icons-master/svg/wi-day-sprinkle.svg";
            }else if (jelenido == 107) {
                document.getElementById("jelenido").innerHTML = " hószállingózás";
                document.getElementById("jelenimg").src = "weather-icons-master/svg/wi-day-snow.svg";
            }else if (jelenido == 108) {
                document.getElementById("jelenido").innerHTML =" havazás";
                document.getElementById("jelenimg").src = "weather-icons-master/svg/wi-snow.svg";
            }else if (jelenido == 109) {
                document.getElementById("jelenido").innerHTML =" hózápor";
                document.getElementById("jelenimg").src = "weather-icons-master/svg/wi-snow-wind.svg";
            }else if (jelenido == 110) {
                document.getElementById("jelenido").innerHTML = " havaseső";
                document.getElementById("jelenimg").src = "weather-icons-master/svg/wi-rain-mix.svg";
            }else if (jelenido == 112) {
                document.getElementById("jelenido").innerHTML =" hózivatar";
                document.getElementById("jelenimg").src = "weather-icons-master/svg/wi-storm-showers.svg";
            }else if (jelenido == 202) {
                document.getElementById("jelenido").innerHTML =" erős eső";
                document.getElementById("jelenimg").src = "weather-icons-master/svg/wi-rain.svg";
            }else if (jelenido == 203) {
                document.getElementById("jelenido").innerHTML =" erős zápor";
                document.getElementById("jelenimg").src = "weather-icons-master/svg/wi-rain-wind.svg";
            }else if (jelenido == 208) {
                document.getElementById("jelenido").innerHTML =" erős havazás";
                document.getElementById("jelenimg").src = "weather-icons-master/svg/wi-snow-wind.svg";
            }else if (jelenido == 209) {
                document.getElementById("jelenido").innerHTML = " erős hózápor";
                document.getElementById("jelenimg").src = "weather-icons-master/svg/wi-snow-wind.svg";
            }else if (jelenido == 304) {
                document.getElementById("jelenido").innerHTML =" zivatar záporral";
                document.getElementById("jelenimg").src = "weather-icons-master/svg/wi-storm-showers.svg";
            }else if (jelenido == 310) {
                document.getElementById("jelenido").innerHTML =" havaeső zápor";
                document.getElementById("jelenimg").src = "weather-icons-master/svg/wi-rain-mix.svg";
            }else if (jelenido == 500) {
                document.getElementById("jelenido").innerHTML =" hófúvás";
                document.getElementById("jelenimg").src = "weather-icons-master/svg/wi-sandstorm.svg";
            }else if (jelenido == 600) {
                document.getElementById("jelenido").innerHTML =" jégeső";
                document.getElementById("jelenimg").src = "weather-icons-master/svg/wi-hail.svg";
            }else if (jelenido == 601) {
                document.getElementById("jelenido").innerHTML = " dörgés";
                document.getElementById("jelenimg").src = "weather-icons-master/svg/wi-lightning.svg";
            }else {
                document.getElementById("jelenido").innerHTML = " NO DATA";
                document.getElementById("jelenimg").src = "weather-icons-master/svg/wi-na.svg";
            }
        });

// ----------------------------------- Mooon ----------------------------------------------------------------------

 //Moon %
function moonphase( date ) {
    date.setTime( date.getTime() + date.getTimezoneOffset() * 60000 );
   var  bluemoon = new Date( 96, 1, 3, 16, 15, 0 ),
        lunarperiod = 29 * ( 24 * 3600 * 1000 ) + 12 * ( 3600 * 1000 ) + 44.05 * ( 60 * 1000 ),
        phasetime = ( date.getTime() - bluemoon.getTime() ) % lunarperiod,
        fraction = phasetime / lunarperiod,
        percent = Math.round( 200 * fraction ) % 100;
     return(percent);
     
};

//Moon picture
const getJulianDate = (date = new Date()) => {
    const time = date.getTime();
    const tzoffset = date.getTimezoneOffset()
    return (time / 86400000) - (tzoffset / 1440) + 2440587.5;
  };

const LUNAR_MONTH = 29.530588853;
const getLunarAge = (date = new Date()) => {
    const percent = getLunarAgePercent(date);
    const age = percent * LUNAR_MONTH;
    return age;
  };
const getLunarAgePercent = (date = new Date()) => {
    return normalize((getJulianDate(date) - 2451550.1) / LUNAR_MONTH);
  };
const normalize = value => {
    value = value - Math.floor(value);
    if (value < 0)
      value = value + 1
    return value;
  } ; 

var age = getLunarAge(new Date());
var moon = document.getElementById("moon");
var calc = document.createTextNode(moonphase(new Date())+"%");
moon.appendChild(calc);

var moonimg = document.getElementById("moonimg");
if (age < 1.84566) {
    //New
    moonimg.classList.remove("wi-day-sunny");
    moonimg.classList.add("wi-moon-new");
} else if (age <5.53699 ) {
    //Waxing Crescent
    moonimg.classList.remove("wi-day-sunny");
    moonimg.classList.add("wi-moon-waxing-crescent-3"); 
} else if (age< 9.22831   ) {
    //First Quarter
    moonimg.classList.remove("wi-day-sunny");
    moonimg.classList.add("wi-moon-first-quarter");
} else if (age < 12.91963  ) {
    //Waxing Gibbous
    moonimg.classList.remove("wi-day-sunny");
    moonimg.classList.add("wi-moon-waxing-gibbous-3");
} else if (age < 16.61096  ) {
    //Full
    moonimg.classList.remove("wi-day-sunny");
    moonimg.classList.add("wi-moon-full");
} else if (age < 20.30228  ) {
    //Waning Gibbous
    moonimg.classList.remove("wi-day-sunny");
    moonimg.classList.add("wi-moon-waning-gibbous-3"); 
} else if (age < 23.99361  ) {
    //Last Quarter
    moonimg.classList.remove("wi-day-sunny");
    moonimg.classList.add("wi-moon-third-quarter"); 
} else if (age < 27.68493  ) {
    //Waning Crescent
    moonimg.classList.remove("wi-day-sunny");
    moonimg.classList.add("wi-moon-waning-crescent-3");
} else {
    //New
    moonimg.classList.remove("wi-day-sunny");
    moonimg.classList.add("wi-moon-new");
};
       