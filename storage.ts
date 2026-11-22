import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
const filename=join(homedir(),".weather-app-typescript-favorites.json");
export function getFavorites():string[] {
 try {const x:unknown=JSON.parse(readFileSync(filename,"utf8"));return Array.isArray(x)?x.filter((v):v is string=>typeof v==="string"):[];} catch(e:any){if(e?.code==="ENOENT" || e instanceof SyntaxError)return [];throw e;}
}
export function saveFavorite(city:string):void {
 const name=city.trim();if(!name)throw new Error("Укажите название города");
 const values=getFavorites();if(!values.some(v=>v.toLowerCase()===name.toLowerCase())){values.push(name);writeFileSync(filename,JSON.stringify(values,null,2)+"\n",{mode:0o600});}
}
