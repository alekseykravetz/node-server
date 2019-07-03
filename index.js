
const express = require('express');
const cors = require('cors');

const dataAccess = require('./data-access');



const publicApi = require('./api/public.api');
const loginApi = require('./api/login.api');
const authenticationApi = require('./api/authentication.api');
const privateApi = require('./api/private.api');



dataAccess.initConnection();


const app = express();


app.use(express.json());
app.use(cors());


app.get('/', (req, res) => res.send('Server Online'));



app.use(publicApi);
app.use(loginApi);

app.use(authenticationApi); // Authenticated from here on

app.use(privateApi);




const port = process.env.PORT || 9020;

app.listen(port, () => console.log(`dx server - port: ${port} - ${process.env.NODE_ENV || 'local'} environment`));
// server.listen(port, () => console.log(`dx server - port: ${port} - ${process.env.NODE_ENV || 'local'} environment`));

