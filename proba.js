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
            var jelenimg = document.getElementById("jelenimg");    
            if (jelenido == 1)  {
                document.getElementById("jelenido").innerHTML = " derült";
                jelenido.classList.remove("wi-day-sunny");
                jelenimg.classList.add("wi-day-sunny");
            }else if (jelenido == 2) {
                document.getElementById("jelenido").innerHTML = " kissé felhős";
                jelenimg.classList.remove("wi-day-sunny");
                jelenimg.classList.add("wi-day-sunny-overcast");
            }else if (jelenido == 3) {
                document.getElementById("jelenido").innerHTML =  " közepesen felhős";
                jelenimg.classList.remove("wi-day-sunny");
                jelenimg.classList.add("wi-day-cloudy");
            }else if (jelenido == 4) {
                document.getElementById("jelenido").innerHTML = " erősen felhős";
                jelenimg.classList.remove("wi-day-sunny");
                jelenimg.classList.add("wi-cloud");
            }else if (jelenido == 5) {
                document.getElementById("jelenido").innerHTML = " borult";
                jelenimg.classList.add("wi-cloudy");
            }else if (jelenido == 6) {
                document.getElementById("jelenido").innerHTML = " fátyolfelhős";
                jelenimg.classList.remove("wi-day-sunny");
                jelenimg.classList.add("wi-day-light-wind");
            }else if (jelenido == 7) {
                document.getElementById("jelenido").innerHTML = " ködös";
                jelenimg.classList.remove("wi-day-sunny");
                jelenimg.classList.add("wi-fog");
            }else if (jelenido == 9) {
                document.getElementById("jelenido").innerHTML = " derült, párás";
                jelenimg.classList.remove("wi-day-sunny");
                jelenimg.classList.add("wi-day-haze");
            }else if (jelenido == 10) {
                document.getElementById("jelenido").innerHTML = " közepesen felhős, párás";
                jelenimg.classList.remove("wi-day-sunny");
                jelenimg.classList.add("wi-day-fog");
            }else if (jelenido == 11) {
                document.getElementById("jelenido").innerHTML = " borult, párás";
                jelenimg.classList.remove("wi-day-sunny");
                jelenimg.classList.add("wi-cloudy-windy");
            }else if (jelenido == 12) {
                document.getElementById("jelenido").innerHTML = " erősen fátyolfelsős";
                jelenimg.classList.remove("wi-day-sunny");
                jelenimg.classList.add("wi-windy");
            }else if (jelenido == 101) {
                document.getElementById("jelenido").innerHTML = " szitálás";
                jelenimg.classList.remove("wi-day-sunny");
                jelenimg.classList.add("wi-day-sleet");
            }else if (jelenido == 102) {
                document.getElementById("jelenido").innerHTML = " eső";
                jelenimg.classList.remove("wi-day-sunny");
                jelenimg.classList.add("wi-day-rain");
            }else if (jelenido == 103) {
                document.getElementById("jelenido").innerHTML = " zápor",
                jelenimg.classList.remove("wi-day-sunny");
                jelenimg.classList.add("wi-day-shower");
            }else if (jelenido == 104) {
                document.getElementById("jelenido").innerHTML = " zivatar esővel";
                jelenimg.classList.remove("wi-day-sunny");
                jelenimg.classList.add("wi-day-thunderstorm");
            }else if (jelenido == 105) {
                document.getElementById("jelenido").innerHTML = " ónos szitálás";
                jelenimg.classList.remove("wi-day-sunny");
                jelenimg.classList.add("wi-day-sleet");
            }else if (jelenido == 106) {
                document.getElementById("jelenido").innerHTML = " ónos eső";
                jelenimg.classList.remove("wi-day-sunny");
                jelenimg.classList.add("wi-day-sprinkle");
            }else if (jelenido == 107) {
                document.getElementById("jelenido").innerHTML = " hószállingózás";
                jelenimg.classList.remove("wi-day-sunny");
                jelenimg.classList.add("wi-day-snow");
            }else if (jelenido == 108) {
                document.getElementById("jelenido").innerHTML =" havazás";
                jelenimg.classList.remove("wi-day-sunny");
                jelenimg.classList.add("wi-snow");
            }else if (jelenido == 109) {
                document.getElementById("jelenido").innerHTML =" hózápor";
                jelenimg.classList.remove("wi-day-sunny");
                jelenimg.classList.add("wi-snow-wind");
            }else if (jelenido == 110) {
                document.getElementById("jelenido").innerHTML = " havaseső";
                jelenimg.classList.remove("wi-day-sunny");
                jelenimg.classList.add("wi-rain-mix");
            }else if (jelenido == 112) {
                document.getElementById("jelenido").innerHTML =" hózivatar";
                jelenimg.classList.remove("wi-day-sunny");
                jelenimg.classList.add("wi-storm-showers");
            }else if (jelenido == 202) {
                document.getElementById("jelenido").innerHTML =" erős eső";
                jelenimg.classList.remove("wi-day-sunny");
                jelenimg.classList.add("wi-rain");
            }else if (jelenido == 203) {
                document.getElementById("jelenido").innerHTML =" erős zápor";
                jelenimg.classList.remove("wi-day-sunny");
                jelenimg.classList.add("wi-rain-wind");
            }else if (jelenido == 208) {
                document.getElementById("jelenido").innerHTML =" erős havazás";
                jelenimg.classList.remove("wi-day-sunny");
                jelenimg.classList.add("wi-snow-wind");
            }else if (jelenido == 209) {
                document.getElementById("jelenido").innerHTML = " erős hózápor";
                jelenimg.classList.remove("wi-day-sunny");
                jelenimg.classList.add("wi-snow-wind");
            }else if (jelenido == 304) {
                document.getElementById("jelenido").innerHTML =" zivatar záporral";
                jelenimg.classList.remove("wi-day-sunny");
                jelenimg.classList.add("wi-storm-showers");
            }else if (jelenido == 310) {
                document.getElementById("jelenido").innerHTML =" havaeső zápor";
                jelenimg.classList.remove("wi-day-sunny");
                jelenimg.classList.add("wi-rain-mix");
            }else if (jelenido == 500) {
                document.getElementById("jelenido").innerHTML =" hófúvás";
                jelenimg.classList.remove("wi-day-sunny");
                jelenimg.classList.add("wi-sandstorm");
            }else if (jelenido == 600) {
                document.getElementById("jelenido").innerHTML =" jégeső";
                jelenimg.classList.remove("wi-day-sunny");
                jelenimg.classList.add("wi-hail");
            }else if (jelenido == 601) {
                document.getElementById("jelenido").innerHTML = " dörgés";
                jelenimg.classList.remove("wi-day-sunny");
                jelenimg.classList.add ("wi-lightning");
            }else {
                document.getElementById("jelenido").innerHTML = " NO DATA";
                jelenimg.classList.remove("wi-day-sunny");
                jelenimg.classList.add("wi-na");
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
       