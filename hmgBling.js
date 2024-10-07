import { addToken } from "./apiToken.js"

// 1ª etapa da homologação Bling.
async function getProduct() {
    const newToken = await addToken() // Retorna um token válido para o aplicativo na Bling.

    const getNewProduct = await fetch("https://api.bling.com.br/Api/v3/homologacao/produtos", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + newToken.access_token
        }
    })
    .then( res  => {
        console.log("- 1ª etapa concluída!")
        return res
    })
    .catch( err => err )

    return getNewProduct
}

// 2ª etapa da homologação Bling.
async function postProduct() {
    const newToken = await addToken() // Retorna um token válido para o aplicativo na Bling.

    const getNewProduct = await getProduct() // Executa a etapa anterior
    const newBody = await getNewProduct.json()

    const postNewProduct = await fetch("https://api.bling.com.br/Api/v3/homologacao/produtos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + newToken.access_token,  
            "x-bling-homologacao": getNewProduct.headers.get('x-bling-homologacao') // Utiliza o objeto "x-bling-homologacao" da reposta da última etapa.
        },
        body: JSON.stringify(await newBody.data)
    })
    .then( res  => {
        console.log("- 2ª etapa concluída!")
        return res
    })
    .catch( err => err )

    return postNewProduct
}

// 3ª etapa da homologação Bling.
async function putProduct() {
    const newToken = await addToken() // Retorna um token válido para o aplicativo na Bling.

    const postNewProduct = await postProduct() // Executa a etapa anterior
    const newBody = await postNewProduct.json()

    const nextBody = {...newBody.data, nome: "Copo"}

    const putNewProduct = await fetch(`https://api.bling.com.br/Api/v3/homologacao/produtos/${newBody.data.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + newToken.access_token,  
            "x-bling-homologacao": postNewProduct.headers.get('x-bling-homologacao') // Utiliza o objeto "x-bling-homologacao" da reposta da última etapa.
        },
        body: JSON.stringify(nextBody)
    })
    .then( res  => {
        console.log("- 3ª etapa concluída!")
        return res
    })
    .catch( err => err )

    return {
        response: putNewProduct,
        idProduct: newBody.data.id
    }
}

// 4ª etapa da homologação Bling.
async function patchProduct() {
    const newToken = await addToken() // Retorna um token válido para o aplicativo na Bling.

    const putNewProduct = await putProduct() // Executa a etapa anterior
    const idProduct = await putNewProduct.idProduct

    const patchNewProduct = await fetch(`https://api.bling.com.br/Api/v3/homologacao/produtos/${idProduct}/situacoes`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + newToken.access_token,  
            "x-bling-homologacao": putNewProduct.response.headers.get('x-bling-homologacao') // Utiliza o objeto "x-bling-homologacao" da reposta da última etapa.
        },
        body: JSON.stringify({situacao: "I"})
    })
    .then( res  => {
        console.log("- 4ª etapa concluída!")
        return res
    })
    .catch( err => err )

    return {
        response: patchNewProduct,
        idProduct
    }       
}

// 5ª etapa da homologação Bling.
export default async function deleteProduct() {
    const newToken = await addToken() // Retorna um token válido para o aplicativo na Bling.

    const patchNewProduct = await patchProduct() // Executa a etapa anterior
    const idProduct = await patchNewProduct.idProduct

    const deleteNewProduct = await fetch(`https://api.bling.com.br/Api/v3/homologacao/produtos/${idProduct}`, {
        method: "delete",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + newToken.access_token,  
            "x-bling-homologacao": patchNewProduct.response.headers.get('x-bling-homologacao') // Utiliza o objeto "x-bling-homologacao" da reposta da última etapa.
        },
        body: JSON.stringify({situacao: "I"})
    })
    .then( res  => {
        console.log("- 5ª e última etapa concluída!")
        return "Todas as etapas da homologação foram concluídas com sucesso! Verfique"
    })
    .catch( err => err )

    return deleteNewProduct
}