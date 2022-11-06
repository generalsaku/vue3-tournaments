export const requestGet = async (url: string) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: headers()
    })

    return response.json()
}

export const requestPost = async (url: string, body: any) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(body)
    })

    return response.json()
}

export const requestDelete = async (url: string) => {
    const response = await fetch(url, {
        method: 'DELETE',
        headers: headers()
    })

    return response.status
}

export const requestPatch = async (url: string, body: any = {}) => {
    const response = await fetch(url, {
        method: 'PATCH',
        headers: headers(),
        body: JSON.stringify(body)
    })

    return response.status
}

export const requestPut = async (url: string) => {
    const response = await fetch(url, {
        method: 'PUT',
        headers: headers()
    })

    return response.status
}

const headers = () => {
    const token = localStorage.getItem('access_token')
    
    return {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
    }
}