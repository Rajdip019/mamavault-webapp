import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import { CircularProgress } from '@mui/material';
import Profile from '@/components/Profile';
import Head from 'next/head';
import UserDocument from '@/components/UserDocument';
import { ISharedDoc } from '@/interfaces/user';
import { IDocuments } from '@/interfaces/docuemnt';
import { getTime } from 'date-fns';

const SharedPage = () => {

    const router = useRouter()
    const { shared_id, uid } = router.query;

    const [userData, setUserData] = React.useState<ISharedDoc>();
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [isExpired, setIsexpired] = React.useState<boolean>(false);
    const [dateFilterDocs, setDateFilterDocs] = useState<any[]>([]);


    const getUserData = React.useCallback(async () => {
        if (shared_id) {
            const docRef = doc(db, "shared_docs", shared_id as string);
            const docSnap = await getDoc(docRef);
            console.log(docSnap.data());
            
            if (docSnap.exists()) {
                setUserData(docSnap.data() as ISharedDoc);
                const docs: IDocuments[] = await docSnap.data().documents;
                try {
                    const updateRef = doc(db, "users", uid as string, "shared_links", shared_id as string);
                    const shreadLinkSnap = await getDoc(updateRef)
                    if(shreadLinkSnap.exists()){
                        await updateDoc(updateRef, {
                            "views": shreadLinkSnap.data().views + 1
                        })
                        console.log("Done");
                        
                    }

                } catch (e) {
                    console.log("Error", e);
                }
                const _date_filterd_docs: { time: number, document: IDocuments[] }[] = []
                const dates = docs.map((data: IDocuments) => { return getTime(new Date(data.timeline_time)) })
                dates.map((date) => {
                    docs.map((data: IDocuments) => {
                        if (date === getTime(new Date(data.timeline_time))) {
                            if (_date_filterd_docs.filter(e => getTime(new Date(data.timeline_time)) === e.time).length > 0) {
                                const index = _date_filterd_docs.findIndex(e => getTime(new Date(data.timeline_time)) === e.time)
                                if (_date_filterd_docs[index].document.includes(data)) {
                                    console.log("Already contains data");
                                } else {
                                    _date_filterd_docs[index].document.push(data)
                                }
                            } else {
                                _date_filterd_docs.push({
                                    time: date,
                                    document: [data]
                                })
                            }
                        }
                    })
                })
                console.log("Done2");
                
                setDateFilterDocs(_date_filterd_docs);
                setIsLoading(false);
            } else {
                setIsLoading(false);
                setIsexpired(true);
                console.log("No such document!");
            }
        }

    }, [router.isReady]);

    React.useEffect(() => {
        if (router.isReady) {
            getUserData();
        }
    }, [getUserData, router.isReady]);

    console.log(userData);

    return (
        <div>
            {isLoading ? (
                <Head>
                    <title>Loading...</title>
                </Head>
            ) : (
                <Head>
                    <title>{userData?.userData.name ? userData?.userData.name  : "Invalid Link"}</title>
                </Head>
            )}
            {isLoading ? (
                <div className=' flex justify-center items-center h-screen'>
                    <CircularProgress />
                </div>
            ) : (
                <>
                    {isExpired ? (
                        <div className=' flex justify-center items-center h-screen bg-normal'>
                            <div>
                                <div className=' flex justify-center'>
                                    <img src="/invalid_link.svg" alt="" className=' w-72 mb-16' />
                                </div>
                                <p className=' text-4xl mx-5'>This Link is <span className=' text-red-500'>expired</span> or the URL is <span className=' text-red-500'>invalid</span>!</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* <Navbar /> */}
                            <div className='lg:grid lg:grid-cols-8 px-8 md:px-10 lg:px-20 lg:gap-10 bg-normal'>
                                <div className='lg:col-span-3'>
                                    {userData && <Profile userData={userData?.userData } />}
                                </div>
                                <div className=' col-span-1 lg:col-span-5 pb-10'>
                                    {userData?.documents?.length !== 0 ? (
                                        <>
                                            <div className='mt-10 flex sm:flex-row-reverse flex-col-reverse justify-between items-center'>
                                                <div className='flex sm:flex-row-reverse flex-col-reverse'>
                                                </div>
                                                <div className=' md:flex items-center hidden'>
                                                    {/* <FilterAltIcon /> */}
                                                    <p className=' text-2xl font-bold'>All Shared Documents</p>
                                                </div>
                                            </div>
                                            {true ? (
                                                <>
                                                    {dateFilterDocs.map((userDocument: { time: number, document: IDocuments[] }, i: number) => {
                                                        return <UserDocument key={i} userDocument={userDocument} />
                                                    })}
                                                </>
                                            ) : (
                                                <>
                                                    {dateFilterDocs.map((userDocument: { time: number, document: IDocuments[] }, i: number) => {
                                                        return <UserDocument key={i} userDocument={userDocument} />
                                                    })}
                                                </>
                                            )}
                                        </>
                                    ) : null}
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default SharedPage