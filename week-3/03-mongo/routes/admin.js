const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

   await  Admin.create({
        username,
        password
   })
    res.json({
        message: "admuin is created"
    })

});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const dis = req.body.dis;
    const imageLink = req.body.imageLink;
    const price = req.body.price;
    
    const newCourses = await Course.create({
        title,
        dis,
        imageLink,
        price
       
    })
    
    res.json({
        message: "courses is created", courseID: newCourses._id
    })
});

router.get('/courses', adminMiddleware, async(req, res) => {
    
    // Implement fetching all courses logic
    const response = await Course.find({})
    
    res.json({
       data: response
    })


});

module.exports = router;