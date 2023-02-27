Fix formatting: 
Linux Ctrl + Shift + I
Windows Shift + Alt + F

rm -rf .git

## Osa 1

`npx create-react-app <name>`
`npm start`

## Osa 2

`npm install`

Käynnistä JSON server:

`npx json-server --port=3001 --watch db.json`

tai `npm run server`

`npm install axios`
`npm install json-server --save-dev`

```
{
  // ... 
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "server": "json-server -p3001 --watch db.json"
  },
}
```

## Osa 3

Huom! Tässä osassa ei React-sovellusta
`npm init`

```
{
  // ...
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // ...
}
```
`npm install express`
Palvelimen koodin tekeminen suoraan Noden sisäänrakennetun web-palvelimen http:n päälle on mahdollista. Se on kuitenkin työlästä, erityisesti jos sovellus kasvaa hieman isommaksi.

Nodella tapahtuvaa web-sovellusten ohjelmointia helpottamaan onkin kehitelty useita http:tä miellyttävämmän ohjelmointirajapinnan tarjoavia kirjastoja. Näistä ylivoimaisesti suosituin on Express.

`npm update`

Interaktiivinen node-repl: `node`

`npm install --save-dev nodemon`
`npm run dev`
nodemon will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart your node application.




