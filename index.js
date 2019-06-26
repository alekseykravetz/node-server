
const express = require('express');
const cors = require('cors');

const dataAccesss = require('./data-access');



const publicApi = require('./api/public.api');



dataAccesss.initConnection();


const app = express();


app.use(express.json());
app.use(cors());


app.get('/', (req, res) => res.send('Server Online'));

app.use(publicApi);



const port = process.env.PORT || 9020;

app.listen(port, () => console.log(`dx server - port: ${port} - ${process.env.NODE_ENV || 'local'} environment`));
// server.listen(port, () => console.log(`dx server - port: ${port} - ${process.env.NODE_ENV || 'local'} environment`));

