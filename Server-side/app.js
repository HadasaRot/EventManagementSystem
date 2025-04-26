//ניהול ממול הלקוח
const express = require('express');
const app = express();
const cors = require('cors');

// הגדרת CORS לכל הכתובות
app.use(cors({
    origin: '*' // מאפשר לכל הדומיינים
  }));
  
app.use(express.json());
const PORT = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//ניהול ממול השרת
const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/Events';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    });


const Schema = mongoose.Schema;

const eventSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String },
    description: String,
    producerId: { type: String, required: true }
});

const Event = mongoose.model('Event', eventSchema);


const eventProducerSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String, required: true },
    description: String,
});

const EventProducer = mongoose.model('EventProducer', eventProducerSchema);

const counterSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // שם המונה 
    value: { type: Number, required: true } // הערך הנוכחי של ה-ID
});

const Counter = mongoose.model("Counter", counterSchema);

const event = require('./controlers/event')
const authors = require('./controlers/eventProducer')

app.use('/event', event);
app.use('/eventProducer', authors);


app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
);

