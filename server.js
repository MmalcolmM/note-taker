const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const dbjson = require('./db/db.json')
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    // Send a message to the client
    res.json(dbjson);
 // Log our request to the terminal
    console.info(`${req.method} request received to get notes`);
});

app.post('/api/notes', (req, res) => {
    res.status(200).json(`${req.method} request received to get notes`);

})

app.get('/api/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
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


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
