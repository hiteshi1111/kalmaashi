const nodemailer = require('nodemailer')
let service = {};
service.contactFormSubmission = contactFormSubmission;

async function contactFormSubmission(body){
    const{firstName, lastName , subject, message, phone, email} = body
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
                    background: #BB7333;
                    padding: 20px;
                    text-align: center;
                }
                .button {
                    background-color: #3c2510; 
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
                <h1 class="title">Kalmaashi</h1>
                <h2 class="title">Contact Form Submission</h2>
                <table>
                    <tr>
                        <th>Full Name</th>
                        <th>${firstName+ " " + lastName}</th>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td>${phone}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td><a href='mailto:${email}'>${email}</a></td>
                    </tr>
                    <tr>
                        <td>Subject</td>
                        <td>${subject}</td>
                    </tr>
                    <tr>
                        <td>Message</td>
                        <td>${message}</td>
                    </tr>
                </table>
            </div>
        </body>
    </html>
    `;

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.GOOGLE_HOST,
            port: 465,
            secure: true, 
            auth:{
                user: process.env.GOOGLE_MAIL,
                pass: process.env.GOOGLE_PASS
            }

        })
        const mailOptions = {
            from: email,
            to: process.env.GOOGLE_MAIL,
            subject: `Kalmaashi | Contact | ${subject}`,
            html: emailTemplate
        };
        const status = await transporter.sendMail(mailOptions);
        return status
    } catch (error) {
        return Promise.reject({ error: 'Something went wrong.' });
    }
}

module.exports = service;