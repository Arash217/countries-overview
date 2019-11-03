import express from 'express';
import bodyParser from 'body-parser';
import { AppRouter } from './AppRouter';
import './controllers';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(AppRouter.getInstance());

app.listen(3000, (): void => {
    console.log('Listening on port 3000');
});
