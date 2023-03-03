import React, { useState } from 'react'
import OAuth2Login from 'react-simple-oauth2-login'
import { setTokenInSession } from '../helper/session'

const onFailure = response => console.error(response)

const OAuth2 = () => {
    const [className, setClassName] = useState('login-btn')

    const onSuccess = response => {
        console.log(response)
        setTokenInSession(response['access-token'])
        setClassName('hide-btn')
    }

    console.log(process.env.NEXT_PUBLIC_SPLITWISE_CONSUMER_KEY)
    
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
