import { BlitzPage, InferGetServerSidePropsType } from "blitz"
import { useEffect, useState } from "react"
import { z } from "zod"
import { weatherDataSchema } from "../validations"
import { Image } from "blitz"

// correct way to create schema / type??
type weatherDataType = z.infer<typeof weatherDataSchema>

// interface weatherDataType {
//   main: {
//     temp: number,
//     temp_min: number,
//     temp_max: number,
//   },
//   sys: {
//     sunrise: number,
//     sunset: number,
//   },
//   weather: [
//     {
//       main: string,
//       description: string,
//       icon: string,
//     },
//   ],
//   wind: {
//     speed: number,
//     deg: number,
//   },
// }

interface AppProps {
  zipcode?: number
  changeLocation: Function
}

// need help setting type of state
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

  // would pull convertTemp & convertDate into useMemo if expensive
  // converts kelvin temp to farenheight
  function convertTemp(temp: number) {
    return Math.round(1.8 * (temp - 273) + 32)
  }

  // converts unix date from weatherData to date string
  function convertDate(unixDate: number) {
    return new Date(unixDate * 1000)
  }

  useEffect(() => {
    if (!weatherData) return
    props.changeLocation(weatherData.name)
  }, [weatherData, props])

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

  // for troubleshooting while building
  function handleClick() {
    if (!weatherData) return
    console.log(weatherData.main)
    console.log(weatherData)
  }

  const iconLoader = ({ src }: { src: string }) => {
    return `http://openweathermap.org/img/wn/${src}@2x.png`
  }

  // const imgURL = "http://openweathermap.org/img/wn/10d@2x.png"

  return (
    // will create weather cards & format values
    <>
      <div className="shadow-sm shadow-black p-1 m-1 border-2 border-slate-400 rounded bg-slate-400 w-3/4 h-96 flex items-center justify-center">
        {weatherData ? (
          <>
            <div id="weather-card">
              <div>Weather</div>
              <div>{weatherData.weather[0].main}</div>
              <div>{weatherData.weather[0].description}</div>
              <Image
                loader={iconLoader}
                src={weatherData.weather[0].icon}
                alt="icon displaying current weather"
                width={40}
                height={40}
              />
            </div>
            <div id="temperature-card">
              <div>Temperature</div>
              <div> {convertTemp(weatherData.main.temp)}</div>
              <div> {convertTemp(weatherData.main.temp_max)}</div>
              <div> {convertTemp(weatherData.main.temp_min)}</div>
            </div>
            <div id="time-wind-card">
              <div>Misc</div>
              <div>{weatherData.sys.sunrise}</div>
              <div>{weatherData.sys.sunset}</div>
              <div>
                {" "}
                {weatherData.wind.deg} and {weatherData.wind.speed}
              </div>
            </div>
          </>
        ) : (
          // ternary operator loading screen
          <div>Loading...</div>
        )}
      </div>
      <button onClick={handleClick}>Forecast</button>
    </>
  )
}

export default WeatherDisplay
