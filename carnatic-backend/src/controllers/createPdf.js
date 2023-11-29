const pdf = require('html-pdf')
const path = require('path')
const giveHTML = require('../documents/document')

const createPdf = async (body) => {
    console.log('creating pdf');
    pdf.create(giveHTML(body), {}).toFile('invoice.pdf', (err) => {
        if (err) {
            res.send({ success: false, msg: err })
        } else {
            res.send({ success: true, msg: 'PDF genereated successfully' })
        }
    })
}

const fetchPdf = (req, res) => {
    res.sendFile(path.join(path.dirname(__dirname), 'invoice.pdf'))
}

module.exports = { createPdf, fetchPdf }