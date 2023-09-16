import prismaClient from "../../prisma";

interface HaircutRequest{
    user_id: string;
    status: boolean | string;
}

class ListHaircutService{
    async execute({user_id, status}: HaircutRequest){

        //buscando todos os haircut que são do usuario logado
        const haircut = await prismaClient.haircut.findMany({
            where:{
                user_id: user_id,
                //se a variavel status vier como true sera retornado true
                status: status === 'true' ? true : false
            }
        })

        return haircut;
    }
}

export { ListHaircutService }