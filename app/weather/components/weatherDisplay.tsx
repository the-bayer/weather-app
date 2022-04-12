import { BlitzPage, InferGetServerSidePropsType } from "blitz"
import { useEffect, useState } from "react"
import { z } from "zod"
import { weatherDataSchema } from "../validations"
import { Image } from "blitz"

// capitalize types and schema, move to validations file
type weatherDataType = z.infer<typeof weatherDataSchema>

interface AppProps {
  zipcode?: number
  changeLocation: Function
}

// npm install for degrees to cardinal directions
let d2d = require("degrees-to-direction")

export const WeatherDisplay = (props: AppProps) => {
  const [weatherData, setWeatherData] = useState<weatherDataType>()

  // // used while API was blocked
  // function getWeather() {
  //     const data = {
  //       coord: { lon: -0.13, lat: 51.51 },
  //       weather: [
  //         { id: 300, main: "Drizzle", description: "light intensity drizzle", icon: "09d" },
  //       ],
  //       base: "stations",
  //       main: { temp: 280.32, pressure: 1012, humidity: 81, temp_min: 279.15, temp_max: 281.15 },
  //       visibility: 10000,
  //       wind: { speed: 4.1, deg: 80 },
  //       clouds: { all: 90 },
  //       dt: 1485789600,
  //       sys: {
  //         type: 1,
  //         id: 5091,
  //         message: 0.0103,
  //         country: "GB",
  //         sunrise: 1485762037,
  //         sunset: 1485794875,
  //       },
  //       id: 2643743,
  //       name: "London",
  //       cod: 200,
  //     }
  //   setWeatherData(data);
  // }

  // make API call on server & blitz query
  // GOT instead of fetch - npm library to install (only works on server)
  // push to end of URL

  // calls openweather API based on props.zipcode and sets weatherData state
  useEffect(() => {
    async function getWeather() {
      if (!props.zipcode) return

      try {
        const endpoint: string =
          "https://api.openweathermap.org/data/2.5/weather?zip=" +
          props.zipcode +
          ",us&appid=5df99f8fca15b6e86983bb6236016583"
        const data = await fetch(endpoint).then((blob) => blob.json())
        setWeatherData(weatherDataSchema.parse(data))
      } catch (error: any) {
        console.log(error)
      }
    }
    getWeather()
  }, [props.zipcode])

  // raises location name from API reponse to search bar
  useEffect(() => {
    if (!weatherData) return
    props.changeLocation(weatherData.name)
  }, [weatherData, props])

  // for troubleshooting while building
  function handleClick() {
    if (!weatherData) return
    console.log(weatherData.main)
    console.log(weatherData)
  }

  const iconLoader = ({ src }: { src: string }) => {
    return `http://openweathermap.org/img/wn/${src}@2x.png`
  }

  return (
    // set first row of grid in cards as fixed height
    <>
      <div className="shadow-sm shadow-black p-1 m-1 border-4 border-slate-600 border-solid rounded-lg bg-slate-300 w-3/4 h-96 grid grid-cols-3 gap-x-4 p-5">
        {weatherData ? (
          <>
            <div
              id="weather-card"
              className="border-2 border-slate-700 rounded-xl shadow-md shadow-slate-700 grid place-items-center p-5 bg-slate-400"
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
              className="border-2 border-slate-700 shadow-md shadow-slate-700 rounded-xl grid place-items-center p-5 bg-slate-400"
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
              className="border-2 border-slate-700 shadow-md shadow-slate-700 rounded-xl grid place-items-center p-5 bg-slate-400"
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
              className="border-2 border-slate-700 rounded-xl shadow-md shadow-slate-700 grid place-items-center"
            ></div>
            <div
              id="temperature-card"
              className="border-2 border-slate-700 shadow-md shadow-slate-700 rounded-xl grid place-items-center"
            >
              <div>Loading...</div>
            </div>
            <div
              id="time-wind-card"
              className="border-2 border-slate-700 shadow-md shadow-slate-700 rounded-xl grid place-items-center"
            ></div>
          </>
        )}
      </div>
      <button onClick={handleClick}>Forecast</button>
    </>
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
