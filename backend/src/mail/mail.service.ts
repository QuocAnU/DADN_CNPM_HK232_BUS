// import { MailerService } from "@nestjs-modules/mailer";
// import { Injectable } from "@nestjs/common";
// // import { Account } from "src/account/entities/account.entity";


// @Injectable()
// export class MailService {
//     constructor(private mailerService: MailerService) {}

//     async sendUserConfirmation(user: Account, otp: string) {
//         await this.mailerService.sendMail({
//             to: user.email,
//             subject: 'Confirm your email',
//             template:'./confirmation',
//             context: {
//                 name: user.email,
//                 otp,
//             }
//         })
//     }
// }