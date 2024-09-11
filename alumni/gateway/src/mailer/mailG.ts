export const htmlMail = (resetLink:string) =>`
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="background-color: #007bff; color: white; padding: 20px; text-align: center;">
                Réinitialisation de mot de passe
            </h2>
            <p>Bonjour,</p>
            <p>Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le lien valable 15 minutes ci-dessous pour procéder :</p>
            <div style="text-align: center; margin: 20px 0;">
                <a href="${resetLink}" style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
                    Réinitialiser mon mot de passe
                </a>
            </div>
            <p>Si vous n'avez pas fait cette demande, veuillez ignorer cet email.</p>
            <p>Cordialement,<br>L'équipe Aelion</p>
        </div>
`;
  