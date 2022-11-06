const pool = require('../database/db')

const getCourseMonthItems = async(req, res) => {
    const idCourseMonth = parseInt(req.params.idCourseMonth);

    const queryTotalItems = `
    SELECT SUM(count) AS total_items FROM (
        (SELECT COUNT(*) FROM course_month_theme WHERE id_course_month = ${idCourseMonth})
        UNION ALL
        (SELECT COUNT(*) FROM course_month_theme MT
        INNER JOIN course_month_subtheme MS ON MT.id_course_month_theme = MS.id_course_month_theme
        WHERE MT.id_course_month = ${idCourseMonth})
        UNION ALL 
        (SELECT COUNT(*) FROM course_month_theme MT
        INNER JOIN theme_activity TA ON MT.id_course_month_theme = TA.id_course_month_theme
        WHERE MT.id_course_month = ${idCourseMonth})
        UNION ALL 
        (SELECT COUNT(*) FROM course_month_exam WHERE id_course_month = ${idCourseMonth})
    ) AS subq;`

    const queryTotalItemsCompleted = `
    SELECT SUM(count) AS total_items_completed FROM (
        (SELECT COUNT(*) FROM course_month_theme WHERE id_course_month = ${idCourseMonth} AND status = 2)
        UNION ALL
        (SELECT COUNT(*) FROM course_month_theme MT
        INNER JOIN course_month_subtheme MS ON MT.id_course_month_theme = MS.id_course_month_theme
        WHERE MT.id_course_month = ${idCourseMonth} AND MS.status = 2)
        UNION ALL 
        (SELECT COUNT(*) FROM course_month_theme MT
        INNER JOIN theme_activity TA ON MT.id_course_month_theme = TA.id_course_month_theme
        WHERE MT.id_course_month = ${idCourseMonth} AND TA.status = 2)
        UNION ALL 
        (SELECT COUNT(*) FROM course_month_exam WHERE id_course_month = ${idCourseMonth} AND status = 2)
    ) AS subq;`

    const queryTotalPoints = `
    SELECT SUM(points) AS total_points FROM (
        (SELECT SUM(TA.score) AS points FROM course_month_theme MT
        INNER JOIN theme_activity TA ON MT.id_course_month_theme = TA.id_course_month_theme
        WHERE MT.id_course_month = ${idCourseMonth})
        UNION ALL 
        (SELECT SUM(score) AS points FROM course_month_exam WHERE id_course_month = ${idCourseMonth})
    ) AS subq;`

    const queryTotalPointsCompleted = `
    SELECT SUM(points) AS total_points_completed FROM (
        (SELECT SUM(TA.score) AS points FROM course_month_theme MT
        INNER JOIN theme_activity TA ON MT.id_course_month_theme = TA.id_course_month_theme
        WHERE MT.id_course_month = ${idCourseMonth} AND TA.status = 2)
        UNION ALL 
        (SELECT SUM(score) AS points FROM course_month_exam WHERE id_course_month = ${idCourseMonth} AND status = 2)
    ) AS subq;`


    const resTotalItems = await pool.query(queryTotalItems)
    const resTotalItemsCompleted = await pool.query(queryTotalItemsCompleted)
    const resTotalPoints = await pool.query(queryTotalPoints)
    const resTotalPointsCompleted = await pool.query(queryTotalPointsCompleted)

    /*console.log(resTotalItems.rows[0].total_items)
    console.log(resTotalItemsCompleted.rows[0].total_items_completed)
    console.log(resTotalPoints.rows[0].total_points)
    console.log(resTotalPointsCompleted.rows[0].total_points_completed)*/

    const totalItems = resTotalItems.rows[0].total_items
    const totalItemsCompleted = resTotalItemsCompleted.rows[0].total_items_completed
    const totalPoints = resTotalPoints.rows[0].total_points
    const totalPointsCompleted = resTotalPointsCompleted.rows[0].total_points_completed


    const report = {
        totalItems: totalItems,
        percentageTotalItems: (totalItems == 0) ? '0%' : '100%',
        totalItemsCompleted: totalItemsCompleted, 
        percentageTotalItemsCompleted: (totalItems == 0) ? '0%' : Math.round((totalItemsCompleted * 100) / totalItems) + '%',
        totalPoints: (totalPoints == null) ? 0 : totalPoints,
        totalPointsCompleted: (totalPointsCompleted == null) ? 0 : totalPointsCompleted
    }

    res.json(report)
    //res.json({message: 'report getCourseMonthItems'});
}


