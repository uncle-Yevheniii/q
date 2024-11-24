export interface RegisterResponse {
    id: number | null
    username: string
    password: string
    isAdmin: boolean
}
export interface LoginResponse {
    userId: number | null
    access_token: string
    refresh_token: string
    userName: string
}
export interface GetUserResponse {
    id: number
    username: string
}

export interface ExhibitResponse {
    total: number
    page: string
    lastPage: number
    data: Array<ExhibitI>
}
export interface ExhibitI {
    id: number
    imageUrl: string
    description: string
    user: GetUserResponse
    commentCount: number
    createdAt: string
}

export interface CommentResponse {
    id: number
    text: string
    createdAt: string
    user: GetUserResponse
}

export interface ExhibitCreateResponse {
    imageUrl: string
    description: string
    userId: number
    id: number
    commentCount: string
    createdAt: number
}

export interface CreateExhibitFormValues {
    file: File | null
    description: string
}
