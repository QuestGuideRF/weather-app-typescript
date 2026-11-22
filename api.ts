export interface WeatherData { city: string; temperature: number; feelsLike: number; humidity: number; wind: number; code: number; }
export interface ForecastDay { date: string; min: number; max: number; precipitation: number; code: number; }
export interface ForecastData { city: string; days: ForecastDay[]; }
async function json(url: string): Promise<any> {
  const response = await fetch(url, {signal: AbortSignal.timeout(12000)});
  if (!response.ok) throw new Error(`Weather service returned HTTP ${response.status}`);
  return response.json();
}
async function place(city: string) {
  const data = await json(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=ru&format=json`);
  const found = data.results?.[0];
  if (!found) throw new Error(`Город «${city}» не найден`);
  return found as {latitude:number;longitude:number;name:string;country?:string};
}
export async function getWeather(city: string): Promise<WeatherData> {
  const p = await place(city);
  const d = await json(`https://api.open-meteo.com/v1/forecast?latitude=${p.latitude}&longitude=${p.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`);
  if (!d.current) throw new Error("Погодные данные недоступны");
  return {city:`${p.name}, ${p.country || ""}`.trim(),temperature:d.current.temperature_2m,feelsLike:d.current.apparent_temperature,humidity:d.current.relative_humidity_2m,wind:d.current.wind_speed_10m,code:d.current.weather_code};
}
export async function getForecast(city: string): Promise<ForecastData> {
  const p=await place(city);
  const d=await json(`https://api.open-meteo.com/v1/forecast?latitude=${p.latitude}&longitude=${p.longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code&timezone=auto&forecast_days=5`);
  if(!d.daily?.time) throw new Error("Прогноз недоступен");
  return {city:`${p.name}, ${p.country || ""}`.trim(),days:d.daily.time.map((date:string,i:number)=>({date,min:d.daily.temperature_2m_min[i],max:d.daily.temperature_2m_max[i],precipitation:d.daily.precipitation_probability_max[i]??0,code:d.daily.weather_code[i]}))};
}
