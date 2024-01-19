import { stripe } from './stripe';
import prismaClient from '../prisma';

export async function saveSubscription(
    subscriptionId: string,
    customerId: string,
    createAction = false,
    deleteAction = false,
) {

    //buscando usuario
    const findUser = await prismaClient.user.findFirst({
        where:{
            stripe_customer_id: customerId,
        },
        include:{
            subscriptions: true,
        }
    })

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    //pegando dados da assinatura
    const subscriptionData = {
        id: subscription.id,
        userId: findUser.id,
        status: subscription.status,
        priceId: subscription.items.data[0].price.id,
    }

    if(createAction){
        console.log(subscriptionData)

        try {

            await prismaClient.subscription.create({
                data: subscriptionData

            })
            
        } catch (err) {
            console.log("ERRO CREATE")
            console.log(err)
        }
    }else{
        // se não esta criando apenas atualizamos as informações

        if(deleteAction){
            await prismaClient.subscription.delete({
                where:{
                    id: subscriptionId,
                }
            })

            return;//para a execução do codigo
        }

        try {

            await prismaClient.subscription.update({
                where:{
                    id: subscriptionId
                },
                data:{
                    status: subscription.status,
                    priceId: subscription.items.data[0].price.id,
                }
            })
            
        } catch (err) {
            console.log("Erro update hook")
            console.log(err)
        }

    }
    
}