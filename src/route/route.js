const express = require('express');
const router = express.Router();
const CollegeController  = require('../Controller/CollegeController');
const InternController = require('../Controller/InternController')


router.post('/functionup/colleges', CollegeController.CreateCollege);
router.post('/functionup/interns', InternController.CreateIntern );
router.get("/functionup/collegeDetails",  CollegeController.collegeDetails);

module.exports = router;





