import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import store from './store/store'

import './index.css'

const BASE_URL = 'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com'
// Add a request interceptor
axios.interceptors.request.use(
    function (config) {
        config.baseURL = BASE_URL
        // Do something before request is sent
        // console.log('req interceptor --->', config)
        return config
    },
    function (error) {
        // Do something with request error
        // console.log('err req interceptor --->', error)

        return Promise.reject(error)
    }
)

// Add a response interceptor
axios.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        console.log('res interceptor --->', response)

        return response
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        console.log('err res interceptor --->', error)

        return Promise.reject(error)
    }
)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)
