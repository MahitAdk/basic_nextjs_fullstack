import nodemailer from "nodemailer";

export const sendmail=async({email,emailtype,userId}:any)=>{

try{
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
    html: "<b>Hello world?</b>", // HTML body
  
   }

  
   const mailresponse=await transporter.sendMail(mailOptions)
   return mailresponse



    }catch(error:any){

        throw new Error(`Error sending email: ${error.message}`);//Any type of error that occurs during the email sending process will be caught here.

    }

}