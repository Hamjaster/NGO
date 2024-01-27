const Carnatic = require("../../models/CarnaticMember");
const { Donation } = require("../../models/DonationSchema");


const getMembers = async (req, res) => {
    try {
        const members = await Carnatic.find();
        const modifiedMembers = members.map(member => {
            return {
                id: member._id,
                name: member.name,
                PAN: member.PAN,
                email: member.email,
                phone: member.phone,
                address: member.address,
                donation: member.donation
            }
        })
        res.json({
            success: true,
            message: modifiedMembers
        });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

const editMember = async (req, res) => {
    const memberId = req.params.id;

    try {
        // Find the Carnatic member by ID
        const carnaticMember = await Carnatic.findById(memberId);

        // Check if the member exists
        if (!carnaticMember) {
            return res.status(404).json({ success: false, message: 'Carnatic member not found.' });
        }
        console.log(req.body)
        // Use the spread operator to update Carnatic member properties
        carnaticMember.set({ ...carnaticMember, ...req.body });

        // Save the updated Carnatic member
        const updatedCarnaticMember = await carnaticMember.save();

        res.json({ success: true, message: 'Carnatic member updated successfully.', member: updatedCarnaticMember });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

const addMember = async (req, res) => {
    const newMember = new Carnatic({
        name: req.body.name,
        PAN: req.body.PAN,
        email: req.body.email,
        phone: req.body.phone,
        display_name: req.body.display_name,
        timestamp: req.body.timestamp,
        address: req.body.address,
        donation: req.body.donation
    });

    try {
        const savedMember = await newMember.save();
        res.status(201).json(savedMember);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const deleteMember = async (req, res) => {
    const { ids } = req.body
    console.log(ids)
    try {
        for (id of ids) {
            await Carnatic.findByIdAndDelete(id);
        }
        res.json({ success: true, message: `All members deleted` });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

const getTransactions = async (req, res) => {
    const carnaticId = req.params.id;

    try {
        // Find the Carnatic member by their _id
        const carnaticMember = await Carnatic.findById(carnaticId);

        if (!carnaticMember) {
            return res.status(404).json({ message: 'Carnatic member not found' });
        }

        // Find all donations associated with the Carnatic member
        const donations = await Donation.find({ carnaticDonor: carnaticId });

        // const donations = await Donation.Donation.fi

        res.status(200).json({ success: true, message: donations });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

module.exports = { getMembers, addMember, deleteMember, getTransactions, editMember }