const CURRENT_USER_KEY = "current-user";
const URL_AUTH = "https://porra-api.herokuapp.com/auth/twitter"
const SCREENWEB = window.innerWidth > 600;
const PLAYERS = [
  { id: 1, name: "koke" },
  { id: 2, name: "chino" },
  { id: 3, name: "paco" }
];
const TEAMS = [
{
  "id": 1,
  "name": "C.D. Vicálvaro",
  "shield": "/escudos/vicalvaro.jpg"
},
{
  "id": 2,
  "name": "Móstoles CF",
  "shield": "/escudos/mostolescf.jpg"
},
{
  "id": 3,
  "name": "Colonia Moscardó",
  "shield": "/escudos/moscardo.jpg"
},
{
  "id": 4,
  "name": "Ciudad Angeles",
  "shield": "/escudos/angeles.jpg"
},
{
  "id": 5,
  "name": "Real Aranjuez CF",
  "shield": "/escudos/aranjuez.jpg"
},
{
  "id": 6,
  "name": "Internacional",
  "shield": "/escudos/inter.jpg"
},
{
  "id": 7,
  "name": "Móstoles URJC",
  "shield": "/escudos/mostoles_urjc.jpg"
},
{
  "id": 8,
  "name": "Sitio Aranjuez",
  "shield": "/escudos/sitio_aranjuez.jpg"
},
{
  "id": 9,
  "name": "C.D. Fortuna",
  "shield": "/escudos/fortuna.jpg"
},
{
  "id": 10,
  "name": "E.M.F. Villarejo",
  "shield": "/escudos/villarejo.jpg"
},
{
  "id": 11,
  "name": "Coslada",
  "shield": "/escudos/coslada.jpg"
},
{
  "id": 12,
  "name": "Lugo Fuenlabrada",
  "shield": "/escudos/lugo.jpg"
},
{
  "id": 13,
  "name": "U.D. Ciempozuelos",
  "shield": "/escudos/ciempozuelos.jpg"
},
{
  "id": 14,
  "name": "Villaviciosa Odón",
  "shield": "/escudos/villaviciosa.jpg"
},
{
  "id": 15,
  "name": "Fepe Getafe III",
  "shield": "/escudos/fepe.jpg"
},
{
  "id": 16,
  "name": "C.D.E. Ursaria",
  "shield": "/escudos/ursaria.jpg"
},
{
  "id": 17,
  "name": "Arganda",
  "shield": "/escudos/arganda.jpg"
},
{
  "id": 18,
  "name": "Los Yébenes",
  "shield": "/escudos/yebenes.jpg"
}]

export default {
  CURRENT_USER_KEY,
  PLAYERS,
  TEAMS,
  URL_AUTH,
  SCREENWEB
};
