import { BlitzPage, InferGetServerSidePropsType } from "blitz"
import { useEffect, useState } from "react"

export const WeatherDisplay = (props: { zipcode: number | undefined }) => {
  const [weatherData, setWeatherData] = useState<object>()

  useEffect(() => {
    async function getWeather() {
      try {
        const endpoint: string =
          "https://api.openweathermap.org/data/2.5/weather?zip=" +
          props.zipcode +
          ",us&appid=5c9d69ead56b42af3ab944f7b47f289f"
        const res = await fetch(endpoint)
        const data = await res.json()
        setWeatherData(data)
      } catch (error: any) {
        console.log(error)
      }
    }
    getWeather()
  }, [props.zipcode, weatherData, setWeatherData])

  function handleClick() {
    console.log(weatherData)
  }

  return (
    <>
      <div className="shadow-sm shadow-black p-1 m-1 border-2 border-slate-400 rounded bg-slate-400 w-3/4 h-96 flex items-center justify-center">
        WeatherDisplay
      </div>
      <button onClick={handleClick}>Forecast</button>
    </>
  )
}

export default WeatherDisplay
