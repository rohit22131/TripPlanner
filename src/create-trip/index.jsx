
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner"
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '@/constants/options';
import React, { useEffect } from 'react'
import { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { chatSession } from '@/service/AiModel';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import axios, { Axios } from 'axios';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { setDoc, doc } from 'firebase/firestore';
import { db } from '@/service/FirebaseConfig';
import { useNavigate} from 'react-router-dom';
import Footer from '@/components/custom/Footer';
  

function CreateTrip() {

    const [place, setPlace] = useState();

    const [formData, setFormData] = useState([])

    const [openDailog, setOpenDailog] = useState(false);

    const [loading,setLoading] = useState(false)

    const navigate = useNavigate();
;
    const handleInputChange = (name, value)=>{

        if(name == 'noOfDays' && value > 5){
            console.log("Please enter days less than 5")
            return
        }
        setFormData({
            ...formData,
            [name]:value
        })
    }

    useEffect(()=>{
        console.log(formData);
    }, [formData])

    const login = useGoogleLogin({
        onSuccess:(codeResp)=>GetUserProfile(codeResp),
        onError:(error)=>console.log(error)
    })

    const saveTrip = async(TripData) =>{
        setLoading(true)
        const user = JSON.parse(localStorage.getItem('user'));
        const docID = Date.now().toString();
await setDoc(doc(db, "AITrips", docID), {
        userSelection: formData,
        tripData: JSON.parse(TripData),
        userEmail: user?.email,
        id: docID
  });
  setLoading(false)
  navigate('/view-trip/'+docID)
    }

    const onGenerateTrip = async() =>{
        const user = localStorage.getItem('user');
        if(!user){
            setOpenDailog(true)
            return
        }
        if(formData?.noOfDays>5 && !formData?.location || !formData?.budget || !formData?.people){
            toast("Please enter all the details.")
            return
        }
        setLoading(true)
    const FINAL_PROMPT = AI_PROMPT
    .replace('{location}', formData?.location)
    .replace('{totalDays}', formData?.noOfDays)
    .replace('{people}',formData?.people)
    .replace('{budget}', formData?.budget)
    .replace('{totalDays}', formData?.noOfDays)

    const result = await chatSession.sendMessage(FINAL_PROMPT)

    console.log(result?.response?.text())
    saveTrip(result?.response?.text());
    setLoading(false)
    }

    const GetUserProfile = (tokenInfo) =>{
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
            {
                headers:{
                    Authorization: `Bearer ${tokenInfo?.access_token}`,
                    Accept:'Application/json'
                }
            }).then((resp)=>{
                console.log(resp);
                localStorage.setItem('user',JSON.stringify(resp.data));
                setOpenDailog(false)
                onGenerateTrip();
            })
    }

  return (
    <>
    <div className='sm:px-10 md:px-32 lg:px-56 px-5 pt-40 px-20'>
        <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
        <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based your preference.</p>
        <div className='mt-20 flex flex-col'>
            <div>
                <h2 className='text-xl my-3 font-medium'>What is your destination?</h2>
                {/* <GooglePlacesAutocomplete
                apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                selectProps={
                    {
                        place,
                        onChange: (v) => {setPlace(v); handleInputChange('location', v)}
                    }
                }
                /> */}
                 <Input placeholder= {"Destination"} type = "text"
            onChange={(e)=>handleInputChange('location', e.target.value)}
                />
            </div>

            <div className='mt-10'>
            <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
            <Input placeholder= {"Ex.3"} type = "number"
            onChange={(e)=>handleInputChange('noOfDays', e.target.value)}
                />
            </div>
        </div>

        <div>
        <h2 className='text-xl my-3 font-medium mt-10'>What is your budget?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5 cursor-pointer'>
            { SelectBudgetOptions.map((item,index)=>(
                    <div key={index}
                    onClick={()=>handleInputChange('budget', item.title)}
                    className={`p-4 border rounded-lg hover:shadow-lg
                        ${formData?.budget==item.title&&'shadow-lg border-black'}`
                    }>
                        <h2 className='text-4xl'>{item.icon}</h2>
                        <h2 className='font-bold text-lg'>{item.title}</h2>
                        <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                        </div>
                ))
            }
        </div>       
        </div>
        
        <div>
        <h2 className='text-xl my-3 font-medium mt-10'>Who do you plan on travelling on your next adventure?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5 cursor-pointer'>
            { SelectTravelList.map((item,index)=>(
                    <div key={index}
                    onClick={()=>handleInputChange('people', item.People)} 
                    className={`p-4 border rounded-lg hover:shadow-lg
                        ${formData?.people==item.People&&'shadow-lg border-black'}`
                    }>
                        <h2 className='text-4xl'>{item.icon}</h2>
                        <h2 className='font-bold text-lg'>{item.title}</h2>
                        <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                        </div>
                ))
            }
        </div>       
        </div>
        <div className='flex justify-center mt-10 mb-10'>
            <Button
            className='rounded-full'
            disabled = {loading}
            onClick = {onGenerateTrip}>
            {loading?
            <AiOutlineLoading3Quarters className ='h-6 w-6 animate-spin' />: 'Generate Trip'}
            </Button>
            </div>
        
            <Dialog open = {openDailog}>
  <DialogContent>
    <DialogHeader>
      <DialogDescription>
       <img className='w-[180px]' src="/logos.png" />
       <h2 className='font-bold text-lg mt-5'>Sign In with Google</h2>
        <p>sign in to the website with google authentication.</p>
        <div >
        <Button
        onClick ={login}
        className='mt-4 w-full'>
             Sign In with Google
            </Button>

        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
    </div>
    <Footer/>
</>
  )
}

export default CreateTrip
