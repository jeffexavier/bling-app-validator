import { addToken } from "./apiToken.js"

async function getProduct() {
    const newToken = await addToken()

    const getNewProduct = await fetch("https://api.bling.com.br/Api/v3/homologacao/produtos", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + newToken.access_token
        }
    })
    .then( res  => res )
    .catch( err => err )

    return getNewProduct
}

async function postProduct() {
    const newToken = await addToken()

    const getNewProduct = await getProduct()
    const newBody = await getNewProduct.json()

    const postNewProduct = await fetch("https://api.bling.com.br/Api/v3/homologacao/produtos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + newToken.access_token,  
            "x-bling-homologacao": getNewProduct.headers.get('x-bling-homologacao')
        },
        body: JSON.stringify(await newBody.data)
    })
    .then( res  => res )
    .catch( err => err )

    return postNewProduct
}

async function putProduct() {
    const newToken = await addToken()

    const postNewProduct = await postProduct()
    const newBody = await postNewProduct.json()

    const nextBody = {...newBody.data, nome: "Copo"}

    const putNewProduct = await fetch(`https://api.bling.com.br/Api/v3/homologacao/produtos/${newBody.data.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + newToken.access_token,  
            "x-bling-homologacao": postNewProduct.headers.get('x-bling-homologacao')
        },
        body: JSON.stringify(nextBody)
    })
    .then( res  => res )
    .catch( err => err )

    return {
        response: putNewProduct,
        idProduct: newBody.data.id
    }
}

async function patchProduct() {
    const newToken = await addToken()

    const putNewProduct = await putProduct()
    const idProduct = await putNewProduct.idProduct

    const patchNewProduct = await fetch(`https://api.bling.com.br/Api/v3/homologacao/produtos/${idProduct}/situacoes`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + newToken.access_token,  
            "x-bling-homologacao": putNewProduct.response.headers.get('x-bling-homologacao')
        },
        body: JSON.stringify({situacao: "I"})
    })
    .then( res  => res )
    .catch( err => err )

    return {
        response: patchNewProduct,
        idProduct
    }       
}

async function deleteProduct() {
    const newToken = await addToken()

    const patchNewProduct = await patchProduct()
    const idProduct = await patchNewProduct.idProduct

    const deleteNewProduct = await fetch(`https://api.bling.com.br/Api/v3/homologacao/produtos/${idProduct}`, {
        method: "delete",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + newToken.access_token,  
            "x-bling-homologacao": patchNewProduct.response.headers.get('x-bling-homologacao')
        },
        body: JSON.stringify({situacao: "I"})
    })
    .then( res  => res )
    .catch( err => err )

    return {
        response: deleteNewProduct,
        idProduct
    }       
}
// async function teste() {
//     const test = await deleteProduct()
//     console.log(test)
// }

// teste()