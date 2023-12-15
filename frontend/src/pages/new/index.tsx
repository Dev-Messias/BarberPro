import { useState, ChangeEvent } from 'react'
import Head from "next/head";
import { SideBar } from '../../components/sidebar';

import {
    Flex,
    Heading,
    Text,
    Button,
    Input,
    Select,
} from '@chakra-ui/react';

import { canSSRAuth } from '../../utils/canSSRAuth';
import { setupAPIClient } from '../../services/api';

import { useRouter } from 'next/router';

interface HaircutProps{
    id: string;
    name: string;
    price: string | number;
    status: boolean;
    user_id: string;
}

interface NewProps{
    haircuts: HaircutProps[];// os [] simbolisa que estamos recebendo uma lista que tem as propriedades da interface chamada
}

export default  function New({ haircuts }: NewProps){

    const [customer, setCustome] = useState('');
    const [haircutSelected, setHaircutSelected] = useState(haircuts[0]);
    const router = useRouter();

    function  hendleChangeSelect(id: string){
        //console.log(id);

        //buscando la lista o id que é igual ao id selecionado
        const haircutItem = haircuts.find(item => item.id === id );

        //console.log(haircutItem);

        setHaircutSelected(haircutItem);
    }

    async function handleRegister() {

        if(customer === ''){
            alert('Preencha o nome do cliente')
            return;
       }
        
        try {

            const apiClient = setupAPIClient();
            await apiClient.post('/schedule', {
                customer : customer,
                haircut_id : haircutSelected?.id
            })

            router.push('/dashboard')

           
            
        } catch (err) {
            console.log(err)
            alert("Erro ao registrar!")
        }
    }

    return(
        <>
            <Head>
                <title>BarberPro - Novo agendamento</title>
            </Head>
            <SideBar>
                <Flex direction="column" align="flex-start" justify="flex-start" >
                    <Flex
                        direction="row"
                        w="100%"
                        align="center"
                        justify="flex-start"
                    >

                        <Heading color="white" fontSize="3xl" mt={4} mb={4} mr={4} >
                            Novo Corte
                        </Heading>


                    </Flex>

                    <Flex
                        maxW="700px"
                        pt={8}
                        pb={8}
                        width="100%"
                        direction="column"
                        align="center"
                        justify="center"
                        bg="barber.400"
                    >

                        <Input 
                            placeholder="Nome do cliente"
                            w="85%"
                            mb={3}
                            size="lg"
                            type="text"
                            bg="barber.900"
                            textColor="button.default"
                            _hover={{ bg: "#1b1c29" }}
                            value={customer}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setCustome(e.target.value) }
                        />

                        <Select mb={3} size="lg" w="85%" bg="barber.900" color="white"   _hover={{ bg: "#1b1c29"  }}
                            onChange={(e) => hendleChangeSelect(e.target.value) } 
                        >
                            
                            {haircuts?.map( item => (
                                <option style={{ background: "#1b1c29"  }}   key={item?.id} value={item?.id} >{item.name}</option>
                            ) )}

                        </Select>

                        <Button
                            w="85%"
                            size="lg"
                            color="gray.900"
                            bg="button.cta"
                            _hover={{ bg: '#FFb13e' }}
                            onClick={handleRegister}
                        >
                            Cadastrar
                        </Button>


                    </Flex>

                </Flex>
            </SideBar>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    try {

        const apiCliente = setupAPIClient(ctx);
        const response = await apiCliente.get('/haircuts', {
            params:{
                status: true,
            }
        })

        if(response.data === null){
            return{
                redirect:{
                 destination: '/dashboard',
                 permanent: false,
                } 
             }
        }

        //console.log(response.data);

        return{
            props:{
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