// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
// import {corsHeaders} from '../_shared/Cors'

// Setup type definitions for built-in Supabase Runtime APIs
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />
import Stripe from 'https://esm.sh/stripe?target=deno'

const stripe = Stripe(Deno.env.get('STRIPE_KEY')!, {
  apiVersion: '2024-04-10', 
  httpClient: Stripe.createFetchHttpClient(),
})

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      status: 200,
    })
  }
  try {
    const { products } = await req.json()

    const lineItems = products.map((product: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
          images: [product.image],
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      phone_number_collection: {
        enabled: false,
      },
      success_url:
        'https://remix-cloudflare-workers.jonmeyers.workers.dev/success',
      cancel_url:
        'https://remix-cloudflare-workers.jonmeyers.workers.dev/cancel',
    })
    console.log('🚀 ~ Deno.serve ~ session:', session)

    return new Response(
      JSON.stringify({
        id: session.id,
      }),
      {
        headers: {'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*', 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*', 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/stripe' \
    --header 'Authorization: Bearer ' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
