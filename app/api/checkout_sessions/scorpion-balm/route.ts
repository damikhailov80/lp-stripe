import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../../lib/stripe'

export async function POST(request: Request) {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')

        const formData = await request.formData()
        const quantity = parseInt(formData.get('quantity') as string || '1', 10)

        // Create Checkout Sessions for Scorpion Balm
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Replace with your actual Stripe Price ID (starts with price_)
                    price: 'price_1T4by9FxNbQ4QwoifKmO4gxC',
                    quantity: quantity,
                },
            ],
            mode: 'payment',
            success_url: `${origin}/lp/scorpion-balm/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/lp/scorpion-balm`,
        })

        if (!session.url) {
            throw new Error('Failed to create checkout session')
        }

        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        const error = err as { message: string; statusCode?: number }
        return NextResponse.json(
            { error: error.message },
            { status: error.statusCode || 500 }
        )
    }
}
