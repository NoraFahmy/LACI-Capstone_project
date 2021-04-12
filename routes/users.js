const express=require('express');
const router=express.Router();
const User=require("../models/user");
const asyncCatcher = require('../utilites/asyncCatcher');
const passport=require("passport")


router.get('/register',(req,res)=>{
    res.render('users/register');
});

router.post(
	'/register',
	asyncCatcher(async (req, res) => {
		try {
			const { email, username, password } = req.body;
			const user = new User({ email, username });
			const newUser = await User.register(user, password);
			req.login(newUser,(err)=>{
				if(err) return next(e);
				req.flash('success', 'Welcome to the Place Hub!');
				res.redirect('/places');
			});
		} catch (e) {
			req.flash('error', e.message);
			res.redirect('/register');
		}
	})
);
router.get('/login', (req, res) => {
	res.render('users/login');
});

router.post(
	'/login',
	passport.authenticate('local', {
		failureFlash: true,
		failureRedirect: '/login',
	}),
	(req, res) => {
		req.flash('success', 'Welcome back to the LACI Place Hub');
		res.redirect('/Places');
	}
);
router.get("/logout",(req,res)=>{
	req.logOut();
	req.flash('success','Come Back Soon!');
	res.redirect('/login');
})

module.exports = router;

