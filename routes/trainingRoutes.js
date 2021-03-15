const express = require('express');
const controller = require('../controllers/trainingControllers');
const router = express.Router();



router.get('/', controller.landing_page ); 


router.get('/logs', controller.trainingLog_page);

//for static files, have to 'redirect' and add file path...?
router.get('/about', controller.about_page);

router.get('/new', controller.new_entry); 

router.use(controller.not_found);

module.exports = router;