import nodemailer from "nodemailer";
import User from "@/models/usermodel";
import bcryptjs from "bcryptjs";

export const sendmail=async({email,emailtype,userId}:any)=>{

try{

  const hashedToken=await bcryptjs.hash(userId.toString(),10)

  if(emailtype==="VERIFY"){
    await User.findByIdAndUpdate(userId,{verifyToken:hashedToken,verifyTokenExpiry:Date.now()+3600000}) // 1 hour expiry
  }//elseif emailtype==="RESET"{ perform same operation for reset password } as above

  //Replace with your SMTP configuration via mailtrap
  const transporter = nodemailer.createTransport({
   host: "smtp.ethereal.email",
   port: 587,
   secure: false, // true for 465, false for other ports
   auth: {
     user: "maddison53@ethereal.email",
     pass: "jn7jnAPss4f63QBp6D",
   },

  
 });

  const mailOptions=
  {
    
    from: 'mahit@gmail.com',
    to: email,
    subject: emailtype==='verify'?'Verify your email':'Reset your password',
    text: "verify your email?", // plain‑text body
    html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailtype === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
  
   }

  
   const mailresponse=await transporter.sendMail(mailOptions)
   return mailresponse



    }catch(error:any){

        throw new Error(`Error sending email: ${error.message}`);//Any type of error that occurs during the email sending process will be caught here.

    }

}