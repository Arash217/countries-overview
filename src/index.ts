import express from 'express';
import bodyParser from 'body-parser';
import { AppRouter } from './AppRouter';
import hbs from 'express-handlebars';
import './controllers';
import * as path from 'path';

const app = express();

app.use('/public', express.static(path.join(__dirname, 'resources')));

app.set('views', path.join(__dirname, 'views'));
app.engine(
    'hbs',
    hbs({
        extname: 'hbs',
        layoutsDir: path.join(__dirname, 'views/layouts'),
        partialsDir: path.join(__dirname, 'views/partials'),
    }),
);
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(AppRouter.getInstance());

const port = process.env.PORT || 3000;

app.listen(port, (): void => {
    console.log(`Listening on port ${port}`);
});
