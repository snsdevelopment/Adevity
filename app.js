const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();
const port = process.env.PORT;
const server = express();
const fileUpload = require('express-fileupload');
const landing = require('./routes/landing');
const floorplan = require('./routes/floorplan');

server.use(express.json()); // Used to parse JSON bodies
server.use(express.urlencoded({ extended: true }));
server.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));
server.enable('trust proxy');
server.set('view engine', 'ejs');
server.use(morgan('dev'));

// Very importatnt that the static files are placed before the passport.session
// Otherwise you will see the deseriaze user request fires multiple times
server.use(express.static(`${__dirname}/public`));
server.use(express.static(`${__dirname}/public/src`));
server.use(express.static(`${__dirname}/public/assets`));

// This is useless because the request will not even get to this point
// If naked domain is not setup in the DNS to point to heroku
// server.all(/.*/, (req, res, next) => {
//   const host = req.header('host');
//   if (host.match(/^www\..*/i)) {
//     next();
//   } else {
//     res.redirect(301, `https://www.${host}`);
//   }
// });

if (process.env.env.toUpperCase() === 'PRODUCTION') {
  server.use((req, res, next) => {
    if (req.secure) {
      // request was via https, so do no special handling
      next();
    } else {
      console.log('Unsecure request');
      res.redirect(`https://${req.headers.host}${req.url}`);
    }
  });
}

server.use((req, res, next) => {
  if (req.hostname.startsWith('floorplan.') || process.env.env.toUpperCase() === 'DEVELOPMENT') {
    server.use('/', floorplan);
  } else {
    server.use('/', landing);
  }
  next();
});
server.listen(port, () => {
  console.log(`Listening on port ${port}.....`);
});
process.on('unhandledRejection', async (error, p) => { // I added this so that I can console log the unhandled rejection and where it is coming from. Before this I would just get UnhandledPromiseRejectionWarning: Unhandled promise rejection without knowing which promise was not handled
  console.log('=== UNHANDLED REJECTION ==='); // Not good to have undhandled promise rejection in code. This will just help me locate it incase here is one
});
