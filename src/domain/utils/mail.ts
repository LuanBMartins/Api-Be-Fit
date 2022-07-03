import nodemailer from 'nodemailer'

export default class Mail {
  private to: string
  private subject: string
  private text: string
  private html: string

  constructor (to: string = '', subject: string = '', text: string = '', html: string = '') {
    this.to = to
    this.subject = subject
    this.text = text
    this.html = html
  }

  public async sendMail () {
    const mailOptions = {
      from: 'befit.apptech@gmail.com',
      to: this.to,
      subject: this.subject,
      text: this.text,
      html: this.html
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.HOST_USER,
        pass: process.env.HOST_PASS
      }
    })

    try {
      const mail = await transporter.sendMail(mailOptions)
      if (mail) {
        return true
      } else {
        throw new Error('Failed to send mail')
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}
