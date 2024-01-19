import { Request, Response } from 'express';
import Stripe from 'stripe';
import {stripe} from '../../utils/stripe';

import { saveSubscription } from '../../utils/manageSubscription';

class WebHooksController {
    async handle(request: Request, response: Response) {
        let event:Stripe.Event = request.body;

        let endpointSecret: 'whsec_5d21f9ca605350e5eb9a1919ed45abf2efadc8d86de25b2e744af7d2ee141fc0';

        if(endpointSecret){
            const signature = request.headers['stripe-signature']

            try {

                event = stripe.webhooks.constructEvent(
                    request.body,
                    signature,
                    endpointSecret
                )
                
            } catch (err) {
                console.log("webhook signature faild", err.message)
                return response.sendStatus(400)
            }
        }

        switch(event.type) {
            case 'customer.subscription.deleted':
                //caso ele cancele a assinatura vamos deletar a assinatura dele
                const payment = event.data.object as Stripe.Subscription;

                await saveSubscription(
                    payment.id,
                    payment.customer.toString(),
                    false,
                    true
                )
            break; 
            case 'customer.subscription.updated':
                //caso tenha alguma atualização na assinatira
                const paymentIntent = event.data.object as Stripe.Subscription;
                await saveSubscription(
                    paymentIntent.id,
                    paymentIntent.customer.toString(),
                    false
                )
            break; 
            case 'checkout.session.completed':
                //criar a assinatura por que foi pago com sucesso!
                const checkoutSession = event.data.object as Stripe.Checkout.Session;
                await saveSubscription(
                    checkoutSession.subscription.toString(),
                    checkoutSession.customer.toString(),
                    true
                )
            break;
            default:
                console.log(`Evento desconhecido ${event.type}`) 
        }

        response.send();
    }
}

export { WebHooksController }