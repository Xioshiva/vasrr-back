const Scenario = require('../model/Scenario');
const Group = require('../model/Group');
const { default: mongoose } = require('mongoose');

const createScenario = async (req, res) => {
    console.log(req.body);
    const {name, conf} = req.body;
    if (!name) return res.status(400).json({ 'message': 'Scenario name are required.' });

    const duplicate = await Scenario.findOne({name : name}).exec();
    if (duplicate) return res.status(400).json({ 'message': 'Scenario name already exists.' });
    try{
        //create and store the new name
        const result = await Scenario.create({
            "name": name,
            "conf": conf,
        });
        console.log(result);
        res.status(201).json(result._id);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}


const getAllScenarios = async (req, res) => {
    const Scenarios = await Scenario.find();
    if (!Scenarios) return res.status(204).json({ 'message': 'No Scenarios found' });
    res.json(Scenarios);
}

const deleteScenario = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'Scenario ID required' });
    const scenario = await Scenario.findOne({ _id: req.params.id }).exec();
    if (!scenario) {
        return res.status(204).json({ 'message': `Scenario ID ${req.params.id} not found` });
    }
    const result = await Scenario.deleteOne({ _id: req.params.id });
    res.json(result);
}

const getScenarioByID = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'Scenario ID required' });
    const scenario = await Scenario.findOne({ _id: req.params.id }).exec();
    if (!scenario) {
        return res.status(204).json({ 'message': `Scenario ID ${req.params.id} not found` });
    }
    res.json(scenario);
}

const addGroupToScenario = async (req, res) => {
    console.log("adding new group to scenario");
    if (!req?.params?.id) return res.status(400).json({ "message": 'Scenario ID required' });
    if (!req?.params?.groupId) return res.status(400).json({ "message": 'Group ID required' });
    const scenario = await Scenario.findOne({ _id: req.params.id }).exec();
    if (!scenario) {
        return res.status(204).json({ 'message': `Scenario ID ${req.params.id} not found` });
    }
    const group = await Group.findOne({ _id: req.params.groupId }).exec();
    if (!group) {
        return res.status(204).json({ 'message': `Group ID ${req.params.groupId} not found` });
    }
    const result = await Scenario.updateOne({ _id: req.params.id }, { $addToSet: { groups: mongoose.Types.ObjectId(req.params.groupId) } });
    console.log(result);
    res.json(result);
}

const updateScenario = async (req, res) => {
    console.log("updating scenario");
    if (!req?.params?.id) return res.status(400).json({ "message": 'Scenario ID required' });
    const scenario = await Scenario.findOne({ _id: req.params.id }).exec();
    if (!scenario) {
        return res.status(204).json({ 'message': `Scenario ID ${req.params.id} not found` });
    }
    const result = await Scenario.updateOne({ _id: req.params.id }, { $set: { conf: req.body.conf } });
    console.log(result);
    res.json(result);
}

module.exports = {
    createScenario,
    getAllScenarios,
    deleteScenario,
    getScenarioByID,
    addGroupToScenario,
    updateScenario
}


