let $ = document

const hour = $.querySelector('.hour')
const minute = $.querySelector('.minute')
const inputSearch = $.querySelector('.input-search')
const searchBtn = $.querySelector('.search-btn')
const maxTemp = $.querySelector('.max-temp')
const minTemp = $.querySelector('.min-temp')
const humidity = $.querySelector('.humidity')
const wind = $.querySelector('.wind')
const deg = $.querySelector('.deg')
const iconWeather = $.querySelector('.icon-weather')
const mainTemp = $.querySelector('.main-temp')
const feelTemp = $.querySelector('.feel')
const information = $.querySelector('.infomation')
const city = $.querySelector('.city')
const country = $.querySelector('.country')
const hoursunrice = $.querySelector('.hoursunrice')
const minutesunrise = $.querySelector('.minutesunrise')
const hoursunset = $.querySelector('.hoursunset')
const minutesunset = $.querySelector('.minutesunset')

const key = '5ed0918a47f728041754f5a9534d38ce'

let cityName = 'Windsor'

getWeatherAPI(cityName)

setInterval(function () {

    let date = new Date()

    let hourDate = date.getHours()
    let minuteDate = date.getMinutes()

    hour.innerHTML = hourDate + ' '
    minute.innerHTML = ' ' + minuteDate

    if (hourDate < 10) {
        hour.innerHTML = '0' + hourDate + ' '
    }
    if (minuteDate < 10) {
        hour.innerHTML = ' ' + '0' + minuteDate
    }
}, 1000)


function getInfo(city) {
    getWeatherAPI(city)
}

async function getWeatherAPI(city) {
    let weatherInfo = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`))
        .json()
    try {
        setInformation(weatherInfo)
    } catch (err) {
        city.innerHTML = 'Tehran'
        getWeatherAPI(cityName)
        swal("Wrong Value!", "Please Enter the correct value" , 'warning');
    }
}

function setInformation(data) {
    city.innerHTML = data['name']
    country.innerHTML = data['sys'].country + ' ,'
    information.innerHTML = data['weather'][0].description
    humidity.innerHTML = data['main'].humidity + ' %'
    wind.innerHTML = data['wind'].speed + ' Km/h'

    let degre_wind = data['wind'].deg
    deg.style.transform = 'rotate(' + degre_wind + 'deg' + ')'

    let tempConvertor = data['main'].temp
    mainTemp.innerHTML = convertorTemp(tempConvertor).toFixed(1) + ' °C'

    let feelTempConvert = data['main'].feels_like
    // send Temp To convertTemp Function
    feelTemp.innerHTML = convertorTemp(feelTempConvert).toFixed(1) + ' °C'

    let maxTempconvertor = data['main'].temp_max
    let minTempconvertor = data['main'].temp_min
    // send Temp To convertTemp Function
    maxTemp.innerHTML = convertorTemp(maxTempconvertor).toFixed(1)
    minTemp.innerHTML = convertorTemp(minTempconvertor).toFixed(1)

    let icon = data['weather'][0].icon
    iconWeather.setAttribute('src', `http://openweathermap.org/img/wn/${icon}@2x.png`)

    let sunrisecalc = data['sys'].sunrise
    let sunsetcalc = data['sys'].sunset

    // get and convert Sunrise and Sunset Time 
    let gethoursunrise = new Date(sunrisecalc * 1000)
    let gethoursunset = new Date(sunsetcalc * 1000)

    let sunrisehourValue = gethoursunrise.getHours()
    let sunriseminValue = gethoursunrise.getMinutes()
    let sunsetehourValue = gethoursunset.getHours()
    let sunsetminValue = gethoursunset.getMinutes()

    hoursunrice.innerHTML = sunrisehourValue
    minutesunrise.innerHTML = sunriseminValue
    hoursunset.innerHTML = sunsetehourValue
    minutesunset.innerHTML = sunsetminValue

    if (sunrisehourValue < 10) {
        hoursunrice.innerHTML = '0' + sunrisehourValue
    }
    if (sunriseminValue < 10) {
        minutesunrise.innerHTML = '0' + sunriseminValue
    }
    if (sunsetehourValue < 10) {
        hoursunset.innerHTML = '0' + sunsetehourValue
    }
    if (sunsetminValue < 10) {
        minutesunset.innerHTML = '0' + sunsetminValue
    }
}

//conert Temp
function convertorTemp(temp) {
    return temp - 273
}

searchBtn.addEventListener('click', function () {
    let inputValue = inputSearch.value

    if (inputValue) {
        getInfo(inputValue)
    } else {
        swal("Please Enter The City");
    }

    inputSearch.value = ''
})

inputSearch.addEventListener('keydown', function (event) {

    let inputValue = inputSearch.value

    if (event.key === 'Enter') {
        event.preventDefault()

        if (inputValue) {
            getInfo(inputValue)
            inputSearch.value = ''

        } else {
            swal("Please Enter The City");
        }
    }
})

getWeatherAPI(cityName)