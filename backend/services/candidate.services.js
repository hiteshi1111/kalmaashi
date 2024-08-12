const Candidate = require('../schemas/candidate.schema');
const { randomBytes } = require('crypto');
const nodemailer = require('nodemailer')

let service = {}
// service.registerCandidate = registerCandidate;
service.draftCandidate = draftCandidate;

async function draftCandidate(body) {
  // const existingCandidate = await Candidate.findOne({ email: body.email, paid: true });
  const existingCandidate = await Candidate.findOne({ email: body.email });
  if (existingCandidate) {
    return Promise.reject({ error: 'Email already registered' });;
  }

  // generate a unique id
  function generateUniqueId() {
    const now = Date.now().toString().slice(-5);
    const random = randomBytes(2).toString('hex').slice(0, 5);
    return now + random;
  }

  const registrationNumber = `KAL${generateUniqueId()}`;
  try {
    const candidate = await Candidate.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      registrationId: registrationNumber,
      birthDay: body.birthDay,
    });
    await generateCandidateMail(candidate);
    await generateEmail(candidate.firstName, candidate.registrationId, candidate.email);
    return { candidateId: candidate._id };
  } catch (err) {
    return Promise.reject({ error: 'Server error1' });
  }
}

// async function registerCandidate(body) {
//   const { candidateId, transactionId } = body;
//   try {
//     const candidate = await Candidate.findOneAndUpdate({ _id: candidateId }, {transactionId: transactionId, paid: true}, { new: true });
//     await generateCandidateMail(candidate);
//     await generateEmail(candidate.firstName, candidate.registrationId, transactionId, candidate.email);
//     return candidate;
//   } catch (err) {
//     return Promise.reject({ error: 'Server error2' });
//   }
// }

