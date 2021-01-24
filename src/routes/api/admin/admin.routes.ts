import { Router } from 'express';
import passport from 'passport';
import { changePassword, changeProfile } from '../../../controllers/auth.controller';
import { checkPasswordChangeRequest } from '../../../middlewares/user.middleware';

const router = Router()
router.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('success');
});

router.post('/changePwd', passport.authenticate('jwt', { session: false }), checkPasswordChangeRequest, changePassword);
// ! Falta middleware
router.post('/changeProfile', passport.authenticate('jwt', { session: false }), changeProfile);

export default router;