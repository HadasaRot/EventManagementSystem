const express = require('express')
const router = express.Router()
const { model } = require('mongoose');
const Event = model('Event');
const Counter = model("Counter");


// פונקציה לקבלת מספר רץ חדש
const getNextSequence = async (name) => {
    const counter = await Counter.findOneAndUpdate(
        { name: name },
        { $inc: { value: 1 } }, // הגדלת הערך ב-1
        { new: true, upsert: true } // יצירת מסמך אם לא קיים
    );
    return counter.value;
};
router.get('/', (req, res) => {
    Event.find()
        .then(events => { res.send(events); console.log(events) })
        .catch(err => console.error('Error fetching events', err));
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Event.find({ producerId: id })
        .then(event => {
            if (event.length > 0) {
                res.send(event);
            } else {
                res.status(404).send(`Event with ID ${id} not found.`);
            }
        })
        .catch(err => {
            console.error('Error fetching event', err);
            res.status(500).send('Internal Server Error');
        });
});


router.post('/', async (req, res) => {
    const nextId = await getNextSequence("event"); // קבלת מספר רץ חדש
    const newEvent = new Event({
        id: nextId,
        name: req.body.name,
        description: req.body.description,
        producerId: req.body.producerId
    });
    newEvent.save()
        .then(() => { res.send(newEvent); console.log('Event saved!') })
        .catch(err => {
            res.status(500).send('Internal Server Error');
            console.error('Error saving event', err)
        }
        );
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    Event.findOneAndUpdate({ id: id }, req.body, { new: true })
        .then(event => {
            if (event) {
                res.send(event);
            } else {
                res.status(404).send(`Event with ID ${id} not found.`);
            }
        })
        .catch(err => {
            console.error('Error fetching event', err);
            res.status(500).send('Internal Server Error');
        });
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Event.findOneAndDelete({ id: id })
        .then(event => {
            if (event) {
                res.send(event);
            } else {
                res.status(404).send(`Event with ID ${id} not found.`);
            }
        })
        .catch(err => {
            console.error('Error fetching event', err);
            res.status(500).send('Internal Server Error');
        });

})

router.use((err, req, res, next) => {
    if (err) {
        res.status(501).send('my error');
    } else {
        next(err);
    }
});

module.exports = router;
