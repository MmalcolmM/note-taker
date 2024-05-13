const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const dbjson = require('./db/db.json')
const app = express();
const { v4: uuidv4 } = require('uuid');

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        }
    console.log(data)
    let prasedData = JSON.parse(data);
    res.status(200).json(prasedData)
    } )})
        
    // Send a message to the client
    // console.log(dbjson)
    // res.status(200).json(dbjson);
 // Log our request to the terminal

app.post('/api/notes', (req, res) => {
    const newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text

    }
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        } 
        const parsedNotes = JSON.parse(data);
        parsedNotes.push(newNote);
        // Write updated reviews back to the file
        fs.writeFile(
             './db/db.json',
             JSON.stringify(parsedNotes, null, 4),
             (writeErr) =>
                 writeErr
                     ? console.error(writeErr)
                     : console.info('Successfully updated notes!')
         );
    })
    })

app.get('/api/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes'))
  );

// Obtain existing tasks
fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
    } else {
        // Convert string into JSON object
        // const parsedReviews = JSON.parse(data);

        // Add a new review
        // parsedReviews.push(newReview);

        // Write updated reviews back to the file
        // fs.writeFile(
        //     './db/db.json',
        //     JSON.stringify(parsedReviews, null, 4),
        //     (writeErr) =>
        //         writeErr
        //             ? console.error(writeErr)
        //             : console.info('Successfully updated reviews!')
        // );
//     }
// });
}})
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        let notes = JSON.parse(data);
        const updatedNotes = notes.filter(note => note.id !== id);

        fs.writeFile('./db/db.json', JSON.stringify(updatedNotes, null, 4), writeErr => {
            if (writeErr) {
                console.error(writeErr);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            res.status(200).json({ message: 'Note deleted successfully' });
        });
    });
});


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
