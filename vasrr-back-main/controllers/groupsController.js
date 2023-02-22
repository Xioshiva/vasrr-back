const Group = require('../model/Group');
const User = require('../model/User');

const nodemailer = require("nodemailer");
const { default: mongoose } = require('mongoose');

const creatGroup = async (req, res) => {
    console.log(req.body);
    const {name} = req.body;
    if (!name) return res.status(400).json({ 'message': 'Groupe name are required.' });

    // check for duplicate namenames in the db
    const duplicate = await Group.findOne({name : name}).exec();
    if (duplicate) return res.sendStatus(409); //Conflict

    try{
        //create and store the new name
        const result = await Group.create({
            "name": name,
        });

        console.log(result);

        res.status(201).json({ 'success': `New Group ${name} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}


const getAllGroups = async (req, res) => {
    const Groups = await Group.find();
    if (!Groups) return res.status(204).json({ 'message': 'No Groups found' });
    res.json(Groups);
}

const deleteGroup = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'Group ID required' });
    const group = await Group.findOne({ _id: req.params.id }).exec();
    if (!group) {
        return res.status(204).json({ 'message': `Group ID ${req.params.id} not found` });
    }
    const result = await Group.deleteOne({ _id: req.params.id });
    res.json(result);
}


const getGroup = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'Group ID required' });
    const duplicate = await Group.findOne({ _id: req.params.id }).exec();
    if (!duplicate) {
        return res.status(204).json({ 'message': `Group ID ${req.params.id} not found` });
    }
    res.json(Group) = async (req, res) => {
        if (!req?.params?.id) return res.status(400).json({ "message": 'Group ID required' });
        const Group = await Group.findOne({ _id: req.params.id }).exec();
        if (!Group) {
            return res.status(204).json({ 'message': `Group ID ${req.params.id} not found` });
        }
        res.json(Group)
    }
}

const addUserToGroup = async (req, res) => {
    console.log("adding new user to group");
    console.log(req.body.id);
    if (!req?.body?.id) return res.status(400).json({ "message": 'Group ID required' });
    const duplicate = await Group.findOne({ _id: req.body.id }).exec();
    if (!duplicate) {
        return res.status(204).json({ 'message': `Group ID ${req.body.id} not found` });
    }
    console.log(req.body.userId.length);
    var result = [];
    for (let i = 0; i < req.body.userId.length; i++) {
        const res = await Group.updateOne({ _id: req.body.id }, { $addToSet: { users: mongoose.Types.ObjectId(req.body.userId[i]) } });
        console.log(res);
        result.push(res);
    }
    res.json(result);
}


const removeUserFromGroup = async (req, res) => {
    console.log("removing user from group2");
    if (!req?.params?.id) return res.status(400).json({ "message": 'Group ID required' });
    const tmp = await Group.findOne({ _id: req.params.id }).exec();
    if (!tmp) {
        return res.status(204).json({ 'message': `Group ID ${req.params.id} not found` });
    }
    const result = await Group.updateOne({ _id: req.params.id }, { $pull: { users: req.params.userId } });
    res.json(result);
}

const updateGroup = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": 'Group ID required' });
    const Group = await Group.findOne({ _id: req.body.id }).exec();
    if (!Group) {
        return res.status(204).json({ 'message': `Group ID ${req.body.id} not found` });
    }
    const result = await Group.updateOne({ _id: req.body.id }, { $set: { name: req.body.name } });
    res.json(result);
}

const getGroupUsers = async (req, res) => {
    console.log("getting group users");
    if (!req?.params?.id) return res.status(400).json({ "message": 'Group ID required' });
    const duplicate = await Group.findOne({ _id: req.params.id }).exec();
    if (!duplicate) {
        return res.status(204).json({ 'message': `Group ID ${req.params.id} not found` });
    }
    res.json(duplicate.users);
}

const sendEmailToGroup = async (req, res) => {

    if (!req?.params?.id) return res.status(400).json({ "message": 'Group ID required' });
    const group = await Group.findOne({ _id: req.params.id }).exec();
    if (!group) {
        return res.status(204).json({ 'message': `Group ID ${req.params.id} not found` });
    }
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'No users found' });

    //get all users emails from specific group
    const emails = [];
    for (let i = 0; i < users.length; i++) {
        if (group.users.includes(users[i]._id)) {
            emails.push(users[i].email);
        }
    }

    console.log(emails);
    console.log(process.env.SENDER_EMAIL);
    console.log(process.env.SENDER_PASSWORD);
    // const emails = users.email.filter(user => group.users.includes(user._id));
    // console.log(emails);

    var transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD
        }
    });

    // send mail with defined transport object
    var mailOptions = {
        from: process.env.EMAIL_USER,
        to: emails,
        subject: req.body.subject,
        text: req.body.text
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    }); 

}


module.exports = {
    creatGroup,
    getAllGroups,
    deleteGroup,
    getGroup,
    addUserToGroup,
    removeUserFromGroup,
    updateGroup,
    getGroupUsers,
    addUserToGroup,
    sendEmailToGroup
}