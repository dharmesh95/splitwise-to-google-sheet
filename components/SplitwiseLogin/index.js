import React, { useEffect, useState } from 'react'
import OAuth2Login from 'react-simple-oauth2-login'
import { useToken } from '../../context/token'

const onFailure = response => console.error(response)

const SplitwiseLogin = () => {
    const [buttonText, setButtonText] = useState('Login to Splitwise')
    const [className, setClassName] = useState('')
    const { token, setToken } = useToken();

    useEffect(() => {
        if (token) {
            setClassName('logged-in-btn')
            setButtonText('Spliwise Connected')
        }
    }, [token])

    const onSuccess = response => {
        setToken(response['access_token'])
    }

    return (
        <OAuth2Login
            authorizationUrl={process.env.NEXT_PUBLIC_SPLITWISE_AUTHORIZE_URL}
            responseType="token"
            clientId={process.env.NEXT_PUBLIC_SPLITWISE_CONSUMER_KEY}
            redirectUri={''}
            onSuccess={onSuccess}
            onFailure={onFailure}
            buttonText={buttonText}
            className={`splitwise-btn ${className}`}
        />
    )
}

export default SplitwiseLogin
