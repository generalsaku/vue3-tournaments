import { requestGet, requestPost, requestDelete, requestPatch, requestPut } from "@/api/request"

export default {
    teams: {
        get: async () => {
            return await requestGet(url(`/teams`))
        },
        post: async (teams: any) => {
            return await requestPost(url(`/teams`), teams)
        }
    },
    tournament: {
        get: async (id: string) => {
            return await requestGet(url(`/tournament/${id}`))
        },
        create: async (tournament: any) => {
            return await requestPost(url(`/tournament`), tournament)
        },
        delete: async (id: string) => {
            return await requestDelete(url(`/tournament/${id}`))
        },
        mine: async () => {
            return await requestGet(url(`/tournament/mine`))
        },
        subscribe: async (id: string) => {
            return await requestPatch(url(`/tournament/${id}/subscribe`))
        },
        unsubscribe: async (id: string) => {
            return await requestPatch(url(`/tournament/${id}/unsubscribe`))
        },
        lock: async (id: string) => {
            return await requestPatch(url(`/tournament/${id}/lock`))
        },
        unlock: async (id: string) => {
            return await requestPatch(url(`/tournament/${id}/unlock`))
        },
        game: async (id: string, gameId: string, team1Score: number, overtime: boolean, team2Score: number) => {
            return await requestPatch(url(`/tournament/${id}/game/${gameId}?team1Score=${team1Score}&overtime=${overtime}&team2Score=${team2Score}`))
        },
        tiebreaker: async (id: string, tiebreaker: string[]) => {
            const query = tiebreaker.reduce((acc, current) => {
                return acc += `tiebreaker[]=${encodeURIComponent(current)}&`
            }, '').slice(0, -1)
            
            return await requestPut(url(`/tournament/${id}/tiebreaker?${query}`))
        },
    }
}

const url = (path: string) => {
    return `${import.meta.env.VITE_API_BASE_URL}${path}`
}




