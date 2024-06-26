import React from 'react'
import ReactDOM from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import App from './app/App'
import { ColorModeScript } from '@chakra-ui/react'
import { theme } from 'app/providers/theme'
import { init } from 'app/init'

init()
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
    </React.StrictMode>
)
