const pool = require('../database/db')

const createCourseMonthSubtheme = async(req, res) => {
    const {name, executionDate, status, description, idCourseMonthTheme, idCourse} = req.body;
    const columnas = '(name, execution_date, status, description, id_course_month_theme, id_course)';
    const values = '($1, $2, $3, $4, $5, $6)';
    const data = [name, executionDate, status, description, idCourseMonthTheme, idCourse];
    console.log(data)
    await pool.query('INSERT INTO course_month_subtheme' + columnas + 'VALUES' + values, data);
    res.json({message: 'create course month subtheme'});
}

const getCourseMonthSubthemes = async(req, res) => {
    const idCourseMonthTheme = parseInt(req.params.idCourseMonthTheme);
    const response = await pool.query('SELECT * FROM course_month_subtheme WHERE id_course_month_theme = $1 ORDER BY id_course_month_subtheme', [idCourseMonthTheme]);
    res.json(response.rows);
    console.log(response.rows)
}

const getCourseMonthSubtheme = async(req, res) => {
    const idCourseMonthSubtheme = parseInt(req.params.idCourseMonthSubtheme);
    const response = await pool.query('SELECT * FROM course_month_subtheme WHERE id_course_month_subtheme = $1', [idCourseMonthSubtheme]);
    res.json(response.rows[0]);
    console.log(response.rows[0])
}

const updateCourseMonthSubtheme = async (req, res) => {
    const idCourseMonthSubtheme = parseInt(req.params.idCourseMonthSubtheme);
    const {name, executionDate, status, description} = req.body
    const columns = 'name=$1, execution_date=$2, status=$3, description=$4'
    const data = [name, executionDate, status, description]
    await pool.query('UPDATE course_month_subtheme SET ' + columns + `WHERE id_course_month_subtheme = ${idCourseMonthSubtheme}`, data)
    res.json({'message': 'update course month subtheme'});
}


module.exports = {
    createCourseMonthSubtheme,
    getCourseMonthSubthemes,
    getCourseMonthSubtheme,
    updateCourseMonthSubtheme
}