import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with API Key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Please fill all fields" }, { status: 400 });
    }

    // 1. Send notification email to BIM Builders team
    const { data: teamData, error: teamError } = await resend.emails.send({
      from: "BIM Builders Contact <onboarding@resend.dev>",
      to: "info@bimbuilders.in",
      subject: `New Project Inquiry: ${name}`,
      text: `
        New project inquiry received via website contact form.
        
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      reply_to: email,
    });

    if (teamError) {
      console.error("Resend Team Email Error:", teamError);
    } else {
      console.log("Resend Team Email Sent:", teamData);
    }

    // 2. Send acknowledgment email to the user
    const { data: userData, error: userError } = await resend.emails.send({
      from: "BIM Builders <onboarding@resend.dev>",
      to: email,
      subject: "We've received your project inquiry - BIM Builders",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
          <div style="background-color: #0f172a; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #fff; margin: 0; font-size: 24px;">BIM Builders</h1>
          </div>
          <div style="padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
            <h2 style="color: #0f172a; margin-top: 0;">Hello ${name},</h2>
            <p>Thank you for reaching out to <strong>BIM Builders</strong>. We have successfully received your project details and our team is already reviewing them.</p>
            <p>We pride ourselves on precision and coordination, and we will get back to you with a clear plan and next steps shortly.</p>
            <div style="background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; font-style: italic; color: #64748b;">"Your message: ${message.length > 100 ? message.substring(0, 100) + '...' : message}"</p>
            </div>
            <p>In the meantime, feel free to explore our latest projects on our website.</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
            <p style="font-size: 14px; color: #94a3b8; text-align: center;">
              Best Regards,<br />
              <strong>The BIM Builders Team</strong><br />
              <a href="https://www.bimbuilders.in" style="color: #3b82f6; text-decoration: none;">www.bimbuilders.in</a>
            </p>
          </div>
        </div>
      `,
    });

    if (userError) {
      console.error("Resend User Email Error:", userError);
      // If the user email fails but team email works, we still want to know
      return NextResponse.json({ 
        success: true, 
        warning: "Team notified, but user acknowledgment failed. This usually happens on Resend Free Tier if the recipient is not verified.",
        error: userError 
      });
    }

    console.log("Resend User Email Sent:", userData);
    return NextResponse.json({ success: true, teamData, userData });
  } catch (error) {
    console.error("Internal Server Error during email sending:", error);
    return NextResponse.json({ error: "Internal server error. Please check logs." }, { status: 500 });
  }
}
