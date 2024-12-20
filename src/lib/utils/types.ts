type User = {
    id: string
    username: string
    password: string
    session?: string
    created_at: string | Date
}

type Payload = Required<Pick<User, 'username' | 'session'>>
