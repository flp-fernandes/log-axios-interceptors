const express = require('express');
const axios = require('axios');
const log = require('./Logger');

const app = express();
const PORT = 5000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(req);
    next();
})

app.get('/', (req, res) => {
    return res.status(200).send({
        message: 'esta funciondo!'
    })
})

app.get('/teste', async (req, res) => {
    try {
        axios.interceptors.request.use(req => {
            console.log(`${req.method} ${req.url}`);
            const msg = `${req.method} ${req.url}`;
            log.info(msg);
            
            // Important: request interceptors **must** return the request.
            return req;
        });

        axios.interceptors.response.use(res => {
            console.log(res.data);
            // Important: response interceptors **must** return the response.
            return res;
        });
        
        const resposta = await axios.get('https://swapi.dev/api/people/1/');

        return res.status(200).send(resposta.data);
    } catch (error) {
        return res.status(500).send({
            message: error
        })
    }
})

app.listen(PORT, () => console.log(`Backend is up on ${PORT}`));