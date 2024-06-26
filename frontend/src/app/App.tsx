import { Flex } from '@chakra-ui/react'
import { AppRouter } from './routers'
import { Providers } from './providers'

const App = () => {
    return (
        <Providers>
            <Flex
                w='100vw'
                h='100vh'
                justifyContent={'space-between'}
                flexDirection={'column'}>
                <AppRouter />
            </Flex>
        </Providers>
    )
}
export default App
