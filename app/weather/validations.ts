import { z } from "zod"

export const zipcode = z.string()

// schema throws error if array is fed into tuple
// export const weatherDataSchema = z.object({
//   main: z.object({
//     temp: z.number(),
//     temp_min: z.number(),
//     temp_max: z.number(),
//   }),
//   sys: z.object({
//     sunrise: z.number(),
//     sunset: z.number(),
//   }),
//   weather: z.array(
//     z.object({
//       main: z.string(),
//       description: z.string(),
//       icon: z.string(),
//     }),
//   ).length(1),
//   wind: z.object({
//     speed: z.number(),
//     deg: z.number(),
//   }),
//   name: z.string(),
// })

export const weatherDataSchema = z.object({
  main: z.object({
    temp: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
  }),
  sys: z.object({
    sunrise: z.number(),
    sunset: z.number(),
  }),
  weather: z.tuple([
    z.object({
      main: z.string(),
      description: z.string(),
      icon: z.string(),
    }),
  ]),
  wind: z.object({
    speed: z.number(),
    deg: z.number(),
  }),
  name: z.string(),
})

//  const data = {
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
