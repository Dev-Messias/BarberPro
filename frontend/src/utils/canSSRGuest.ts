//apenas visitantes
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from  'next';
import { parseCookies } from 'nookies';

export function canSSRGuest<P>(fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx);

        //se estiver logado e tentar acessar rota de login, sera redirecionado para dashboard
        if(cookies['@barber.token']){
            return {
                redirect:{
                    destination: '/dashboard',
                    permanent: false,
                }
            }
        }

        //usuario não esta logado, deixar seguir para rota login
        return await fn(ctx)
    }
}