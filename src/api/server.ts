const token = '084e3c4a6c39d43496eaf94eb4453c6a3fb2456f913d4a56'

export const server_calls = {
    get: async () => {
        const response = await fetch(`https://receptive-flame-secure.glitch.me/api/books`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
               'Access-Control-Allow-Origin' : '*',
               'x-access-token': `Bearer ${token}`
            },
        });

        if (!response.ok){
            throw new Error('Failed to fetch data from the server')
        }

        return await response.json()
    },

    create: async (data: any = {}) => {
        const response = await fetch(`https://receptive-flame-secure.glitch.me/api/books`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            throw new Error('Failed to create new data on the server')
        }

        return await response.json()
    },

    update: async (id:string, data: any = {}) => {
        const response = await fetch(`https://receptive-flame-secure.glitch.me/api/books/${id}`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            throw new Error('Failed to update data on server')
        }

        return await response.json()
    },

    delete: async (id:string, data: any = {}) => {
        const response = await fetch(`https://receptive-flame-secure.glitch.me/api/books/${id}`,
        {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        })

        if (!response.ok) {
            throw new Error('Failed to delete data on server')
        }

        return;
    },
}