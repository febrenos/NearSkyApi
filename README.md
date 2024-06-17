# NearSkyApi
Api de clima

#### EXTERNAL APIs
<details>
<summary>hgbrasil</summary>
  
- https://hgbrasil.com/
- https://api.hgbrasil.com/stats/weather_cities?key=78g14f59&format=json-cors&sdk_version=hgbrasil
- https://api.hgbrasil.com/weather/?format=json-cors&key=78g14f59&woeid=455827&sdk_version=js1.0.0
</details>

#### ABOUT
<details>
<summary>Creation</summary>
1. npm init -y
2. npm install express typescript @types/express
3. Configuração do TypeScript (tsconfig.json)
<details>
<summary>tsconfig.json</summary>


```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  },
  "include": [
    "src/**/*.ts"
  ]
}
```

</details>

<details>
<summary>Run, compile, and tests</summary>

- npx tsc
- node dist/server.js
- npm run build
- npm run dev
- npm start

</details>

...

</details>

---
- getPlaces("placeName")
- getPlacesInfo(["sp-br", "arg-afr"])

|tets|test|
|---|---|
|test|test|
