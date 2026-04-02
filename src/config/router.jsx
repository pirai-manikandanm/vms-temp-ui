import { createBrowserRouter } from 'react-router-dom'
import VoucherCreationHome from '../pages/voucher/VoucherCreationHome'
import VoucherCreation from '../pages/voucher/VoucherCreation'

const router = createBrowserRouter([
        {
                path: '/',
                element: <VoucherCreationHome />,
        },
        {
                path: '/voucher-creation',
                element: <VoucherCreation />,
        },
])

export default router