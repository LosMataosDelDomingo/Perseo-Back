import { Router, Request, Response } from 'express';
import passport from 'passport';
import { signUp, signIn } from './../../../controllers/auth.controller';

const router = Router();

// router.get("/special", passport.authenticate('jwt', { session: false }), (req: Request, res: Response) => {
//     res.send("test")
// });
router.post("/signup", signUp)
router.post("/signin", signIn)

export default router