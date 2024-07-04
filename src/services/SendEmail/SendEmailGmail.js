import nodemailer from "nodemailer";

export async function SendEmailGmail(fromEmail, fromEmailPwd, toEmail, subject, text, html, onSuccess) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: fromEmail,
            pass: fromEmailPwd,
        },
    });

    const options = {
        from: fromEmail,
        to: toEmail,
        subject,
        text,
        html,
    };
    const info = await transporter.sendMail(options);

    onSuccess && onSuccess(info);

    return true;
}
