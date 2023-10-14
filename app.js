const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();
const port = process.env.PORT;
const server = express();
const landing = require('./routes/landing');

server.use(express.json()); // Used to parse JSON bodies
server.use(express.urlencoded({ extended: true }));
server.enable('trust proxy');
server.set('view engine', 'ejs');
server.use(morgan('dev'));

// Very importatnt that the static files are placed before the passport.session
// Otherwise you will see the deseriaze user request fires multiple times
server.use(express.static(`${__dirname}/public`));
server.use(express.static(`${__dirname}/public/src`));

server.use(landing);
server.listen(port, () => {
  console.log(`Listening on port ${port}.....`);
});
process.on('unhandledRejection', async (error, p) => { // I added this so that I can console log the unhandled rejection and where it is coming from. Before this I would just get UnhandledPromiseRejectionWarning: Unhandled promise rejection without knowing which promise was not handled
  console.log('=== UNHANDLED REJECTION ==='); // Not good to have undhandled promise rejection in code. This will just help me locate it incase here is one
});
