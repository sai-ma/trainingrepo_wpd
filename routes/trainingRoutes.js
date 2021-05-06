const express = require('express');
const controller = require('../controllers/trainingControllers');
const auth = require('../auth/auth.js');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const router = express.Router();




router.get('/', controller.landing_page ); 


router.get('/goals', controller.trainingGoals_page);

//for static files, have to 'redirect' and add file path...?
router.get('/about', controller.about_page);

router.get('/posts/:author', controller.show_user_goals);

//add new goal entry GET
router.get('/new',  ensureLoggedIn('/login'), controller.new_goal); 

//add new goal entry POST
router.post('/new', ensureLoggedIn('/login'),  controller.post_new_goal);

//delete goal route with id passing
router.get('/delete/:id', controller.delete_goal);

router.get('/register', controller.show_register_page);


router.post('/register', controller.post_new_user);

router.get('/login', controller.show_login_page);

router.post("/login", auth.authorize("/login"),
controller.post_login);

router.get('/logout', controller.logout);

router.use(controller.not_found);

module.exports = router;