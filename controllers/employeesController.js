const Employee = require('../model/Employee');

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find();
    if (!employees) return res.status(204).json({ 'message': 'No employees found.' });
    res.json(employees);
}

const createNewEmployee = async (req, res) => {
    if (!req?.body?.username || !req?.body?.downlog) {
        return res.status(400).json({ 'message': 'First and last names are required' });
    }

    try {
        const result = await Employee.create({
            username: req.body.username,
            downlog: req.body.downlog
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateEmployee = async (req, res) => {
    if (!req?.body?.username || !req?.body?.downlog) {
        return res.status(400).json({ 'message': 'username and download log are required' });
    }

    const employee = await Employee.findOne({ username: req.body.username }).exec();
    if (!employee) {
        // return res.status(204).json({ "message": `No employee matches ID ${req.body.username}.` });
        try {
            const result = await Employee.create({
                username: req.body.username,
                downlog: [
                    {
                        fileName: req.body.downlog.fileName,
                        time: req.body.downlog.time,
                        device: req.body.downlog.device
                    }
                ]
            });
            res.status(201).json(result);
        } catch (err) {
            console.error(err);
        }
    } else {
        employee.downlog.push(req.body.downlog);
        const result = await employee.save();
        res.json(result);
    }
}

const deleteEmployee = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Employee ID required.' });

    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!employee) {
        return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
    }
    const result = await employee.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const getEmployee = async (req, res) => {
    if (!req?.params?.username) return res.status(400).json({ 'message': 'Employee ID required.' });

    const employee = await Employee.findOne({ username: req.params.username }).exec();
    if (!employee) {
        return res.status(204).json({ "message": `No employee matches ID ${req.params.username}.` });
    }
    res.json(employee.downlog);
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}