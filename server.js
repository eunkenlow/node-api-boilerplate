const express = require('express');

const server = express();

const port = parseInt(process.env.PORT, 10) || 3000;
server.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = server;
