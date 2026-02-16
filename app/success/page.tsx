import { redirect } from 'next/navigation'
import Link from 'next/link'

import { stripe } from '../../lib/stripe'

export default async function Success({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  const { status, customer_details } = checkoutSession
  const customerEmail = customer_details?.email

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    return (
      <main className="min-h-screen bg-white text-zinc-900">
        <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-100">
          <div className="mx-auto max-w-4xl px-6 py-24 text-center">
            
            <div className="inline-block mb-6 text-6xl">✓</div>
            
            <span className="inline-block mb-4 text-xs font-semibold tracking-wider uppercase bg-green-100 text-green-700 px-3 py-1 rounded-full">
              Payment successful
            </span>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Thank you for
              <span className="block text-pink-600">
                your order!
              </span>
            </h1>

            <p className="mt-6 text-lg text-zinc-600 max-w-2xl mx-auto">
              We appreciate your business! A confirmation email will be sent to{' '}
              <span className="font-semibold text-pink-600">{customerEmail}</span>.
            </p>

            <p className="mt-4 text-zinc-600">
              If you have any questions, please email{' '}
              <a href="mailto:orders@example.com" className="text-pink-600 hover:underline font-semibold">
                orders@example.com
              </a>
            </p>

            <div className="mt-10 flex gap-4 justify-center">
              <Link href="/">
                <button className="px-8 py-4 rounded-2xl bg-pink-600 text-white font-semibold shadow-lg hover:bg-pink-700 active:scale-95 transition">
                  Back to home
                </button>
              </Link>
            </div>

            <div className="mt-6 text-sm text-zinc-500">
              ★ Thank you for choosing our premium hair care
            </div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-center">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-3xl md:text-5xl font-bold">
              Your hair transformation starts now
            </h2>

            <p className="mt-6 text-lg text-white/90">
              Get ready for salon-quality results at home. Your order is being prepared with care.
            </p>
          </div>
        </section>
      </main>
    )
  }
}