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
                        console.log('🔍 Preparing GA purchase event...')
                        console.log('Session data:', JSON.stringify({
                            id: data.id,
                            client_reference_id: data.client_reference_id,
                            amount_total: data.amount_total,
                            currency: data.currency,
                            metadata: data.metadata
                        }, null, 2))

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

                        const gaPayload = {
                            client_id: data.client_reference_id || data.id,
                            events: [{
                                name: 'purchase',
                                params: eventParams
                            }]
                        }

                        console.log('🔑 Environment check:', {
                            hasMeasurementId: !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
                            hasApiSecret: !!process.env.GA_API_SECRET,
                            measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
                        })

                        const gaUrl = `https://www.google-analytics.com/mp/collect?measurement_id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}&api_secret=${process.env.GA_API_SECRET}`

                        console.log('📤 GA Request URL:', gaUrl.replace(process.env.GA_API_SECRET || '', '***'))
                        console.log('📤 GA Payload:', JSON.stringify(gaPayload, null, 2))

                        console.log('⏳ Starting fetch to GA...')
                        try {
                            const gaResponse = await fetch(gaUrl, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(gaPayload)
                            })

                            console.log('✅ Fetch completed!')
                            console.log(`✅ GA Response Status: ${gaResponse.status} ${gaResponse.statusText}`)

                            const responseText = await gaResponse.text()
                            console.log('📥 GA Response Body:', responseText || '(empty)')

                            if (!gaResponse.ok) {
                                console.error('❌ GA request failed:', {
                                    status: gaResponse.status,
                                    statusText: gaResponse.statusText,
                                    body: responseText
                                })
                            } else {
                                console.log('🎉 GA event successfully sent!')
                            }
                        } catch (gaError) {
                            console.error('❌ GA fetch error:', gaError)
                            console.error('Error details:', {
                                message: gaError instanceof Error ? gaError.message : 'Unknown error',
                                stack: gaError instanceof Error ? gaError.stack : undefined
                            })
                        }
                        console.log('✔️ GA block completed')
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
