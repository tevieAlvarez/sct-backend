const pool = require('../database/db')

const createCourseMonthExam = async(req, res) => {
    const {status, description, score, idExamType, idCourseMonth, idCourse} = req.body;
    const columnas = '(status, description, score, id_exam_type, id_course_month, id_course)';
    const values = '($1, $2, $3, $4, $5, $6)';
    const data = [status, description, score, idExamType, idCourseMonth, idCourse];
    console.log(data)
    await pool.query('INSERT INTO course_month_exam' + columnas + 'VALUES' + values, data);
    res.json({message: 'create course month exam'});
}

const getCourseMonthExams = async(req, res) => {
    const idCourseMonth = parseInt(req.params.idCourseMonth);
    const response = await pool.query(`SELECT ME.*, ET.name AS exam_type FROM course_month_exam ME 
        INNER JOIN exam_type ET ON ME.id_exam_type = ET.id_exam_type
        WHERE id_course_month = ${idCourseMonth} ORDER BY ME.id_course_month_exam`);
    res.json(response.rows);
    console.log(response.rows)
}

const getCourseMonthExam = async(req, res) => {
    const idCourseMonthExam = parseInt(req.params.idCourseMonthExam);
    const response = await pool.query('SELECT * FROM course_month_exam WHERE id_course_month_exam = $1', [idCourseMonthExam]);
    res.json(response.rows[0]);
    console.log(response.rows[0])
}

const updateCourseMonthExam = async (req, res) => {
    const idCourseMonthExam = parseInt(req.params.idCourseMonthExam);
    const {status, description, score, idExamType} = req.body
    const columns = 'status=$1, description=$2, score=$3, id_exam_type=$4'
    const data = [status, description, score, idExamType]
    await pool.query('UPDATE course_month_exam SET ' + columns + `WHERE id_course_month_exam = ${idCourseMonthExam}`, data)
    res.json({'message': 'update course month exam'});
}

const deleteCourseMonthExam = async(req, res) => {
    const idCourseMonthExam = parseInt(req.params.idCourseMonthExam);
    await pool.query('DELETE FROM course_month_exam WHERE id_course_month_exam = $1', [idCourseMonthExam]);
    res.json({message: 'delete course'});
}

module.exports = {
    createCourseMonthExam,
    getCourseMonthExams,
    getCourseMonthExam,
    updateCourseMonthExam,
    deleteCourseMonthExam
}