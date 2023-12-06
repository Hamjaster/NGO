
// Function to generate a 5-digit unique number
const generateUniqueNumber = () => {
    const timestamp = Date.now().toString(); // Get current timestamp
    const randomNumber = Math.floor(Math.random() * 90000) + 10000; // Generate a random number between 10000 and 99999

    // Combine timestamp and random number, then ensure it's 5 digits long
    let uniqueNumber = (timestamp + randomNumber).slice(-5); // Take the last 5 digits

    return uniqueNumber;
};

const giveHTML = ({ name, email, phone, PAN, address, amount, project }) => {
    const uniqueNumber = generateUniqueNumber();
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0'); // Ensures two digits for day
    const monthAbbrev = months[date.getMonth()];
    const year = date.getFullYear();

    const currentDate = `${day} ${monthAbbrev} ${year}`;
    return `
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Donation Receipt</title>
    </head>
    
    <body style="font-family: Arial, sans-serif;margin: 0; padding: 16px;">

    
    <div style="font-size : 15px; line-height: 25px">
    Dear <b>${name} </b>,
    <div style="margin-top: 5px;">
        &emsp; &emsp; &emsp;We sincerely thank you for your generous donation of <b>INR ${amount}</b> in support of
        <b>${project}</b>.
        It is through the incredible support of donors like you that we are able to continue providing crucial
        projects. We truly appreciate you making the choice not only to contribute to Carnatic Foundation today but
        also to stand with us as a supporter in the future.
    </div>
    <div style="margin-bottom: 24px; margin-top: 5px;">
        Please find the receipt below. Thank you once again for your tremendous generosity. We are so grateful for
        your support.
    </div>

    <div> Yours truly,</div>
    <div> Carnatic Foundation</div>
    <div style="margin-top: 22px;"> P.S : Tax Exemption certificate will be sent to you shortly.</div>

</div>

    

<table width="100%" border="0" cellpadding="0" cellspacing="0"
style="border: 2px solid black; width: 30rem; font-size: 0.875rem; padding : 20px; margin : 44px 0px;">
<!-- Header -->
<tr>
    <td colspan="2" style="border-bottom: 2px solid black;">
        <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td style="border-bottom: 2px solid black; text-align: left;">
                    <img style="width: 7rem;" src="https://i.postimg.cc/vmH5jVzy/logo.jpg" alt="Logo" />
                </td>
                <td style="border-bottom: 2px solid black; text-align: center; padding: 1rem;">
                    <b style="font-weight: bold;">CARNATIC FOUNDATION</b><br>
                    <span>No:2, DEJU PLAZA, SOUTH AVENUE, SRINAGAR COLONY, SAIDAPET </span>
                    <div>CHENNAI - 600029</div>
                </td>
            </tr>
        </table>
    </td>
</tr>

<!-- Receipt details -->
<tr>
    <td colspan="3" style="border-bottom: 2px solid black; padding : 8px 0px">
        <table width="100%" cellpadding="0" cellspacing="0">
            <tbody>
                <tr
                    style="/* display: flex; *//* justify-content: space-between; *//* align-items: center; */font-size: 14px;">
                    <td style="
                        width: 33%;
                        ">No. 123
                    </td>
                    <td style="font-weight: bold;width: 33%;/* font-size: 13px; */">DONATION RECEIPT</td>
                    <td style="
                        width: 33%;
                        text-align: end;
                        ">Date : ${currentDate}
                    </td>
                </tr>
            </tbody>
        </table>
    </td>
</tr>

<!-- Other sections... -->
<tr>
    <td colspan="2" style="border-bottom: 2px solid black;">
        <div style="padding: 0.5rem 0; text-align: center;"><b>Donations are exempted Under 80-G of the Income
                Tax Act 1961</b></div>
    </td>
</tr>

<tr>
    <td colspan="2" style="border-bottom: 2px solid black;">
        <table width="100%" cellpadding="0" cellspacing="0" style="padding: 1rem 0;">
            <tr>
                <td><b>Form 12 A No:</b> AABTC8873EF2021101</td>
                <td><b>REG NO:</b> 56/2016</td>
            </tr>
            <tr>
                <td><b>80 G NUMBER:</b> AABTC8873EF20211</td>
                <td><b>PAN NO:</b> AABTC8873E</td>
            </tr>
        </table>
    </td>
</tr>

<!-- Donation details -->
<tr>
    <td colspan="2" style="border-bottom: 2px solid black;">
        <table width="100%" cellpadding="0" cellspacing="0" style="padding: 1rem 0;">
            <tr>
                <td>Received with thanks from <b>${name}</b></td>
            </tr>
            <tr>
                <td>Sum of Rupees(INR): <b>${amount}</b></td>
            </tr>
            <tr>
                <td>Donation towards: <b>${project}</b></td>
            </tr>
            <tr>
                <td>Address: <b>${address}</b></td>
            </tr>
        </table>
    </td>
</tr>

<!-- Contact details -->
<tr>
    <td colspan="2" style="border-bottom: 2px solid black;">
        <table width="100%" cellpadding="0" cellspacing="0" style="padding: 1rem 0;">
            <tr>
                <td>Contact: <b>+${phone}</b></td>
            </tr>
            <tr>
                <td>PAN: <b>${PAN}</b></td>
            </tr>
            <tr>
                <td>Email: <b>${email}</b></td>
            </tr>
        </table>
    </td>
</tr>

<!-- Thank you message -->
<tr>
    <td colspan="2" style="border-bottom: 2px solid black;">
        <div style="padding: 1rem 0;">
            Thank You - Received <b>INR${amount}</b> for CARNATIC FOUNDATION
        </div>
    </td>
</tr>

<!-- Footer message -->
<tr>
    <td colspan="2">
        <table width="100%" cellpadding="0" cellspacing="0" style="padding: 1rem 0;">
            <tr>
                <td
                    style="/* font-family: monospace; */font-size: 12px;letter-spacing: -0.2;text-align: center;">
                    This is a computer-generated receipt and no signature required
                </td>
            </tr>
            <tr>
                <td>
                    <div style="margin-top: 1.2rem; font-size: 14px;">
                        <div>For Queries</div>
                        <div
                            style="display: flex; flex-direction: row; justify-content: space-between; margin-top: 12px;">
                            <div>Email: <b>trustee@carnaticfoundation.in</b></div>
                            <div>Phone: <b>9884232121</b></div>
                        </div>
                    </div>
                </td>
            </tr>
        </table>
    </td>
</tr>

</table>


    
    </body>
    
    </html>
        
        `
}

module.exports = giveHTML