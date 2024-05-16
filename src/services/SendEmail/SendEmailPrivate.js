import nodemailer from "nodemailer";

export async function SendEmailPrivate({ fromEmail, host, port, fromEmailPwd, toEmail, subject, text, html, onSuccess }) {


    const privTransporter = nodemailer.createTransport({
        host,
        port,
        auth: {
            user: fromEmail,
            pass: fromEmailPwd
        }
    });

    const options = {
        from: fromEmail,
        to: toEmail,
        subject,
        text,
        html,
    };
    const info = await privTransporter.sendMail(options);



    onSuccess && onSuccess(info);

    return true;
}
