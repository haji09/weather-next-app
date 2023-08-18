# NextJs Weather Forecast website overview
  - Tech : NextJs
  - UI : Tailwind CSS
  - API : OpenWeatherApi
  - Deploy : GitHub, Vercel

## Clone repo
  ```
  $ git clone git@github.com:haji09/weather-next-app.git
  $ cd weather-next-app
  ```

1. Create Next App
   ```
   npx create-next-app@latest
   ```
2. Run Locally
   `npm run dev`

3. Create components
   - CurrentLocation
   - Forecast
   - WeatherData
   - apiKeys

4. Add components to `pages/index.jsx`

5. Login to [OpenWeatherApi](https://openweathermap.org/current) site and generate api

6. In CurrentLocation
   - Displays the current location weather condition
   - Add api to fetch location and details
   - Add Tailwind classes

7. In Forecast
   - Displays any entered city weather details
   - Add api to fetch details
   - Add Tailwind classes

8. Deploy on GitHub, Vercel
