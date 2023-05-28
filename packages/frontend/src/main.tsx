import store from '@/features'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'antd/dist/reset.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import App from './App'
import i18n from './i18n'
import './styles/index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
)