async function generateCandidateMail(candidate) {
  const { email, firstName, registrationId } = candidate;
  const emailTemplate = `
    <html>
    <head>
    </head>
    <body>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f4f5f6; width: 100%;" width="100%" bgcolor="#f4f5f6">
      <tr>
        <td class="container" style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; max-width: 600px; padding: 0;  width: 600px; margin: 0 auto;" width="600" valign="top">
          <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 600px; padding: 0;">
          <img
            src="https://www.kalmaashi.com/static/5365bf8db0cfb80478f01b1853a06276/5214f/logo-desk.webp"
            alt="kalmaashi"
          />
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="main" style="padding:20px; border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; width: 100%;" width="100%">
                <tr>
                    <td class="wrapper" style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box;padding-bottom:20px;" valign="top">
                      <b>Subject:</b> Kalmaashi Talent Hunt Show Registration Confirmation
                    </td>
                </tr>
                <tr>
                    <td class="wrapper" style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box;padding-bottom:20px;" valign="top">
                      Dear ${firstName},
                    </td>
                </tr>
                <tr>
                    <td class="wrapper" style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; padding-bottom:15px;" valign="top">
                      Thank you for registering for the Talent Hunt Show! We are thrilled to have you showcase your talent with us. Whether you've chosen to submit your art online or to perform live at the event, we are eager to see what you have in store.
                    </td>
                </tr>
                <tr>
                    <td class="wrapper" style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; padding-bottom:15px;" valign="top">
                      Here are the details of your registration:
                    </td>
                </tr>
                <tr>
                    <td class="wrapper" style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; padding-bottom:15px;" valign="top">
                      <b>Registration Number:</b> ${registrationId}
                    </td>
                </tr>
                <tr>
                    <td class="wrapper" style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; padding-bottom:15px;" valign="top">
                      Please keep this registration number handy, as it will be required for all future communications and on the day of the event. This unique number helps us ensure that every participant receives personalized attention and that their submission is properly catalogued.
                    </td>
                </tr>
                <tr>
                    <td class="wrapper" style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; padding-bottom:15px;" valign="top">
                      If you've opted for the online art submission, please follow the link below provided on the submission portal.
                    </td>
                </tr>
                <tr>
                    <td class="wrapper" style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; padding-bottom:15px;" valign="top">
                      <a href="https://forms.gle/GoRRc3ufU38AKcoB9" target="_blank" style="box-sizing: border-box; cursor: pointer; font-size: 16px; font-weight: bold; margin: 0;text-decoration: none;">Click Here </a>
                    </td>
                </tr>
                <tr>
                    <td class="wrapper" style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; padding-bottom:15px;" valign="top">
                      Should you have any questions or require further assistance, feel free to contact us. We're here to help!
                    </td>
                </tr>
                <tr>
                    <td class="wrapper" style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; padding-bottom:20px;" valign="top">
                      We're looking forward to an exciting event and can't wait to witness the array of talents. Thank you for being a part of this journey.
                    </td>
                </tr>
                <tr>
                    <td class="wrapper" style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; padding-bottom:20px;" valign="top">
                      <b>Best regards</b>
                    </td>
                </tr>
                <tr>
                    <td class="wrapper" style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; padding-bottom:5px;" valign="top">
                      Kalmaashi
                    </td>
                </tr>
                <tr>
                    <td class="wrapper" style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; padding-bottom:5px;" valign="top">
                      Mileeta Kaushik (Business Head) 
                    </td>
                </tr>
                <tr>
                    <td class="wrapper" style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; padding-bottom:5px;" valign="top">
                    <a href="mailto:${"info@kalmaashi.com"}" style="color: #mailto:071e43;">${"info@kalmaashi.com"}</a> 
                    </td>
                </tr>
                <tr>
                    <td class="wrapper" style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; padding-bottom:5px;" valign="top">
                    <a href="tel:${"7087300675"}" style="color: #071e43;">${"+91 7087300675"}</a>
                    </td>
                </tr>
            </table>      
        </div>
        </td>
      </tr>
    </table>
    </body>
    </html>`;
  try {
    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      // host: process.env.GOOGLE_HOST,
      // port: 465,
      // secure: true, // true for 465, false for other ports
      service: "gmail",
      auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASSWORD
      }
    });

    // Define email content
    const mailOptions = {
      from: process.env.GOOGLE_EMAIL, // sender address
      to: email, // list of receivers
      subject: "Kalmaashi Talent Hunt Show Registration Confirmation", // Subject line
      html: emailTemplate, // html body
    };

    // Send email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    return Promise.reject({ error: 'Error sending email' });;
  }
}

async function generateEmail(firstName, registrationId, email) {
  const emailTemplate = `
    <html>
    <head>
        <style>
            .title {
                color: #fff;
                font-weight: 900;
                font-family: cursive;
            }
            .container {
                max-width: 600px;
                margin: auto;
                background: #ae7b4f;
                padding: 20px;
                text-align: center;
            }
            .button {
                background-color: #4CAF50; / Green /
                border: none;
                color: white;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                cursor: pointer;
            }
            table {
                font-family: arial, sans-serif;
                border-collapse: collapse;
                width: 100%;
            }
            td, th {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
                color: #fff;
            }
            td {
                vertical-align: top;
            }
            tr th:first-child {
                width: 80px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1 class="title">Kalmaashi Talent Hunt Show Registration Form</h1>
            <table>
                <tr>
                    <th>Name</th>
                    <th>${firstName}</th>
                </tr>
                <tr>
                    <th>Registration ID</th>
                    <th>${registrationId}</th>
                </tr>
                
            </table>
        </div>
    </body>
    </html>
    `;

  try {
    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.GOOGLE_HOST,
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.GOOGLE_MAIL,
        pass: process.env.GOOGLE_PASS
      }
    });

    // Define email content
    const mailOptions = {
      from: email, // sender address
      to: process.env.GOOGLE_MAIL, // list of receivers
      subject: "Kalmaashi Talent Hunt Show Registration Confirmation",
      html: emailTemplate,
    };

    // Send email
    const status = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    return Promise.reject({ error: 'Error sending email' });;
  }

}

module.exports = service
