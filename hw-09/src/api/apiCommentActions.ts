import { AxiosResponse } from 'axios'

import httpClient from './httpClient'
import type { CommentI, CommentPostI } from '../types/types'

export async function getAllComments(id: number): Promise<Array<CommentI>> {
    const res: AxiosResponse = await httpClient.get(`/api/exhibits/${id}/comments`)
    const dataRes: Array<CommentI> = res.data

    return dataRes
}

export async function postComment(id: number, data: { comment: string }): Promise<CommentPostI> {
    const dataReq = {
        text: data.comment
    }
    const res: AxiosResponse = await httpClient.post(`/api/exhibits/${id}/comments`, dataReq)
    const dataRes: CommentPostI = res.data

    return dataRes
}

export async function deleteComment(postID: number, commentID: number): Promise<void> {
    const res: AxiosResponse = await httpClient.delete(`/api/exhibits/${postID}/comments/${commentID}`)
    const dataRes: void = res.data

    return dataRes
}
