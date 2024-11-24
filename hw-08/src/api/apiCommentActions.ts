import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios'

import type { CommentI, CommentPostI } from '../types/types'

export async function getAllComments(id: number): Promise<Array<CommentI>> {
    const res: AxiosResponse = await axios.get(`/api/exhibits/${id}/comments`)
    const dataRes: Array<CommentI> = res.data

    return dataRes
}

export async function postComment(id: number, data: { comment: string }): Promise<CommentPostI> {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        } as RawAxiosRequestHeaders
    }

    const dataReq = {
        text: data.comment
    }
    const res: AxiosResponse = await axios.post(`/api/exhibits/${id}/comments`, dataReq, config)
    const dataRes: CommentPostI = res.data

    return dataRes
}

export async function deleteComment(postID: number, commentID: number): Promise<void> {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        } as RawAxiosRequestHeaders
    }

    const res: AxiosResponse = await axios.delete(`/api/exhibits/${postID}/comments/${commentID}`, config)
    const dataRes: void = res.data

    return dataRes
}
