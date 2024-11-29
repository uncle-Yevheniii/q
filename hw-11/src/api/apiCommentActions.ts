import { AxiosResponse } from 'axios'

import httpClient from './httpClient'
import type { CommentResponse } from '@/types/typeResponse'

export async function getAllComments(id: number): Promise<Array<CommentResponse>> {
    const res: AxiosResponse = await httpClient.get(`/api/exhibits/${id}/comments`)
    const dataRes: Array<CommentResponse> = res.data

    return dataRes
}

export async function postComment(id: number, data: { comment: string }): Promise<CommentResponse> {
    const dataReq = {
        text: data.comment
    }
    const res: AxiosResponse = await httpClient.post(`/api/exhibits/${id}/comments`, dataReq)
    const dataRes: CommentResponse = res.data

    return dataRes
}

export async function deleteComment(postID: number, commentID: number): Promise<void> {
    const res: AxiosResponse = await httpClient.delete(`/api/exhibits/${postID}/comments/${commentID}`)
    const dataRes: void = res.data

    return dataRes
}
