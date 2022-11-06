const pool = require('../database/db')

const createThemeActivity = async(req, res) => {
    const {status, description, score, idCourseMonthTheme, idCourse} = req.body;
    const columns = '(status, description, score, id_course_month_theme, id_course)';
    const values = '($1, $2, $3, $4, $5)';
    const data = [status, description, score, idCourseMonthTheme, idCourse];
    console.log(data)
    await pool.query('INSERT INTO theme_activity' + columns + 'VALUES' + values, data);
    res.json({message: 'create theme activity'});
}

const getCourseMonthActivities = async(req, res) => {
    const idCourseMonth = parseInt(req.params.idCourseMonth);
    const columns = 'TA.*, MT.name AS theme'
    const response = await pool.query(`SELECT ${columns} FROM theme_activity TA
        INNER JOIN course_month_theme MT ON TA.id_course_month_theme = MT.id_course_month_theme
        INNER JOIN course_month CM ON MT.id_course_month = CM.id_course_month
        WHERE CM.id_course_month = ${idCourseMonth} ORDER BY TA.id_theme_activity`);
    res.json(response.rows);
    console.log(response.rows)
}

const getThemeActivity = async(req, res) => {
    const idActivity = parseInt(req.params.idActivity);
    const response = await pool.query('SELECT * FROM theme_activity WHERE id_theme_activity = $1', [idActivity]);
    res.json(response.rows[0]);
    console.log(response.rows[0])
}

const updateThemeActivity = async (req, res) => {
    const idActivity = parseInt(req.params.idActivity);
    const {status, description, score, idCourseMonthTheme} = req.body;
    const columns = 'status=$1, description=$2, score=$3, id_course_month_theme=$4'
    const data = [status, description, score, idCourseMonthTheme]
    await pool.query('UPDATE theme_activity SET ' + columns + `WHERE id_theme_activity = ${idActivity}`, data)
    res.json({'message': 'update theme activity'});
}

const deleteThemeActivity = async(req, res) => {
    const idActivity = parseInt(req.params.idActivity);
    await pool.query('DELETE FROM theme_activity WHERE id_theme_activity = $1', [idActivity]);
    res.json({message: 'delete course'});
}

module.exports = {
    createThemeActivity,
    getCourseMonthActivities,
    getThemeActivity,
    updateThemeActivity,
    deleteThemeActivity
}