import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { indexRoutes } from './all.routes';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/v1/', indexRoutes)

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
