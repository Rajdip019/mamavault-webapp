/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { daysToWeeks, differenceInDays } from 'date-fns'
import Chip from './Shared/Chips'
import { CircularProgress } from '@mui/material'
import { IUser } from '@/interfaces/user'

interface Props {
    userData: IUser
}

const Profile: React.FC<Props> = ({ userData }) => {

    const pregnancyStartingDate = userData.account_created && new Date(userData.account_created?.seconds * 1000);
    
    const today = new Date();
    const daysGap = pregnancyStartingDate && differenceInDays(today, pregnancyStartingDate);
    const weeksGap = daysGap && daysToWeeks(daysGap);
    const progressBar = daysGap && (daysGap / 280) * 100
    
    return (
        <div className='pt-10 sticky top-10 min-h-screen'>
            <h1 className='text-2xl font-semibold mb-5'>Mom's Details</h1>
            <div className=' sm:flex text-center sm:text-left items-center p-6 rounded-2xl pr-5 border-2 border-[#6061F6] bg-[#6060f61e]'>
                {/* Profile Info */}
                <div className=" flex justify-center mb-5 sm:mb-0 ">
                    <img src={userData.image} alt="" className=' rounded-full w-28 h-28 mr-5 ring-2 ring-[#6061F6]' />
                </div>
                <div>
                    {/* Profile Data */}
                    <p> <span className='font-medium mb-2' >Name :</span> {userData.name}</p>
                    <p><span className='font-medium mb-2'>Age :</span> {userData.age}</p>
                    <p> <span className='font-medium mb-2'>Blood Group :</span> {userData.blood_group} </p>
                    {userData.account_created?.seconds && <p> <span className=' font-medium mb-2'> Pregnancy Time : </span><>{weeksGap} Weeks </></p>}
                </div>
            </div>
            <div className='flex mt-5 items-center mb-5 lg:mb-0 border-2 border-[#6061F6] rounded-xl p-4 bg-[#6060f61e] '>
                <div className=' aspect-square flex items-center '>
                    <CircularProgress variant="determinate" value={progressBar} thickness={22} size={100} sx={{ mr: 5, color: '#EFF2FF', backgroundColor: "#6061F6", borderRadius: '100%' }} />
                </div>
                <p className=' text-xl'>Here is a progress bar for The baby!</p>
            </div>
            <div className='border-2 border-[#6061F6] bg-[#6060f61e] my-5 rounded-xl p-5'>
                <div className='lg:mb-0'>
                    <p className='text-lg mb-2'>Current Medicines</p>
                    <div className=' flex gap-4 flex-wrap'>
                        {userData?.medicines?.map((med, i) => {
                            console.log("medicine is: ", med);
                            return <Chip name={med} key={i} />
                        })}
                    </div>
                </div>
                <div className='mt-5 mb-5 lg:mb-0'>
                    <p className='text-lg mb-2'>Diseases</p>
                    <div className=' flex gap-4 flex-wrap'>
                        {userData?.diseases?.map((med: string, i: number) => {
                            return <Chip name={med} key={i} />
                        })}
                    </div>
                </div>
                <div className='mt-5 mb-10 lg:mb-0'>
                    <p className='text-lg mb-2'>Allergies</p>
                    <div className=' flex gap-4 flex-wrap'>
                        {userData?.allegies?.map((med: string, i: number) => {
                            return <Chip name={med} key={i} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile