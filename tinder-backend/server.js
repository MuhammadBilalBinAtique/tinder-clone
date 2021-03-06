import express  from "express";
import mongoose from "mongoose";
import Cards from "./dbCards.js";
import Cors from "cors";

const connection_url = '';

//App config
const app = express();
const port = process.env.PORT || 8001;

//Middlewares
app.use(express.json());
app.use(Cors());


//DB config
mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

//API endpoints
app.get('/', (req, res) => {
    res.status(200).send("Helo Clever PProgrammmer");
})

app.post('/cards', (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if(err){
            res.status(500).send(err);
        } else {
            res.status(201).send(data)
        }
    })
})

app.get('/cards', (req, res) => {
    const dbCard = req.body;

    Cards.find((err, data) => {
        if(err){
            res.status(500).send(err);
        } else {
            res.status(200).send(data)
        }
    })
})

//Listener
app.listen(port, () => console.log(`Liustening on port ${port}`))
