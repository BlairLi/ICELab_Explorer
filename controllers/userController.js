const User = require('../model/User');

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
}

const deleteUser = async (req, res) => {
    if (!req?.params?.username) return res.status(400).json({ "message": 'User ID required' });
        const user = await User.findOne({ username: req.params.username }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params.username} not found` });
    }
    const result = await user.deleteOne({ username: req.params.username });
    res.json(result);
    }
    
const permitUser = async (req, res) => {
    if (!req?.body?.username) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ username: req.body.username }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.body.username} not found` });
    }
    if (req.body?.roles) user.roles = req.body.roles;
    const result = await user.save();
    res.json(result);
}

const getUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
    }
    res.json(user);
}

module.exports = {
    getAllUsers,
    deleteUser,
    getUser,
    permitUser
}