const getCourseItems = async(req, res) => {
    const idUser = parseInt(req.params.idUser);
    const resCourses = await pool.query('SELECT * FROM course WHERE id_user = $1 ORDER BY id_course', [idUser]);

    const queryTotalItems = `
    SELECT id_course, name, SUM(count) AS total_items FROM (
        (SELECT C.id_user, C.id_course, C.name, COUNT(*) FROM course C
        INNER JOIN course_month_theme MT ON C.id_course = MT.id_course
        GROUP BY C.id_course)
        UNION ALL 
        (SELECT C.id_user, C.id_course, C.name, COUNT(*) FROM course C
        INNER JOIN course_month_subtheme MS ON C.id_course = MS.id_course
        GROUP BY C.id_course)
        UNION ALL 
        (SELECT C.id_user, C.id_course, C.name, COUNT(*) FROM course C
        INNER JOIN theme_activity TA ON C.id_course = TA.id_course
        GROUP BY C.id_course)
        UNION ALL 
        (SELECT C.id_user, C.id_course, C.name, COUNT(*) FROM course C
        INNER JOIN course_month_exam ME ON C.id_course = ME.id_course
        GROUP BY C.id_course)
    ) AS subq WHERE id_user = ${idUser} GROUP BY id_course, name ORDER BY id_course;`

    const queryTotalItemsCompleted = `
    SELECT id_course, name, SUM(count) AS total_items_completed FROM (
        (SELECT C.id_user, C.id_course, C.name, COUNT(*) FROM course C
        INNER JOIN course_month_theme MT ON C.id_course = MT.id_course
        WHERE MT.status = 2
        GROUP BY C.id_course)
        UNION ALL 
        (SELECT C.id_user, C.id_course, C.name, COUNT(*) FROM course C
        INNER JOIN course_month_subtheme MS ON C.id_course = MS.id_course
        WHERE MS.status = 2
        GROUP BY C.id_course)
        UNION ALL 
        (SELECT C.id_user, C.id_course, C.name, COUNT(*) FROM course C
        INNER JOIN theme_activity TA ON C.id_course = TA.id_course
        WHERE TA.status = 2
        GROUP BY C.id_course)
        UNION ALL 
        (SELECT C.id_user, C.id_course, C.name, COUNT(*) FROM course C
        INNER JOIN course_month_exam ME ON C.id_course = ME.id_course
        WHERE ME.status = 2
        GROUP BY C.id_course)
    ) AS subq WHERE id_user = ${idUser} GROUP BY id_course, name ORDER BY id_course;`

    const queryTotalPoints = `
    SELECT id_course, name, SUM(points) AS total_points FROM (
        (SELECT C.id_user, C.id_course, C.name, SUM(TA.score) AS points FROM course C
        INNER JOIN theme_activity TA ON C.id_course = TA.id_course
        GROUP BY C.id_course)
        UNION ALL 
        (SELECT C.id_user, C.id_course, C.name, SUM(ME.score) AS points FROM course C
        INNER JOIN course_month_exam ME ON C.id_course = ME.id_course
        GROUP BY C.id_course)
    ) AS subq WHERE id_user = ${idUser} GROUP BY id_course, name ORDER BY id_course;`

    const queryTotalPointsCompleted = `
    SELECT id_course, name, SUM(points) AS total_points_completed FROM (
        (SELECT C.id_user, C.id_course, C.name, SUM(TA.score) AS points FROM course C
        INNER JOIN theme_activity TA ON C.id_course = TA.id_course
        WHERE TA.status = 2
        GROUP BY C.id_course)
        UNION ALL 
        (SELECT C.id_user, C.id_course, C.name, SUM(ME.score) AS points FROM course C
        INNER JOIN course_month_exam ME ON C.id_course = ME.id_course
        WHERE ME.status = 2
        GROUP BY C.id_course)
    ) AS subq WHERE id_user = ${idUser} GROUP BY id_course, name ORDER BY id_course;`

    const resTotalItems = await pool.query(queryTotalItems)
    const resTotalItemsCompleted = await pool.query(queryTotalItemsCompleted)
    const resTotalPoints = await pool.query(queryTotalPoints)
    const resTotalPointsCompleted = await pool.query(queryTotalPointsCompleted)

    //console.log('courses', resCourses.rows)

    resCourses.rows.forEach(course => {
        const courseTotalItems  = resTotalItems.rows.find(item => item.id_course == course.id_course)
        //console.log('courseTotalItems', courseTotalItems)
        const courseTotalItemsCompleted  = resTotalItemsCompleted.rows.find(item => item.id_course == course.id_course)
        //console.log('courseTotalItemsCompleted', courseTotalItemsCompleted)
        const courseTotalPoints  = resTotalPoints.rows.find(item => item.id_course == course.id_course)
        //console.log('courseTotalPoints', courseTotalPoints)
        const courseTotalPointsCompleted  = resTotalPointsCompleted.rows.find(item => item.id_course == course.id_course)
        //console.log('courseTotalPointsCompleted', courseTotalPointsCompleted)

        course.totalItems = (courseTotalItems == undefined) ? 0 : courseTotalItems.total_items
        course.totalItemsCompleted = (courseTotalItemsCompleted == undefined) ? 0 : courseTotalItemsCompleted.total_items_completed
        course.totalPoints = (courseTotalPoints == undefined) ? 0 : courseTotalPoints.total_points
        course.totalPointsCompleted = (courseTotalPointsCompleted == undefined) ? 0 : courseTotalPointsCompleted.total_points_completed
    })

    console.log('Courses', resCourses.rows)

    res.json(resCourses.rows);
}
    

module.exports = {
    getCourseMonthItems,
    getCourseItems
}