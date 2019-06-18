
const express = require('express');
const cors = require('cors');

const publicApi = require('./api/public.api');




const app = express();


app.use(express.json());
app.use(cors());


app.get('/', (req, res) => res.send('Server Online'));

app.use(publicApi);



const port = process.env.PORT || 1020;

app.listen(port, () => console.log(`dx server - port: ${port} - ${process.env.NODE_ENV || 'local'} environment`));
// server.listen(port, () => console.log(`dx server - port: ${port} - ${process.env.NODE_ENV || 'local'} environment`));

