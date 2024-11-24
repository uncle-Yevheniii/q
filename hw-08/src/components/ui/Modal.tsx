import { Modal as ModalWrapper, Card } from '@mui/material'

import { RootState } from '../../store/store'
import { useAppSelector } from '../../store/hook'

interface ModalProps {
    open: boolean
    children: JSX.Element
    handleClose: () => void
    ariaLabelledby?: string
    ariaDescribedby?: string
}

export default function Modal({
    open,
    children,
    handleClose,
    ariaLabelledby = 'modal-modal-title',
    ariaDescribedby = 'modal-modal-description'
}: ModalProps): JSX.Element {
    const themeMode = useAppSelector((state: RootState) => state.theme.mode)
    return (
        <ModalWrapper
            open={open}
            onClose={handleClose}
            aria-labelledby={ariaLabelledby}
            aria-describedby={ariaDescribedby}
        >
            <Card
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: themeMode === 'light' ? '#e9e9e9' : '#1d1c1c',
                    width: '60%',
                    maxHeight: '60%',
                    boxShadow: 24,
                    p: 4,
                    overflow: 'overlay'
                }}
            >
                {children}
            </Card>
        </ModalWrapper>
    )
}
