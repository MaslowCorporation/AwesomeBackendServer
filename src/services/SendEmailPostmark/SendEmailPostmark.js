

// Import the Postmark library
import postmark from 'postmark';

/**
 * @function sendEmail
 * 
 * @description  
 *  A function to send emails. Utilizes the Postmark library.
 * 
 * @param {string} serverToken - The Postmark server token. 
 *                               !!! Be aware of storing sensitive data in your code!!!
 * 
 * @param {string} senderEmail - The email address from which the mail should be sent.
 * 
 * @param {string} receiverEmail - The recipient's email - where the email will be sent.
 * 
 * @param {string} subject - The subject line of the email.
 * 
 * @param {string} htmlContent - The main content of the email, structured with HTML tags.
 * 
 * @returns {boolean} - Returns a boolean: true if the mail was sent successfully, and false if there was an issue.
 */
export async function SendEmailPostmark({ serverToken, senderEmail, receiverEmail, subject, text }) {
    try {
        // Initialize the Postmark client
        let client = new postmark.ServerClient(serverToken);

        // Define the email parameters
        let email = {
            From: senderEmail,
            To: receiverEmail,
            Subject: subject,
            TextBody: text,
        };

        // Send the email
        let response = await client.sendEmail(email);

        // If the response indicates a success, return true
        if (response.To === receiverEmail) {
            console.log(`Email sent to ${response.To}`);
            return true;
        }
        // If the email could not be sent for any reason, throw an error
        else {
            throw new Error('Email not sent');
        }
    } catch (error) {
        console.error(`Error occurred while sending email: ${error.message}`);
        return false;
    }
}


