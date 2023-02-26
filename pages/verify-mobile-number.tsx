import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { db } from '@/lib/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

const VerifyMobileNumber = () => {
    const router = useRouter();
    const { panic_id, uid } = router.query;
    const [isMobile, setIsMobile] = useState<boolean>(true)

    const updateVerificationNumber = async () => {
        try {
            const updateRef = doc(db, "users", uid as string, "panic_info", panic_id as string);
            await updateDoc(updateRef, {
                "status": "Verified"
            })
        } catch (e) {
            console.log(e);
            setIsMobile(false)
        }
    }

    useEffect(() => {
        if (router.isReady) {
            updateVerificationNumber()
        }
    }, [router.isReady])

    return (
        <div className='flex justify-center items-center h-screen bg-normal'>
            {isMobile ? (
                <div>
                    <h1 className='text-4xl'>Mobile number verified!</h1>
                </div>
            ) : (
                <div>
                    <h1 className='text-4xl'>Link Expired!</h1>
                </div>
            )}
        </div>
    )
}

export default VerifyMobileNumber