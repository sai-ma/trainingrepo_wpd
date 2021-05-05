const express = require('express');
const controller = require('../controllers/trainingControllers');
const router = express.Router();



router.get('/', controller.landing_page ); 


router.get('/goals', controller.trainingGoals_page);

//for static files, have to 'redirect' and add file path...?
router.get('/about', controller.about_page);

router.get('/posts/:author', controller.show_user_goals);

//add new goal entry GET
router.get('/new', controller.new_goal); 

//add new goal entry POST
router.post('/new', controller.post_new_goal);

router.get('/delete/:id', controller.delete_goal);


router.use(controller.not_found);

module.exports = router;