import Head from 'next/head';
import { Flex, Text } from '@chakra-ui/react';

import { canSSRAuth } from '../../utils/canSSRAuth';

export default function Dashboard(){
    return(
        <>
            <Head>
                <title>BarberPro - Minha Barbearia</title>
            </Head>
            <Flex>
                <Text>Bem vindo ao dashboard</Text>
            </Flex>
        </>
    )
}

//deixando rota privada
//só usuarios logados podem acessar essa rota
export const getServerSideProps = canSSRAuth(async (ctx) =>{
    return{
        props:{

        }
    }
})