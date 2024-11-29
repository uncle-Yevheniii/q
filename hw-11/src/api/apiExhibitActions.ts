import { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios'

import httpClient from './httpClient'
import type { ExhibitCreateResponse, ExhibitResponse } from '@/types/typeResponse'

export async function getAllExhibits(p: number = 1, l: number = 5): Promise<ExhibitResponse> {
    const config: AxiosRequestConfig = {
        params: { page: p, limit: l } as RawAxiosRequestHeaders
    }

    const res: AxiosResponse = await httpClient.get('/api/exhibits', config)
    const dataRes: ExhibitResponse = res.data

    return dataRes
}
export async function getAllMyExhibits(p: number = 1, l: number = 5): Promise<ExhibitResponse> {
    const config: AxiosRequestConfig = {
        params: { page: p, limit: l } as RawAxiosRequestHeaders
    }

    const res: AxiosResponse = await httpClient.get('/api/exhibits/my-posts', config)
    const dataRes: ExhibitResponse = res.data

    return dataRes
}
export async function postExhibit(formData: FormData): Promise<ExhibitCreateResponse> {
    const config: AxiosRequestConfig = {
        headers: { 'Content-Type': 'multipart/form-data' } as RawAxiosRequestHeaders
    }

    const dataReq = {
        image: formData.get('file'),
        description: formData.get('description')
    }

    const res: AxiosResponse = await httpClient.post('/api/exhibits', dataReq, config)
    const data: ExhibitCreateResponse = res.data

    return data
}
export async function deleteExhibit(postID: number): Promise<void> {
    await httpClient.delete(`/api/exhibits/${postID}`)
}
