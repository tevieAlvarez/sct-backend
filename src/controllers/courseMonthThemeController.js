const pool = require('../database/db')

const createCourseMonthTheme = async(req, res) => {
    const {name, executionDate, status, description, idCourseMonth, idCourse} = req.body;
    const columnas = '(name, execution_date, status, description, id_course_month, id_course)';
    const values = '($1, $2, $3, $4, $5, $6)';
    const data = [name, executionDate, status, description, idCourseMonth, idCourse];
    console.log(data)
    const response = await pool.query('INSERT INTO course_month_theme' + columnas + 'VALUES' + values + 'RETURNING id_course_month_theme', data);
    console.log(response.rows)
    res.json({message: 'create course month theme', idCourseMonthTheme: response.rows[0].id_course_month_theme});
}

const getCourseMonthThemes = async(req, res) => {
    const idCourseMonth = parseInt(req.params.idCourseMonth);
    const response = await pool.query('SELECT * FROM course_month_theme WHERE id_course_month = $1 ORDER BY id_course_month_theme', [idCourseMonth]);
    res.json(response.rows);
    console.log(response.rows)
}

const getCourseMonthTheme = async(req, res) => {
    const idCourseMonthTheme = parseInt(req.params.idCourseMonthTheme);
    const response = await pool.query('SELECT * FROM course_month_theme WHERE id_course_month_theme = $1', [idCourseMonthTheme]);
    res.json(response.rows[0]);
    console.log(response.rows[0])
}

const updateCourseMonthTheme = async (req, res) => {
    const idCourseMonthTheme = parseInt(req.params.idCourseMonthTheme);
    const {name, executionDate, status, description} = req.body
    const columns = 'name=$1, execution_date=$2, status=$3, description=$4'
    const data = [name, executionDate, status, description]
    await pool.query('UPDATE course_month_theme SET ' + columns + `WHERE id_course_month_theme = ${idCourseMonthTheme}`, data)
    res.json({'message': 'update course month theme'});
}

const deleteCourseMonthTheme = async(req, res) => {
    const idCourseMonthTheme = parseInt(req.params.idCourseMonthTheme);
    await pool.query('DELETE FROM course_month_theme WHERE id_course_month_theme = $1', [idCourseMonthTheme]);
    res.json({message: 'delete course'});
}


module.exports = {
    createCourseMonthTheme,
    getCourseMonthThemes,
    getCourseMonthTheme,
    updateCourseMonthTheme,
    deleteCourseMonthTheme
}