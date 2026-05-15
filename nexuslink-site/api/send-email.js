import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, amount, tokens } = req.body;

  if (!email || !amount || !tokens) {
    return res.status(400).json({ error: 'Faltam dados' });
  }

  try {
    await resend.emails.send({
      from: 'Presale NexusLink <presale@nexuslink.xyz>', 
      to: email,
      subject: '✅ Confirmação da tua Reserva - NexusLink Presale',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; padding: 40px; border-radius: 16px;">
          <h1 style="color: #c026d3; font-size: 28px;">Obrigado pela tua reserva!</h1>
          <p style="font-size: 18px; margin: 25px 0;">Confirmamos a tua contribuição na Presale da NexusLink.</p>
          
          <div style="background: #1f1f1f; padding: 25px; border-radius: 12px; margin: 30px 0;">
            <p><strong>Valor Investido:</strong> $${parseFloat(amount).toLocaleString()}</p>
            <p><strong>Tokens Reservados:</strong> ${tokens} $NXL</p>
            <p><strong>Preço:</strong> $0.001 por token</p>
            <p><strong>Carteira:</strong> 0x96e7119de8329150b831e6C41377f51695876b07</p>
          </div>
          <p style="color: #a3a3a3;">Os teus tokens ficarão com vesting conforme o whitepaper.</p>
        </div>
      `
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao enviar email' });
  }
}