import prismaClient from '../../prisma';

interface HaircutRequest{
    user_id: string;
    name: string;
    price: number;
}



class CreateHaircutService{
    async execute({ user_id, name, price }: HaircutRequest){
        //caso não receba essas duas propriedades
        if(!name || !price){
            throw new Error("Error")
        }

        // Verificar quantos modelos esse usuario tem cadastrado
        const myHaircuts = await prismaClient.haircut.count({
            where:{
                user_id: user_id
            }
        })

        // Verificar se o usuario é premium se não limitamos a quantidade de modelos para cadastrar
        const user = await prismaClient.user.findFirst({
            where:{
                id: user_id
            },
            include:{
                subscriptions: true,
            }
        })

        //Podemos criar validaçao ou limite
        if(myHaircuts >= 3 && user?.subscriptions?.status !== 'active'){
            throw new Error("Not authorized");
        }

        //cadastrando modelo
        const haircut = await prismaClient.haircut.create({
            data:{
                name: name,
                price: price,
                user_id: user_id
            }
        })

        return haircut;
    }
}

export { CreateHaircutService }