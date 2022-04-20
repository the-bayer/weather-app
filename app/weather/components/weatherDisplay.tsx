import { useRouter } from "blitz"
import { useEffect, useState } from "react"
import { z } from "zod"
import { weatherDataSchema } from "../validations"
import { Image } from "blitz"

// object possible undefined after changing schema from tuple to array
// ternary operator should safeguard against this?? idk
type weatherDataType = z.infer<typeof weatherDataSchema>

interface AppProps {
  zipcode?: string
  changeLocation: Function
}

// npm install for degrees to cardinal directions
let d2d = require("degrees-to-direction")

export const WeatherDisplay = (props: AppProps) => {
  const [weatherData, setWeatherData] = useState<weatherDataType>()
  const router = useRouter()
  // make API call on server

  // calls openweather API based on zipcode query and sets weatherData state
  useEffect(() => {
    async function getWeather() {
      if (!router.query.zipcode) return
      try {
        const endpoint: string =
          "https://api.openweathermap.org/data/2.5/weather?zip=" +
          String(router.query.zipcode) +
          ",us&appid=5df99f8fca15b6e86983bb6236016583"

        const data = await fetch(endpoint).then((blob) => blob.json())
        setWeatherData(weatherDataSchema.parse(data))
      } catch (error: any) {
        alert(error)
      }
    }
    getWeather()
  }, [router.query.zipcode])

  // raises location name from API reponse to search bar
  useEffect(() => {
    if (!weatherData) return
    props.changeLocation(weatherData.name)
  }, [weatherData, props])

  const iconLoader = ({ src }: { src: string }) => {
    return `http://openweathermap.org/img/wn/${src}@2x.png`
  }

  return (
    // set first row of grid in cards as fixed height
    <div className="shadow-sm shadow-black p-1 m-1 border-4 border-slate-600 border-solid rounded-lg bg-slate-300 w-full w-min-content md:h-full md:grid md:grid-cols-3 md:gap-x-4 p-5 flex flex-col h-max-content">
      {weatherData ? (
        <>
          <div
            id="weather-card"
            className="border-2 border-slate-700 rounded-xl shadow-md shadow-slate-700 grid place-items-center p-5 bg-slate-400 mb-4 md:mb-0"
          >
            <div className="text-xl font-bold underline">Weather</div>
            <div>
              <div>Current Conditions:</div>
              <div className="text-center">{weatherData.weather[0].main}</div>
            </div>
            <div>
              <div>Condition Details:</div>
              <div className="text-center capitalize">{weatherData.weather[0].description}</div>
            </div>
            {/* set Image unoptimized property*/}
            <Image
              loader={iconLoader}
              src={weatherData.weather[0].icon}
              alt="icon displaying current weather"
              width={60}
              height={60}
            />
          </div>
          <div
            id="temperature-card"
            className="border-2 border-slate-700 shadow-md shadow-slate-700 rounded-xl grid place-items-center p-5 bg-slate-400 mb-4 md:mb-0"
          >
            <div className="text-xl font-bold underline">Temperature</div>
            <div>
              <div>Current Temperature:</div>
              <div className="text-center">{convertTemp(weatherData.main.temp)}° F</div>
            </div>
            <div>
              <div>Temperature High:</div>
              <div className="text-center">{convertTemp(weatherData.main.temp_max)}° F</div>
            </div>
            <div>
              <div>Temperature Low:</div>{" "}
              <div className="text-center">{convertTemp(weatherData.main.temp_min)}° F</div>
            </div>
          </div>
          <div
            id="time-wind-card"
            className="border-2 border-slate-700 shadow-md shadow-slate-700 rounded-xl grid place-items-center p-5 bg-slate-400 "
          >
            <div className="text-xl font-bold underline text-center">Sunrise/Sunset & Wind</div>
            <div>
              <div className="text-center">Today&apos;s Sunrise at:</div>
              <div className="text-center">{convertDate(weatherData.sys.sunrise)}</div>
            </div>
            <div>
              <div className="text-center">Today&apos;s Sunset at:</div>
              <div className="text-center">{convertDate(weatherData.sys.sunset)}</div>
            </div>
            <div className="text-center">
              <div>Wind:</div>
              <div className="text-center">
                {convertMPS(weatherData.wind.speed)} MPH from the {d2d(weatherData.wind.deg)}
              </div>
            </div>
          </div>
        </>
      ) : (
        // ternary operator loading screen
        <>
          <div
            id="weather-card"
            className="border-2 border-slate-700 rounded-xl shadow-md shadow-slate-700 grid place-items-center h-28 mb-2"
          ></div>
          <div
            id="temperature-card"
            className="border-2 border-slate-700 shadow-md shadow-slate-700 rounded-xl grid place-items-center h-28 mb-2"
          >
            <div>Loading...</div>
          </div>
          <div
            id="time-wind-card"
            className="border-2 border-slate-700 shadow-md shadow-slate-700 rounded-xl grid place-items-center h-28"
          ></div>
        </>
      )}
    </div>
  )
}

// put these in useMemo
// & add conversion in Zod Schema

// converts kelvin temp to farenheit
function convertTemp(temp: number) {
  return Math.round(1.8 * (temp - 273) + 32)
}

// converts unix date from weatherData to date string
function convertDate(unixDate: number) {
  let date = new Date(unixDate * 1000)
  if (date.getHours() > 12) {
    return [date.getHours() - 12, ":", ("0" + date.getMinutes()).slice(-2), " PM"].join("")
  }
  return [("0" + date.getHours()).slice(-2), ":", ("0" + date.getMinutes()).slice(-2), " AM"].join(
    ""
  )
}

// converts meters/second to MPH
function convertMPS(speed: number) {
  return Math.round(speed * 2.2369)
}

export default WeatherDisplay
