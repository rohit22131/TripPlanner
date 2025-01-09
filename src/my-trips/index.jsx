import { collection, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom'
import UserTripCardItem from './components/userTripCardItem'
import { db} from '@/service/FirebaseConfig'
import { where, getDocs } from 'firebase/firestore'
import Footer from '@/components/custom/Footer'


function MyTrips() {

    const [userTrips, setUserTrips] = useState([]);

    const navigation = useNavigation();

    useEffect(()=>{
        GetUserTrips()
    },[userTrips])

    const GetUserTrips = async() => {
        const user =  JSON.parse(localStorage.getItem('user'))
        console.log(user)
        if(!user){
            navigation('/')
            return
        }
        const q = query(collection(db, 'AITrips'),where('userEmail','==', user?.email))
        const querySnapshot = await getDocs(q);
        setUserTrips([])
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setUserTrips(prevVal => [...prevVal,doc.data()])
});
}

  
return (
    <div className='flex flex-col min-h-screen'>
    <div className='sm:px-20 md:px-32 lg:px-56 xl:px-72 px-5'>
        <h2 className='font-bold text-3xl pt-20'>My Trips</h2>
        <div>
        <div className=' flex flex-col gap-5 mt-10'>
            {userTrips?.length>0? userTrips.map((trip, index)=>(
                <UserTripCardItem trip = {trip} key = {index}/>
            ))
        :
        <h2>No Trip Found</h2>
        }
        </div>
    </div>
    </div>
    <Footer/>
    </div>
  )
}

export default MyTrips