import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios'

import type { ExhibitResI, NewPostResI } from '../types/types'

export async function getAllExhibits(p: number = 1, l: number = 5): Promise<ExhibitResI> {
    const config: AxiosRequestConfig = {
        params: {
            page: p,
            limit: l
        } as RawAxiosRequestHeaders
    }

    const res: AxiosResponse = await axios.get('/api/exhibits', config)
    const dataRes: ExhibitResI = res.data

    return dataRes
}

export async function getAllMyExhibits(p: number = 1, l: number = 5): Promise<ExhibitResI> {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        params: {
            page: p,
            limit: l
        } as RawAxiosRequestHeaders
    }

    const res: AxiosResponse = await axios.get('/api/exhibits/my-posts', config)
    const dataRes: ExhibitResI = res.data

    return dataRes
}

export async function postExhibit(formData: FormData): Promise<NewPostResI> {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
        } as RawAxiosRequestHeaders
    }

    const dataReq = {
        image: formData.get('file'),
        description: formData.get('description')
    }

    const res: AxiosResponse = await axios.post('/api/exhibits', dataReq, config)
    const data: NewPostResI = res.data

    return data
}

export async function deleteExhibit(postID: number): Promise<void> {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }

    await axios.delete(`/api/exhibits/${postID}`, config)
}
