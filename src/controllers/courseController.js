const pool = require('../database/db')
const format = require('pg-format');    //consultas SQL dinámicas - compatible con los búferes, matrices y objetos de Node

const createCourse = async(req, res) => {
    const {name, description, idCycle, idUser} = req.body;
    const columnas = '(name, description, id_cycle, id_user)';
    const values = '($1, $2, $3, $4)';
    const data = [name, description, idCycle, idUser];
    const resCourse = await pool.query('INSERT INTO course' + columnas + 'VALUES' + values + 'RETURNING id_course', data);
    res.json({message: 'create course'});

    const resCycle = await pool.query(`SELECT id_catalogue_cycle FROM cycle WHERE id_cycle = ${idCycle}`);

    const idCourse = resCourse.rows[0].id_course
    if(resCycle.rows[0].id_catalogue_cycle == 1){

        const data = [['Febrero', idCourse], ['Marzo', idCourse], ['Abril', idCourse], ['Mayo', idCourse], ['Junio', idCourse]];
        pool.query(format('INSERT INTO course_month (month, id_course) VALUES %L', data), [], (err, result) => {
            if(err) return console.log(err);
            //console.log(result);
        });
    } else if (resCycle.rows[0].id_catalogue_cycle == 2){
        const data = [['Julio', idCourse], ['Agosto', idCourse], ['Septiembre', idCourse], ['Octubre', idCourse], ['Noviembre', idCourse]];
        pool.query(format('INSERT INTO course_month (month, id_course) VALUES %L', data), [], (err, result) => {
            if(err) return console.log(err);
            //console.log(result);
        });
    }
    
}

const getCourses = async (req, res) => {
    const response = await pool.query('SELECT * FROM course');
    res.status(200).json(response.rows);
}

const getCoursesUser = async (req, res) => {
    const idUser = parseInt(req.params.idUser);
    const response = await pool.query('SELECT * FROM course WHERE id_user = $1 ORDER BY id_course', [idUser]);
    res.status(200).json(response.rows);
}

const getCourse = async(req, res) => {
    const idCourse = parseInt(req.params.idCourse);
    const resCourse = await pool.query('SELECT * FROM course WHERE id_course = $1', [idCourse]);
    const resCourseMonth = await pool.query('SELECT * FROM course_month WHERE id_course = $1', [idCourse]);
    resCourse.rows[0].courseMonth = resCourseMonth.rows
    res.json(resCourse.rows[0]);
}

const deleteCourse = async(req, res) => {
    const idCourse = req.params.idCourse
    await pool.query('DELETE FROM course WHERE id_course = $1', [idCourse]);
    res.json({message: 'delete course'});
}

module.exports = {
    createCourse,
    getCourses,
    getCoursesUser,
    getCourse,
    deleteCourse
}