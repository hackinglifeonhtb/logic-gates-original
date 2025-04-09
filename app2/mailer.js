const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SEND_GRID_KEY);

const templates = {
    welcome: process.env.WELCOME_KEY,
    other_etc: process.env.OTHER_ETC_KEY,
};

const sendEmail = (data) => {
    const msg = {
        from: process.env.EMAIL_FROM,
        personalizations: [{
            to: [{email:data.to}],
            dynamic_template_data: data.dynamic_template_data,
        }],
        template_id: `${templates[data.template]}`,
        dynamic_template_data: data.dynamic_template_data,
    };

    //send the email
    sgMail.send(msg).then(
        () => {console.log('Sent!')},
        (error) => {
            console.error(error);
            if (error.response) {
                console.error(error.response.body);
            }
        }
    );
};

module.exports = sendEmail;