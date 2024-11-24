// const a = {
//     loading: 'Writing comment...',
//     success: () => {
//         return 'Comment write successfully'
//     },
//     error: (error) => {
//         console.error('Failed to write comment:', error.message)
//         return 'Failed to write comment'
//     }
// }

// export function toastMassage(type: string): ToastMassageI {}

interface ToastMassageI {
    loading: string
    success: () => string
    error: (error: Error) => string
}

export const commentAction = () => {
    return {
        loading: 'Writing comment...',
        success: () => {
            return 'Comment write successfully'
        },
        error: (error: Error) => {
            console.error('Failed to write comment:', error.message)
            return 'Failed to write comment'
        }
    }
}

export const actions = {
    addComment: commentAction
}
