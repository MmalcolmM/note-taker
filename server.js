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
// Handle DELETE request to delete a note by ID
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id; // Extract the ID parameter from the request URL

    // Read the contents of the db.json file
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' }); // Send error response if reading file fails
            return;
        }

        let notes = JSON.parse(data); // Parse the JSON data into a JavaScript object

        // Filter out the note with the specified ID
        const updatedNotes = notes.filter(note => note.id !== id);

        // Write the updated notes array back to the db.json file
        fs.writeFile('./db/db.json', JSON.stringify(updatedNotes, null, 4), writeErr => {
            if (writeErr) {
                console.error(writeErr);
                res.status(500).json({ error: 'Internal Server Error' }); // Send error response if writing file fails
                return;
            }

            res.status(200).json({ message: 'Note deleted successfully' }); // Send success response after deleting the note
        });
    });
});


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
