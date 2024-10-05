import 'dotenv/config'

// Utiliza um refreshToken válido para gerar novos accessToken e refreshToken válidos.
export default async function getToken(refreshToken) {
    const newBody = {
        "grant_type": "refresh_token",
        "refresh_token": refreshToken
    }

    // Faz a requisição no endpoint token da Bling para receber novos tokens.
    const getToken = await fetch('https://www.bling.com.br/Api/v3/oauth/token', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": process.env.BASIC_AUTH
        },
        body: JSON.stringify(newBody)
    })
    .then(res => res.json())

    // Retorna a resposta + data e hora da requisição para registro.
    return {
        ...getToken, generated_at: new Date() 
    }
}