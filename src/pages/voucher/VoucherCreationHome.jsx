import React from 'react'
import { singlife, thirdparty } from '../../helper/image_helper'
import { VOUCHER_CREATION_TYPE } from '../../common/constant'
import { useNavigate } from 'react-router-dom'

const VoucherCreationHome = () => {

        const navigate = useNavigate()

        const handleRedirect = (type) => {
                navigate(`/voucher-creation`, { state: { type } })
        }
        return (
                <div className='center_div'>
                        <img src={singlife} onClick={() => handleRedirect(VOUCHER_CREATION_TYPE.SINGLIFE)} alt="singlife" className=' w-[300px] h-[400px] cursor-pointer' />
                        <img src={thirdparty} onClick={() => handleRedirect(VOUCHER_CREATION_TYPE.THIRDPARTY)} alt="thirdparty" className=' w-[300px] h-[400px] cursor-pointer' />
                </div>
        )
}

export default VoucherCreationHome
