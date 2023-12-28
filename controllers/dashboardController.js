const Dashboard = require('../model/Dashboard');

const handleDashboard = async (req, res) => {
    if (!req?.body?.username) return res.status(400).json({ "message": 'Dashboard username required' });
    const { username, plotGraph } = req.body;
    const dashboard = await Dashboard.findOne({ username: req.body.username }).exec();
    var result = null;
    if (!dashboard) {
        try {
            //create and store the new user
            result = await Dashboard.create({
                "username": username,
                "plotGraph": plotGraph
            });
            console.log("result: "+result);
            // return res.status(201).json({ 'success': `New Dashboard ${username} created!` });
            res.json(result);
        } catch (err) {
            res.status(500).json({ 'message': err.message });
        }
    }
    else{
        dashboard.plotGraph = req.body.plotGraph;
        result = await dashboard.save();
        res.json(result);
    }
}

const getDashboard = async (req, res) => {
    if (!req?.params?.username) return res.status(400).json({ "message": 'Username required' });
        const dashboard = await Dashboard.findOne({ username: req.params.username }).exec();
    if (!dashboard) {
        return res.status(204).json({ 'message': `User ID ${req.params.username} not found` });
    }
    const plotGraph = dashboard.plotGraph
    res.json(plotGraph);
}

module.exports = { handleDashboard, getDashboard };