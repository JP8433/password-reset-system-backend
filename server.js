import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';

const app = express();

/** middlewares */
app.use(express.json());
app.use(cors({
  origin: 'https://rad-sprite-872e8c.netlify.app', // Replace with your frontend URL
}));
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about our stack

const port = 8080;

/** HTTP GET Request */
app.get('/', (req, res) => {
  res.status(201).json("Home GET Request");
});

/** api routes */
app.use('/api', router);

/** start server only when we have a valid connection */
connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server connected to http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.log("Invalid database connection...!");
  });
