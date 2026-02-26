import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'

import { stripe } from '../../../lib/stripe'

export async function POST(req: Request) {
    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            await req.text(),
            (await headers()).get('stripe-signature') as string,
            process.env.STRIPE_WEBHOOK_SECRET as string
        )
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        console.log(err)
        console.log(`Error message: ${errorMessage}`)
        return NextResponse.json(
            { message: `Webhook Error: ${errorMessage}` },
            { status: 400 }
        )
    }

    const permittedEvents = ['checkout.session.completed', 'checkout.session.async_payment_failed']

    if (permittedEvents.includes(event.type)) {
        let data: Stripe.Checkout.Session

        try {
            switch (event.type) {
                case 'checkout.session.completed':
                    data = event.data.object as Stripe.Checkout.Session
                    console.log(`CheckoutSession status: ${data.payment_status}`)

                    // Send to Google Analytics
                    if (data.payment_status === 'paid') {
                        await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}&api_secret=${process.env.GA_API_SECRET}`, {
                            method: 'POST',
                            body: JSON.stringify({
                                client_id: data.client_reference_id || data.id,
                                events: [{
                                    name: 'purchase',
                                    params: {
                                        transaction_id: data.id,
                                        value: (data.amount_total || 0) / 100,
                                        currency: data.currency?.toUpperCase(),
                                        items: [{
                                            item_id: 'scorpion-balm',
                                            item_name: 'Banna Scorpion Thai Balm Black',
                                            price: (data.amount_total || 0) / 100,
                                            quantity: 1
                                        }]
                                    }
                                }]
                            })
                        })
                    }
                    break

                case 'checkout.session.async_payment_failed':
                    data = event.data.object as Stripe.Checkout.Session
                    console.log(`Payment failed for session: ${data.id}`)

                    // Send failed transaction to GA
                    await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}&api_secret=${process.env.GA_API_SECRET}`, {
                        method: 'POST',
                        body: JSON.stringify({
                            client_id: data.client_reference_id || data.id,
                            events: [{
                                name: 'payment_failed',
                                params: {
                                    transaction_id: data.id,
                                    value: (data.amount_total || 0) / 100,
                                    currency: data.currency?.toUpperCase()
                                }
                            }]
                        })
                    })
                    break

                default:
                    throw new Error(`Unhandled event: ${event.type}`)
            }
        } catch (error) {
            console.log(error)
            return NextResponse.json(
                { message: 'Webhook handler failed' },
                { status: 500 }
            )
        }
    }
    // Return a response to acknowledge receipt of the event.
    return NextResponse.json({ message: 'Received' }, { status: 200 })
}
