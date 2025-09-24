
const { SendEmailCommand } = require('@aws-sdk/client-ses');

const { sesClient } = require('./sesClient');


const createSendEmailCommand = (toAddress, fromAddress) => {
    const otp = "874321";
    return new SendEmailCommand({
        Destination: {
            CcAddresses: [
            ],
            ToAddresses: [
                toAddress,
            ],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `
                      <html>
                      <body>
                      <p>Dear User </p>
                      <p> Your One-Time Password (OTP) is: </p>
                      <h2>${otp}  </h2>
                       <p>This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
                          <p>Thank you,<br/>devconnect team.</p>
                      </body>
                      </html>
                    `,
                },
                Text: {
                    Charset: "UTF-8",
                    Data: `Dear User,

                       Your One-Time Password (OTP) is: 874321

                       This OTP is valid for 10 minutes.Please do not share it with anyone
                       Thank you,
                       TechNova Solutions Pvt. Ltd.
`,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Your one-Time Password(OTP)",
            },
        },
        Source: fromAddress,
        ReplyToAddresses: [
        ],
    });
};

const run = async () => {
    const sendEmailCommand = createSendEmailCommand(
        "tusharchaudhary12dec@gmail.com",
        "tushar@devconnect.tech",
    );

    try {
        return await sesClient.send(sendEmailCommand);
    } catch (caught) {
        if (caught instanceof Error && caught.name === "MessageRejected") {

            const messageRejectedError = caught;
            return messageRejectedError;
        }
        throw caught;
    }
};

module.exports = { run };