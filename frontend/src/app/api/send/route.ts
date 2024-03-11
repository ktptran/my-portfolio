import { EmailTemplate } from "@/app/components/EmailTemplate";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: any, res: any) {
	const { email, subject, message } = await req.json();
	try {
		const data = await resend.emails.send({
			from: "Kevin Tran <hello@ktptran.xyz>",
			to: [email],
			subject: subject,
			react: EmailTemplate({ subject, message }),
			text: message,
		});
		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json({ error });
	}
}
