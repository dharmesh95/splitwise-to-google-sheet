const isUI = () => typeof window !== 'undefined'

export const setTokenInSession = (token) => window.sessionStorage?.setItem('token', token)

export const getTokenFromSession = () => isUI() ? window.sessionStorage?.getItem('token') : undefined
