

const giveHTML = ({ name, email, phone, PAN, address, amount, project }) => {
    const currentDate = new Date()
    return `
    <!DOCTYPE html>       
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Donation Receipt</title>
</head>
<body style="font-family: Arial, sans-serif;">

<div style="border: 2px solid black; padding: 1rem; width: 30rem;  font-size: 0.875rem; display: flex; flex-direction: column;">

<div style="border-bottom: 2px solid black; display: flex; justify-content: space-between; align-items: center;">
    <img style="width: 7rem;" src="https://i.postimg.cc/vmH5jVzy/logo.jpg" alt="" />
    <div style="flex: 1; padding: 1rem; display: flex; flex-direction: column; align-items: center;">
        <span style="font-weight: bold;">CARNATIC FOUNDATION</span>
        <span style="font-size: 0.875rem; text-align: center;">No:2, DEJU PLAZA, SOUTH AVENUE , SRINAGAR COLONY, SAIDAPET, CHENNAI - 600029</span>
    </div>
</div>

<div style="padding: 1rem 0; border-bottom: 2px solid black; display: flex; justify-content: space-between;">
    <div>No. 1234</div>
    <div style="font-weight: bold;">DONATION RECEIPT</div>
    <div>Date. ${currentDate.toDateString()}</div>
</div>

<div style="padding: 0.5rem 0; border-bottom: 2px solid black; text-align: center;">
    Donations are exempted Under 80-G of the Income Tax Act 1961
</div>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; padding: 1rem 0; border-bottom: 2px solid black;">
    <div>
    <b>Form 12 A No:</b> AABTC8873EF2021101
    </div>
    <div>
    <b>REG NO:</b> 56/2016
    </div>
    <div>
    <b>80 G NUMBER:</b> AABTC8873EF20211
    </div>
    <div>
    <b>PAN NO:</b> AABTC8873E
    </div>
</div>

<div style="display: flex; flex-direction: column; justify-content: space-between; padding: 1rem 0; border-bottom: 2px solid black;">
    <div>Received with thanks from <b>${name}</b></div>
    <div>Sum of Rupees: <b>${amount}</b></div>
    <div>Donation towards: <b>${project}</b></div>
    <div>Address: <b>${address}</b></div>
</div>

<div style="display: flex; flex-direction: column; justify-content: space-between; padding: 1rem 0; border-bottom: 2px solid black;">
    <div>Contact: <b>${phone}</b></div>
    <div>PAN: <b>${PAN}</b></div>
    <div>Email: <b>${email}</b></div>
</div>

<div style="border-bottom: 2px solid black; padding: 1rem 0;">
    Thank You - Received INR. <b>${amount}<b> For CARNATIC FOUNDATION
</div>

<div style="display: flex; flex-direction: column; align-items: center; padding: 1rem 0; line-height: 1.5;">
    <div style="font-family: monospace; font-size: 0.875rem;">This is a computer-generated receipt and no signature required</div>
    <div style="display: flex; justify-content: space-between; margin-top: 0.5rem;">
        <div>For Queries - Email: <b>trustee@carnaticfoundation.in</b></div>
        <div>Phone: <b>9884232121</b></div>
    </div>
</div>

</div>


</body>
</html>
    
    `
}

module.exports = giveHTML