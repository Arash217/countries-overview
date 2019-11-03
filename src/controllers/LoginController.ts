import { Request, Response } from 'express';
import { bodyValidator, controller, get, post } from '../decorators';

@controller('/auth')
export class LoginController {
    @get('/login')
    getLogin(req: Request, res: Response): void {
        res.send(`
            <form method="POST">
                <div>
                    <label>Email</label>
                    <input name="email">
                </div>
                    <div>
                    <label>Password</label>
                    <input name="password" type="password">
                </div>
                <button>Submit</button>
            </form>
        `);
    }

    @post('/login')
    @bodyValidator('email', 'password')
    postLogin(req: Request, res: Response): void {
        const { email, password } = req.body;

        if (email === 'hi@hi.com' && password === 'password') {
            res.redirect('/');
            return;
        }

        res.send('Invalid email or password');
    }

    @get('/logout')
    getLogout(req: Request, res: Response): void {
        res.redirect('/');
    }
}
