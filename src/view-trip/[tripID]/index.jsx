import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/service/FirebaseConfig";
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "@/components/custom/Footer";

function ViewTrip() {
  const { tripID } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    tripID && GetTripData();
  }, [tripID]);

  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("document: ", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("No data exists.");
      toast("No Trip Found!");
    }
  };

  return (
    <>
      <div className="md:px-20 lg:px-44 xl:px-56 p-5 pt-20">
        <InfoSection trip={trip} />
        <Hotels trip={trip} />
        <PlacesToVisit trip={trip} />
      </div>
      <Footer />
    </>
  );
}

export default ViewTrip;
