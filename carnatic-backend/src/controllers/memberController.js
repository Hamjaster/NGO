const { model } = require("mongoose")
const Member = require("../models/CarnaticMember")

const findMember = async (req, res) => {
    const { phone } = req.params;
    try {
        const member = await Member.findOne({
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
        const isAlreadyRegistered = await Member.findOne({ phone: data.phone })
        if (isAlreadyRegistered) {
            return res.json({
                error: true,
                message: "The user is already present"
            })
        } else {
            const member = await Member.create(data)
            return res.json(member)
        }
    } catch (error) {
        return res.json(error)
    }
}

module.exports = { findMember, createMember }