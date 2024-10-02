import 'dotenv/config'

export default async function getToken(refreshToken) {

    const newBody = {
        "grant_type": "refresh_token",
        "refresh_token": refreshToken
    }

    const getToken = await fetch('https://www.bling.com.br/Api/v3/oauth/token', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": process.env.BASIC_AUTH
        },
        body: JSON.stringify(newBody)
    })
    .then(res => res.json())

    return {
        ...getToken, generated_at: new Date()
    }
}