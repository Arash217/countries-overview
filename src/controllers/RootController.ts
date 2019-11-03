import { Request, Response } from 'express';
import { controller, get } from '../decorators';

@controller('')
class RootController {
    @get('/')
    getRoot(req: Request, res: Response): void {
        res.send(`
            <div>
                <div>You are not logged in</div>
                <a href="/auth/login">Login</a>
            </div>
        `);
    }

    @get('/protected')
    getProtected(req: Request, res: Response): void {
        res.send('Welcome to protected route, logged in user');
    }
}
