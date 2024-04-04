const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    User.create({
        username, password
        
    })
 
    res.json({
        message: "user created"
    })
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({}) 
    
    res.json({
        courses: response
    })

});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    try {
        await  User.updateOne({
        username:username
        },
            {"$push":
        {
              purchasedCourses: courseId
         }
    })
    } catch(e){
        console.log(e);
    }
   
    res.json(
        {
            mess: "purchase done"
        }
    )

});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router