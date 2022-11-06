const pool = require('../database/db')

const getCourseMonth = async(req, res) => {
    const idCourseMonth = parseInt(req.params.idCourseMonth);
    const columns = 'id_course_month, month, CM.id_course, name AS course, description'
    const response = await pool.query(`SELECT ${columns} FROM course_month CM
        INNER JOIN course C ON CM.id_course = C.id_course
        WHERE id_course_month = ${idCourseMonth}`);
    res.json(response.rows[0]);
    console.log(response.rows[0])
}

module.exports = {
    getCourseMonth
}