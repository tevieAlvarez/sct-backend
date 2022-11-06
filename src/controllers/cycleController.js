const pool = require('../database/db')

/*const createCycle = async(req, res) => {
    const {year, startMonth, endMonth} = req.body;
    const columnas = '(start_month, end_month, year)';
    const values = '($1, $2, $3)';
    const data = [startMonth, endMonth, year];
    console.log(data)
    await pool.query('INSERT INTO cycle' + columnas + 'VALUES' + values, data);
    res.json({message: 'create cycle'});
}*/

const createCycle = async(req, res) => {
    const {year, idCatalogueCycle} = req.body;
    const columnas = '(year, id_catalogue_cycle)';
    const values = '($1, $2)';
    const data = [year, idCatalogueCycle];
    console.log(data)
    await pool.query('INSERT INTO cycle' + columnas + 'VALUES' + values, data);
    res.json({message: 'create cycle'});
}

const getCycles = async (req, res) => {
    const response = await pool.query(`SELECT * FROM cycle C 
        INNER JOIN catalogue_cycle CC ON C.id_catalogue_cycle = CC.id_catalogue_cycle
        ORDER BY C.id_cycle`);
    res.status(200).json(response.rows);
}

const getCycle = async(req, res) => {
    const idCycle = parseInt(req.params.idCycle);
    const response = await pool.query('SELECT * FROM cycle WHERE id_cycle = $1', [idCycle]);
    res.json(response.rows[0]);
}

const deleteCycle = async(req, res) => {
    const idCycle = req.params.idCycle
    await pool.query('DELETE FROM cycle WHERE id_cycle = $1', [idCycle]);
    res.json({message: 'delete cycle'});
}

module.exports = {
    createCycle,
    getCycles,
    getCycle,
    deleteCycle
}