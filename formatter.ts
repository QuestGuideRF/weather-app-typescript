import type { WeatherData, ForecastData } from "./api.js";
function condition(code:number):string {
  if(code===0)return "Ясно";
  if(code<=3)return "Облачно";
  if(code<=48)return "Туман";
  if(code<=67)return "Дождь";
  if(code<=77)return "Снег";
  if(code<=82)return "Ливни";
  if(code<=86)return "Снегопад";
  if(code>=95)return "Гроза";
  return "Переменная погода";
}
export function formatWeather(w:WeatherData):string {
 return `${w.city}: ${w.temperature} °C (${condition(w.code)})\nОщущается как ${w.feelsLike} °C · Влажность ${w.humidity}% · Ветер ${w.wind} км/ч`;
}
export function formatForecast(f:ForecastData):string {
 return [`Прогноз на 5 дней — ${f.city}`,...f.days.map(d=>`${d.date}: ${condition(d.code)}, ${d.min}…${d.max} °C, осадки ${d.precipitation}%`)].join("\n");
}
