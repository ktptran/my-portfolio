import * as React from "react";

interface EmailTemplateProps {
	subject: any;
	message: any;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	subject,
	message,
}): React.JSX.Element => (
	<>
		<h1>{subject}</h1>
		<p>Thank you for contacting me!</p>
		<br />
		<p>I have received the following message:</p>
		<p>{message}</p>
		<br />
		<p>I will do my best to get back to you!</p>
		<br />
		<p>Sincerely,</p>
		<p>Kevin Tran</p>
	</>
);
