import { Order } from '../types';
import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from '../constants';

// Serviço de Notificação via Telegram
// Substitui o antigo WhatsApp/CallMeBot que é instável.
// O Telegram é 100% gratuito, oficial e permite envio em background sem interação do usuário.

export const sendOrderNotification = async (order: Order) => {
    // Se não tiver chave configurada, avisa no console
    if (!TELEGRAM_BOT_TOKEN || (TELEGRAM_BOT_TOKEN as string) === 'SEU_TOKEN_AQUI' || !TELEGRAM_CHAT_ID) {
        console.warn('Telegram Bot Token ou Chat ID não configurados em constants.ts');
        return;
    }

    const itemsList = order.items.map(item => 
        `▪ ${item.quantity}x ${item.name}`
    ).join('\n');

    // Formatação em Markdown para o Telegram
    const message = `
🔔 *NOVO PEDIDO CONFIRMADO!* 🔔
➖➖➖➖➖➖➖➖➖➖
🆔 *ID:* \`#${order.id.slice(0, 8)}\`
👤 *Cliente:* ${order.customerName || 'Não informado'}
📱 *Tel:* \`${order.customerWhatsapp || 'Não informado'}\`

📍 *Endereço:*
${order.address}

🛒 *Itens:*
${itemsList}

💰 *Total:* R$ ${order.total.toFixed(2)}
💳 *Pagamento:* ${order.paymentMethod.toUpperCase()}
➖➖➖➖➖➖➖➖➖➖
🚀 *Acesse o Admin para despachar!*
`;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'Markdown' // Permite negrito e monospaced
            })
        });

        if (response.ok) {
            console.log('Notificação enviada para o Telegram com sucesso!');
        } else {
            const err = await response.json();
            console.error('Erro Telegram API:', err);
        }
    } catch (error) {
        console.error('Falha de conexão ao enviar notificação:', error);
    }
};