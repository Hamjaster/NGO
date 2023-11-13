import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import MyContextProvider from './context/ContextProvider.jsx'
import { ChakraProvider } from '@chakra-ui/react/dist/chakra-provider.js'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <MyContextProvider>
          <App />
        </MyContextProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)
