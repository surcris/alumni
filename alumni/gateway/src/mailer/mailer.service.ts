import { Injectable } from '@nestjs/common';
import { CreateMailerDto } from './dto/create-mailer.dto';
import { UpdateMailerDto } from './dto/update-mailer.dto';
import * as nodemailer from 'nodemailer';
import { htmlCode, htmlMail } from './mailG';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constante';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MailerService {
  private transporter;

	constructor(private jwtService: JwtService,
    private _userService: UserService
  ) {
		// Configurer le transporteur nodemailer
		this.transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com', // Remplacez par l'hôte SMTP
			port: 587, // Le port SMTP (le port 587 est souvent utilisé pour SMTP sécurisé)
			secure: false, // true pour le port 465, false pour les autres ports
			auth: {
				user: process.env.MAILER, //  e-mail
				pass: process.env.PASS // mot de passe
			}
		});
	}

    // Fonction pour envoyer un e-mail
  async sendMail(to: string) {

    const payload = { to };

		const accessToken = await this.jwtService.signAsync(payload, {
			secret: jwtConstants.secret,
			expiresIn: '15m', // Expire dans 15 minutes
		  });
    const subject: string = 'Modification password';
    const text = `Voici le lien de récupération de mot de passe ` 
    const html: string = htmlMail(`http://localhost:3000/mailer/recup/${accessToken}/`);
    const mailOptions = {
      from: process.env.MAILER, // L'adresse e-mail de l'expéditeur
      to, // Le destinataire
      subject, // Le sujet du mail
      text, // Le contenu du mail en texte brut
      html, // Le contenu du mail en HTML
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
      throw new Error('Echec de l\'envoi de l\'e-mail');
    }
  }

  async sendCode(to: string) {

    const payload = { to };
    // this._userService.generateRandomNumber(10).
		const accessToken = await this.jwtService.signAsync(payload, {
			secret: jwtConstants.secret,
			expiresIn: '15m', // Expire dans 15 minutes
		  });
    const subject: string = 'Modification password';
    const text = `Voici le lien de récupération de mot de passe ` 
    const html: string = htmlCode(1010);
    const mailOptions = {
      from: process.env.MAILER, // L'adresse e-mail de l'expéditeur
      to, // Le destinataire
      subject, // Le sujet du mail
      text, // Le contenu du mail en texte brut
      html, // Le contenu du mail en HTML
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      // console.log('E-mail envoyé : %s', info.messageId);
      return info;
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
      throw new Error('Echec de l\'envoi de l\'e-mail');
    }
  }
}
