exports.handler = async function () {
    const creds = {
        clientId: process.env.WORKOS_CLIENT_ID,
        provider: 'GoogleOAuth',
        redirect: process.env.BASE_APP_URL
    }
    
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: creds
        })
    }
}
