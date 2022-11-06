const {Router} = require('express')
const router = Router()

const userController = require('../controllers/userController')
const cycleController = require('../controllers/cycleController')
const courseController = require('../controllers/courseController')
const courseMonthController = require('../controllers/courseMonthController')
const courseMonthThemeController = require('../controllers/courseMonthThemeController')
const courseMonthSubthemeController = require('../controllers/courseMonthSubthemeController')
const themeActivityController = require('../controllers/themeActivityController')
const courseMonthExamController = require('../controllers/courseMonthExamController')
const reportController = require('../controllers/reportController')

router.post('/user', userController.createUser);
router.get('/user', userController.getUsers);
router.get('/user/:id', userController.getUser);
router.post('/login', userController.login);

router.post('/cycle', cycleController.createCycle)
router.get('/cycle', cycleController.getCycles)
router.get('/cycle/:idCycle', cycleController.getCycle)
router.delete('/cycle/:idCycle', cycleController.deleteCycle)

router.post('/course', courseController.createCourse)
router.get('/course', courseController.getCourses)
router.get('/course/user/:idUser', courseController.getCoursesUser)
router.get('/course/:idCourse', courseController.getCourse)
router.delete('/course/:idCourse', courseController.deleteCourse)

router.get('/courseMonth/:idCourseMonth', courseMonthController.getCourseMonth)

router.post('/courseMonthTheme', courseMonthThemeController.createCourseMonthTheme)
router.get('/courseMonthThemes/:idCourseMonth', courseMonthThemeController.getCourseMonthThemes)
router.get('/courseMonthTheme/:idCourseMonthTheme', courseMonthThemeController.getCourseMonthTheme)
router.put('/courseMonthTheme/:idCourseMonthTheme', courseMonthThemeController.updateCourseMonthTheme)
router.delete('/courseMonthTheme/:idCourseMonthTheme', courseMonthThemeController.deleteCourseMonthTheme)

router.post('/courseMonthSubtheme', courseMonthSubthemeController.createCourseMonthSubtheme)
router.get('/courseMonthSubthemes/:idCourseMonthTheme', courseMonthSubthemeController.getCourseMonthSubthemes)
router.get('/courseMonthSubtheme/:idCourseMonthSubtheme', courseMonthSubthemeController.getCourseMonthSubtheme)
router.put('/courseMonthSubtheme/:idCourseMonthSubtheme', courseMonthSubthemeController.updateCourseMonthSubtheme)

router.post('/themeActivity', themeActivityController.createThemeActivity)
router.get('/themeActivities/:idCourseMonth', themeActivityController.getCourseMonthActivities)
router.get('/themeActivity/:idActivity', themeActivityController.getThemeActivity)
router.put('/themeActivity/:idActivity', themeActivityController.updateThemeActivity)
router.delete('/themeActivity/:idActivity', themeActivityController.deleteThemeActivity)

router.post('/courseMonthExam', courseMonthExamController.createCourseMonthExam)
router.get('/courseMonthExams/:idCourseMonth', courseMonthExamController.getCourseMonthExams)
router.get('/courseMonthExam/:idCourseMonthExam', courseMonthExamController.getCourseMonthExam)
router.put('/courseMonthExam/:idCourseMonthExam', courseMonthExamController.updateCourseMonthExam)
router.delete('/courseMonthExam/:idCourseMonthExam', courseMonthExamController.deleteCourseMonthExam)

router.get('/report-courseMonthItems/:idCourseMonth', reportController.getCourseMonthItems)
router.get('/report-courseItems/:idUser', reportController.getCourseItems)

module.exports = router