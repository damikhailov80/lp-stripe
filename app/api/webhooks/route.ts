import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'

import { stripe } from '../../../lib/stripe'

export async function POST(req: Request) {
    const body = await req.text()
    const signature = (await headers()).get('stripe-signature')

    let event: Stripe.Event

    try {
        if (!process.env.STRIPE_WEBHOOK_SECRET) {
            throw new Error('STRIPE_WEBHOOK_SECRET не установлен')
        }

        event = stripe.webhooks.constructEvent(
            body,
            signature as string,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        console.error('⚠️ Webhook signature verification failed:', errorMessage)
        return NextResponse.json(
            { error: `Webhook Error: ${errorMessage}` },
            { status: 400 }
        )
    }

    // Быстро возвращаем 200 и обрабатываем асинхронно
    const processEvent = async () => {
        const permittedEvents = ['checkout.session.completed', 'checkout.session.async_payment_failed']

        if (!permittedEvents.includes(event.type)) {
            console.log(`Ignoring event type: ${event.type}`)
            return
        }

        const data = event.data.object as Stripe.Checkout.Session

        try {
            switch (event.type) {
                case 'checkout.session.completed':
                    console.log(`✓ Checkout completed: ${data.id}, status: ${data.payment_status}`)

                    if (data.payment_status === 'paid') {
                        const eventParams: Record<string, any> = {
                            transaction_id: data.id,
                            value: (data.amount_total || 0) / 100,
                            currency: data.currency?.toUpperCase() || 'USD',
                            items: [{
                                item_id: 'scorpion-balm',
                                item_name: 'Banna Scorpion Thai Balm Black',
                                price: (data.amount_total || 0) / 100,
                                quantity: 1
                            }]
                        }

                        if (data.metadata?.tt_account) {
                            eventParams.tt_account = data.metadata.tt_account
                        }

                        const gaResponse = await fetch(
                            `https://www.google-analytics.com/mp/collect?measurement_id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}&api_secret=${process.env.GA_API_SECRET}`,
                            {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    client_id: data.client_reference_id || data.id,
                                    events: [{
                                        name: 'purchase',
                                        params: eventParams
                                    }]
                                })
                            }
                        )
                        console.log(`GA purchase event sent: ${gaResponse.status}`)
                    }
                    break

                case 'checkout.session.async_payment_failed':
                    console.log(`✗ Payment failed: ${data.id}`)

                    const failedEventParams: Record<string, any> = {
                        transaction_id: data.id,
                        value: (data.amount_total || 0) / 100,
                        currency: data.currency?.toUpperCase() || 'USD'
                    }

                    if (data.metadata?.tt_account) {
                        failedEventParams.tt_account = data.metadata.tt_account
                    }

                    const gaFailResponse = await fetch(
                        `https://www.google-analytics.com/mp/collect?measurement_id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}&api_secret=${process.env.GA_API_SECRET}`,
                        {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                client_id: data.client_reference_id || data.id,
                                events: [{
                                    name: 'payment_failed',
                                    params: failedEventParams
                                }]
                            })
                        }
                    )
                    console.log(`GA payment_failed event sent: ${gaFailResponse.status}`)
                    break
            }
        } catch (error) {
            console.error('Error processing webhook event:', error)
        }
    }

    // Запускаем обработку асинхронно
    processEvent().catch(err => console.error('Async processing error:', err))

    // Быстро возвращаем 200
    return NextResponse.json({ received: true }, { status: 200 })
}
