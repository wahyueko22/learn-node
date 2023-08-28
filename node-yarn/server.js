const express = require('express');
const app = express();

const port = 3000; // Choose a port number for your server

app.use(express.static('public')); // Serve static files from the 'public' directory

app.listen(port, () => {
    //console.log(`Server runnisndsg on port d xxkd ${port}`);
});
