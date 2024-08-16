import express from 'express';
require('dotenv').config();
require('./src/config/dbConnection');
import * as Sentry from '@sentry/node';

const bodyParser = require('body-parser');
const corsMiddleware = require('./src/middleware/cors');
const routes = require('./src/routes/index');

// const { scheduleMonthReportEmail } = require('./src/services/Mail/cronService');
const app = express();
const PORT = process.env.PORT || 5000;
const SENTRY_DSN = process.env.SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());

app.use('/', routes);

// this feature work local but doesn't work on render (server sleeps)
// scheduleMonthReportEmail();

app.listen(PORT, (error?: Error) => {
  if (!error) {
    console.log(`Server is running on http://localhost:${PORT}`);
  } else {
    console.error('"Error·occurred,·server·can\'t·start"', error);
  }
});
