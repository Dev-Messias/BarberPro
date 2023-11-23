import { useState } from 'react';
import Head from "next/head";
import { SideBar } from '../../components/sidebar';
import Link from 'next/link';
import {
    Flex,
    Heading,
    Text,
    Button,
    Stack,
    Switch,
    useMediaQuery,
} from '@chakra-ui/react'

import { IoMdPricetag } from 'react-icons/io';

//protegendo rota
import { canSSRAuth } from '../../utils/canSSRAuth';

//api
import { setupAPIClient } from '../../services/api';

interface HaircutsItem{
    id: string;
    name: string;
    price: number | string;
    status: boolean;
    user_id: string;
}

interface HaircutsProps{
    haircuts: HaircutsItem[];
}

export default function Haircuts({ haircuts }: HaircutsProps){

    const [isMobile] =  useMediaQuery("(max-width: 500px)")

    //state para listar o cortes
    const [haircutList, setHaircutList] = useState<HaircutsItem[]>(haircuts || []);

    return(
        <>
            <Head>
                <title>Modelos de corte - Minha barbearia</title>
            </Head>
            <SideBar>
                <Flex direction="column" alignItems="flex-start" justifyContent="flex-start" >

                    <Flex
                        direction={isMobile ? 'column' : 'row'}
                        w="97%"
                        alignItems={isMobile ? 'flex-start' : 'center'}
                        justifyContent="flex-start"
                        mb={0}
                    >

                        <Heading
                            fontSize={isMobile ? '22px' : "3xl"}
                            mt={4}
                            mb={4}
                            mr={4}
                            color="orange.900"
                        >
                            Modelos de corte
                        </Heading>

                        <Link href="/haircuts/new" >
                           <Button bgColor="barber.400" color="white"  >
                             Cadastrar Novo
                           </Button>
                        </Link>

                        <Stack ml="auto" align="center" direction="row" >
                            <Text fontWeight="bold" textColor="white" >ATIVOS</Text>
                            <Switch
                                colorScheme="green"
                                size="lg"
                            />
                        </Stack>

                       

                    </Flex>

                   

                </Flex>

                {haircutList.map(haircut => (
                    <Link key={haircut.id} href={`/haircuts/${haircut.id}`}  >
                    <Flex
                     cursor="pointer"
                     width="100%"
                     p={4}
                     bg="barber.400"
                     direction={isMobile ? "column" : "row"}
                     alignItems={isMobile ? "flex-start" : "center"}
                     rounded="4"
                     marginTop={isMobile ? 4 : 0}
                     mb={2}
                     justifyContent="space-between"
                    >

                       <Flex mb={isMobile ? 2 : 0} direction="row" alignItems="center" justifyContent="center" >
                           <IoMdPricetag size={28} color="#fba931"  />
                         <Text color="white" marginLeft={4} noOfLines={2} >{haircut.name}</Text>
                       </Flex>

                       <Text fontWeight="bold" color="white" >
                           Preço: R$ {haircut.price}
                       </Text>

                    </Flex>
                   </Link>
                ))}

            </SideBar>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    try {

        //buscando lista
        const apiClient =  setupAPIClient(ctx);
        const response = await apiClient.get('/haircuts',{
            params:{
                status: true,
            }
        })

        if( response.data === null ){
            return{
                redirect:{
                    destination: '/dashboard',
                    permanent: false,
                }
            }
        }


        return{
            props: {
                haircuts: response.data
            }
        }
        
    } catch (err) {
        console.log(err);

        return{
            redirect:{
                destination: '/dashboard',
                permanent: false,
            }
        }
    }
})