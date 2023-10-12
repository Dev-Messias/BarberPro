import Head from 'next/head';
import { Flex, Text } from '@chakra-ui/react';

import { canSSRAuth } from '../../utils/canSSRAuth';
import { SideBar } from '../../components/sidebar'

export default function Dashboard(){
    return(
        <>
            <Head>
                <title>BarberPro - Minha Barbearia</title>
            </Head>
           <SideBar>
            <Flex>
                 <Text color='button.default' >Bem vindo ao dashboard</Text>
             </Flex>
           </SideBar>
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