// import dotenv from 'dotenv';
// dotenv.config();
import express, { response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import randomRoute from './routes/randomRoute.js';
import searchRoute from './routes/searchRoute.js';
import { fileURLToPath } from 'url';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(cors());

app.use(bodyParser.json());

let port = process.env.port || 3001;

app.get('/', (req, res)=> {
  res.send('Server side running!')
});

app.use('/randomfood', randomRoute);
app.use('/searchfoods', searchRoute);

// // console.log(currentDay)
// let state = "co"
// let city = 'aurora';
// // https://www.eventbrite.com/d/nv--las-vegas/events--today/?page=1

// // app.use('/store-data', weatherRoutes);
// // use axios call below for webscraping data for trips
// let url = `https://www.eventbrite.com/d/${state}--${city}/free--events--today/?page=1`;
// let data = [];
// axios.get(url)
//   .then((response) => {
//     const $ = cheerio.load(response.data);
//     // const events = $('.discover-search-desktop-card h2').toArray().slice(2,5);
//     const timesAndLocals = $('.discover-horizontal-event-card .event-card__clamp-line--one').toArray().slice(4,10); // have to times the num's by 2 
//     // events.forEach(e=>console.log(e.children[0].data))
//     timesAndLocals.forEach(e=>console.log(e.children[0].data))
//   })
//   .catch((error)=>console.error('Error: ', error)
// );


app.listen(port, function (){
  console.log(`Server is running on port ${port}`);
});
