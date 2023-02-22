const Evaluation = require('../model/Evaluation');
const User = require('../model/User');
const Scenario = require('../model/Scenario');


const createEvaluation = async (req, res) => {
    console.log(req.body);
    const {annotations, time, scenario} = req.body;
    if (!annotations) return res.status(400).json({ 'message': 'Evaluation annotations are required.' });
    if (!time) return res.status(400).json({ 'message': 'Evaluation time are required.' });
    // if (!user) return res.status(400).json({ 'message': 'Evaluation user are required.' });
    if (!scenario) return res.status(400).json({ 'message': 'Evaluation scenario are required.' });


    try{
        const result = await Evaluation.create({
            "annotations": annotations,
            "time": time,
            // "user": user,
            "scenario": scenario
        });

        console.log(result);

        res.status(201).json({ 'success': `New Evaluation created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const getAllEvaluations = async (req, res) => {
    const Evaluations = await Evaluation.find();
    if (!Evaluations) return res.status(204).json({ 'message': 'No Evaluations found' });
    res.json(Evaluations);
}

const getEvalutionsByScenarioID = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'Scenario ID required' });
    const evaluations = await Evaluation.find({ Scenario: req.params.id }).exec();
    if (!evaluations) return res.status(204).json({ 'message': `No Evaluations found for Scenario ID ${req.params.id}` });
    res.json(evaluations);
}

const getEvalutionByID = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'Evaluation ID required' });
    const evaluation = await Evaluation.findOne({ _id: req.params.id }).exec();
    if (!evaluation) return res.status(204).json({ 'message': `Evaluation ID ${req.params.id} not found` });
    res.json(evaluation);
}


module.exports = {
    createEvaluation,
    getEvalutionsByScenarioID,
    getEvalutionByID,
    getAllEvaluations
}