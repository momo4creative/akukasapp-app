import { PRIVATE_GS_API } from "$env/static/private";

class Database {
    params!: DbParams
    session!: string
    authenticate?: boolean

    constructor() {
        this.authenticate = false
    }

    async fetching<T>() {
        // console.log(JSON.stringify(this.params, null, 2));

        if (!this.params) {
            console.log('Invalid param database !');
            throw new Error("Param kosong !");
        }

        const query = JSON.stringify({ ...this.params, session: this.session })
        const time = new Date().getTime()

        const res = await fetch(PRIVATE_GS_API + "?q=" + query + "&time=" + time)
        const [result, error] = await res.json()

        if (error) throw new Error(error);
        return result as T
    }
}

const db = new Database()

export function setSession(value: string) {
    db.session = value
}


export default db