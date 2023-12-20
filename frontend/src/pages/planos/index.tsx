import Head from "next/head";
import {
    Button,
    Flex,
    Heading,
    Text,
    useMediaQuery
} from '@chakra-ui/react';

import { SideBar } from '../../components/sidebar';
import { canSSRAuth } from '../../utils/canSSRAuth';
import { setupAPIClient } from '../../services/api';
import { Console } from "console";

interface PlanosProps{
    premium: boolean;
}

export default function Planos({ premium }: PlanosProps) {

    const [isMobile] = useMediaQuery('(max-width: 500px)');

    return (
        <>
            <Head>
                <title>Barber Pro - Sua assinatura Premium</title>
            </Head>
            <SideBar>
                <Flex w="100%" direction="row" align="flex-start" justify="flex-start" >

                    <Heading color="white" fontSize="3xl" mt={4} mb={4} mr={4} >
                        Planos
                    </Heading>
                </Flex>

                <Flex pb={8} maxW="700px" w="100%" direction="column" align="flex-start" justify="flex-start" >

                    <Flex gap={4} w="100%" direction={isMobile ? "column" : "row"} >

                        <Flex rounded={4} p={2} flex={1} bg="barber.400" flexDirection="column" >

                            <Heading
                                textAlign="center"
                                fontSize="2xl"
                                mt={2} mb={4}
                                color="gray.100"

                            >
                                Plano Grátis
                            </Heading>

                            <Text fontWeight="medium" ml={4} mb={2} color="white"  >Registrar cortes</Text>
                            <Text fontWeight="medium" ml={4} mb={2} color="white"  >Criar apenas 3 modelos de corte</Text>
                            <Text fontWeight="medium" ml={4} mb={2} color="white"  >Editar dados do perfil</Text>

                        </Flex>

                        <Flex rounded={4} p={2} flex={1} bg="barber.400" flexDirection="column" >

                            <Heading
                                textAlign="center"
                                fontSize="2xl"
                                mt={2} mb={4}
                                color="#31fb6a"

                            >
                              Premium
                            </Heading>

                            <Text fontWeight="medium" ml={4} mb={2} color="white"  >Registrar cortes ilimitados. </Text>
                            <Text fontWeight="medium" ml={4} mb={2} color="white"  >Criar modelos ilimitados.</Text>
                            <Text fontWeight="medium" ml={4} mb={2} color="white"  >Editar modelos de cortes.</Text>
                            <Text fontWeight="medium" ml={4} mb={2} color="white"  >Editar dados do perfil.</Text>
                            <Text fontWeight="medium" ml={4} mb={2} color="white"  >Receber todas as atualizações.</Text>
                            <Text fontWeight="bold" fontSize="1xl" ml={4} mb={2} color="#31fb6a"  >R$ 10.99</Text>

                            <Button
                             bg={premium ? "barber.900" : "button.cta"}
                             m={2}
                             color={premium ? "white" : "barber.900"}
                             onClick={() => {}}
                             isDisabled={premium}
                            >
                                {premium ? (
                                    "VOCÊ JÁ É PREMIUM"
                                ) : ("VIRAR PREMIUM")}
                                
                            </Button>

                            {premium && (

                               <Button
                               bg="white"
                               m={2}
                               color="barber.900"
                               onClick={() => {}}
                              >
                                  ALTERAR ASSINATURA
                                  
                              </Button> 
                            )}

                        </Flex>

                    </Flex>

                </Flex>
            </SideBar>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) =>{

    try {

        const apiClient = setupAPIClient(ctx);
        const response = await apiClient.get('/me');

        console.log(response.data);

        return{
            props: {
                premium: response.data?.subscriptions?.status === 'active' ? true : false
            }
        }
        
    } catch (err) {
        console.log(err)

        return {
            redirect:{
                destination: '/dashboard',
                permanent: false,
            }
        }
    }

   
})

