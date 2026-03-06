import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../../lib/stripe'

export async function POST(request: Request) {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')
        const referer = headersList.get('referer') || ''

        const formData = await request.formData()
        const quantity = parseInt(formData.get('quantity') as string || '1', 10)
        const productId = formData.get('productId') as string
        const priceId = formData.get('priceId') as string
        const successPath = formData.get('successPath') as string
        const failurePath = formData.get('failurePath') as string

        if (!productId || !priceId || !successPath || !failurePath) {
            throw new Error('Missing required parameters')
        }

        // Extract query parameters from referer URL
        const refererUrl = new URL(referer)
        const ttAccount = refererUrl.searchParams.get('tt_account')

        // Build success URL with query parameters
        const successUrl = new URL(`${origin}${successPath}`)
        successUrl.searchParams.set('session_id', '{CHECKOUT_SESSION_ID}')
        if (ttAccount) successUrl.searchParams.set('tt_account', ttAccount)

        // Build cancel/failure URL with query parameters
        const cancelUrl = new URL(`${origin}${failurePath}`)
        if (ttAccount) cancelUrl.searchParams.set('tt_account', ttAccount)

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
                product_id: productId,
                ...(ttAccount && { tt_account: ttAccount }),
            },
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
