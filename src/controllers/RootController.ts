import { Request, Response } from 'express';
import { controller, get } from '../decorators';

@controller('')
class RootController {
    @get('/')
    getRoot(req: Request, res: Response): void {
        // Redirect to countries
        res.redirect('/countries');
    }
}
