export interface ExhibitResI {
    total: number
    page: string
    lastPage: number
    data: Array<ExhibitI>
}

export interface ExhibitI {
    id: number
    imageUrl: string
    description: string
    user: {
        id: number
        username: string
    }
    commentCount: number
    createdAt: string
}

export interface GetUsersResI {
    id: number
    username: string
}

export interface CommentI {
    id: number
    text: string
    createdAt: string
    user: {
        id: number
        username: string
    }
}

export interface FormValuesI {
    username: string
    password: string
}

export interface UserLoginI {
    userName: string
    access_token: string
}

export interface UserRegisterI {
    userName: string
    password: string
    id: number
    isAdmin: boolean
}

export interface InitialStateI {
    user: {
        id: number | null
        username: string
        access_token: string
    }

    isAuth: boolean
    loading: boolean
    userLoading: boolean
    error: boolean
}

export interface NewPostFormValuesI {
    file: File | null
    description: string
}

export interface NewPostResI {
    imageUrl: string
    description: string
    userId: number
    id: number
    commentCount: number
    createdAt: string
}

export interface CommentPostI {
    id: number
    text: string
    createdAt: string
    user: {
        id: number
        username: string
    }
}
