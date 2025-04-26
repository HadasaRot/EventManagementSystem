const express = require('express')
const router = express.Router()
const { model } = require('mongoose');
const EventProducer = model('EventProducer');


router.get('/:email', (req, res) => {
    const email = req.params.email; 
    EventProducer.findOne({ email: email })    
        .then(eventProducer => {
            console.log("Found event producer:", eventProducer);
            if (eventProducer) {

                res.send(eventProducer);
            } else {
                res.status(404).send(`EventProducer with ID ${email} not found.`);
            }
        })
        .catch(err => {
            console.error('Error fetching eventProducer', err);
            res.status(500).send('Internal Server Error');
        });
}   )


router.get('/', (req, res) => {
    EventProducer.find()
        .then(eventProducers => { res.send(eventProducers); console.log(eventProducers) })
        .catch(err => console.error('Error fetching eventProducers', err));
})

router.post('/', (req, res) => {
    const newEventProducer = new EventProducer({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        description: req.body.description
    });
    newEventProducer.save()
    .then(savedProducer => {
        console.log('EventProducer saved!', savedProducer);
        res.status(201).json({ message: 'המפיקה נוספה בהצלחה!', data: savedProducer });
    })
    .catch(err => {
        console.error('Error saving eventProducer', err);
        res.status(500).json({ message: 'שגיאה בשמירת מפיקה' });
    });
})





router.put('/:email', (req, res) => {
    const email = req.params.email;
    EventProducer.findOneAndUpdate({ email: email },
        req.body, { new: true })
        .then(eventProducer => {
            if (eventProducer) {
                res.send(eventProducer);
            } else {
                res.status(404).send(`EventProducer with ID ${email} not found.`);
            }
        })
        .catch(err => {
            console.error('Error fetching eventProducer', err);
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
