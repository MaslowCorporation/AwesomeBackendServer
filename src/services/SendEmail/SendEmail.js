

import { SendEmailGmail } from "./SendEmailGmail.js";
import { SendEmailPrivate } from "./SendEmailPrivate.js";


export const SendEmail = async ({
    emailType,
    host,
    port,
    fromEmail,
    fromEmailPwd,
    toEmail,
    subject,
    text,
    html,
    onSuccess,
    onError
}) => {
    try {
        if (emailType == "private") {
            // private email setup
            return SendEmailPrivate({ fromEmail, host, port, fromEmailPwd, toEmail, subject, text, html, onSuccess });
        } else if (emailType == "gmail") {
            return SendEmailGmail(fromEmail, fromEmailPwd, toEmail, subject, text, html, onSuccess);
        } else {
            throw new Error("Unknown email type: " + emailType)
        }
    } catch (error) {
        onError && onError(error);

        return false;
    }
};




