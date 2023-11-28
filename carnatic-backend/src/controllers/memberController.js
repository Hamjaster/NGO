const { model } = require("mongoose")
const Guest = require("../models/GuestSchema");
const Carnatic = require("../models/CarnaticMember");

const findMember = async (req, res) => {
    const { phone } = req.params;
    try {
        const member = await Carnatic.findOne({
            phone
        })
        return res.send(member)
    } catch (error) {
        return res.send(error)
    }
}

const createMember = async (req, res) => {
    const data = req.body
    try {
        const isAlreadyRegistered = await Guest.findOne({ phone: data.phone })
        if (isAlreadyRegistered) {

            const member = await Guest.findByIdAndUpdate(isAlreadyRegistered._id, data, { new: true })
            res.send(member)
            console.log('member updated')

        } else {
            const member = await Guest.create(data)
            return res.send(member)
        }
    } catch (error) {
        return res.send(error)
    }
}

const getAllMembers = async (req, res) => {
    try {
        const members = await Guest.find()
        res.send(members)
    } catch (error) {
        res.send(error)
    }
}

module.exports = { findMember, createMember, getAllMembers }