import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '../../../lib/stripe' // Убедись, что путь к stripe.ts правильный

// === ВРЕМЕННЫЙ СЛОВАРЬ ДЛЯ ТЕСТОВ ===
// ПОМЕТКА (TODO): Сейчас ВСЕ варианты используют Price ID от Скорпиона.
// Когда создашь новые товары в Stripe, просто замени эти ID на новые.
const STRIPE_PRICES: Record<string, { prod: string, dev: string }> = {
    scorpion: { 
        prod: 'price_1T4eesHSVM2lsj0JF3QX4aKI', 
        dev: 'price_1T4by9FxNbQ4QwoifKmO4gxC' 
    },
    cobra: { 
        prod: 'price_1T4eesHSVM2lsj0JF3QX4aKI', // TODO: Заменить на ID Кобры
        dev: 'price_1T4by9FxNbQ4QwoifKmO4gxC'  // TODO: Заменить на тестовый ID Кобры
    },
    tiger: { 
        prod: 'price_1T4eesHSVM2lsj0JF3QX4aKI', // TODO: Заменить на ID Тигра
        dev: 'price_1T4by9FxNbQ4QwoifKmO4gxC'  
    },
    yellow: { 
        prod: 'price_1T4eesHSVM2lsj0JF3QX4aKI', // TODO: Заменить на ID Желтого
        dev: 'price_1T4by9FxNbQ4QwoifKmO4gxC'  
    },
    green: { 
        prod: 'price_1T4eesHSVM2lsj0JF3QX4aKI', // TODO: Заменить на ID Зеленого
        dev: 'price_1T4by9FxNbQ4QwoifKmO4gxC'  
    },
    red: { 
        prod: 'price_1T4eesHSVM2lsj0JF3QX4aKI', // TODO: Заменить на ID Красного
        dev: 'price_1T4by9FxNbQ4QwoifKmO4gxC'  
    }
};

export async function POST(request: Request) {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')
        const referer = headersList.get('referer') || ''

        const formData = await request.formData()
        const quantity = parseInt(formData.get('quantity') as string || '1', 10)
        
        // Получаем ID выбранного бальзама из формы (по умолчанию scorpion)
        const variantId = formData.get('variantId') as string || 'scorpion'

        const refererUrl = new URL(referer)
        const ttAccount = refererUrl.searchParams.get('tt_account')

        // Формируем URL для успешной и отмененной оплаты
        const successUrl = new URL(`${origin}/lp/scorpion-balm/success`)
        successUrl.searchParams.set('session_id', '{CHECKOUT_SESSION_ID}')
        if (ttAccount) successUrl.searchParams.set('tt_account', ttAccount)

        const cancelUrl = new URL(`${origin}/lp/scorpion-balm/failure`)
        if (ttAccount) cancelUrl.searchParams.set('tt_account', ttAccount)

        // Выбираем Price ID в зависимости от среды (dev/prod) и товара
        const environment = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
        const priceId = STRIPE_PRICES[variantId]?.[environment] 

        if (!priceId) {
            throw new Error(`Price ID for variant ${variantId} is missing.`);
        }

        // Создаем сессию в Stripe
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: priceId,
                    quantity: quantity,
                },
            ],
            mode: 'payment',
            success_url: successUrl.toString(),
            cancel_url: cancelUrl.toString(),
            billing_address_collection: 'required',
            shipping_address_collection: {
                allowed_countries: ['PL'],
            },
            locale: 'pl',
            metadata: {
                ...(ttAccount && { tt_account: ttAccount }),
                // Мы передаем реальный variantId в метадату. 
                // Даже если товар в Stripe называется "Скорпион", 
                // в админке ты увидишь, что клиент нажимал на "Кобру".
                selected_variant: variantId 
            },
        })

        if (!session.url) {
            throw new Error('Failed to create checkout session')
        }

        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        const error = err as { message: string; statusCode?: number }
        console.error("Stripe Checkout Error:", error);
        return NextResponse.json(
            { error: error.message },
            { status: error.statusCode || 500 }
        )
    }
}