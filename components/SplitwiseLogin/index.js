import React, { useEffect, useState } from 'react'
import OAuth2Login from 'react-simple-oauth2-login'
import { useToken } from '../../context/token'

const onFailure = response => console.error(response)

const OAuth2 = () => {
    const [className, setClassName] = useState('login-btn')
    const { token, setToken } = useToken();

    useEffect(() => {
        if (token) {
            setClassName('hide-btn')
        }
    }, [token])

    const onSuccess = response => {
        setToken(response['access_token'])
        setClassName('hide-btn')
    }

    return (
        <OAuth2Login
            authorizationUrl={process.env.NEXT_PUBLIC_SPLITWISE_AUTHORIZE_URL}
            responseType="token"
            clientId={process.env.NEXT_PUBLIC_SPLITWISE_CONSUMER_KEY}
            redirectUri={''}
            onSuccess={onSuccess}
            onFailure={onFailure}
            buttonText={'Login to Splitwise'}
            className={className}
        />
    )
}

export default OAuth2
