import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoIosLogOut } from "react-icons/io";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import axios from "axios";

function Header() {
  const [openDailog, setOpenDailog] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDailog(false);
        window.location.reload();
      });
  };

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className="p-3 shadow-sm flex justify-between item-center lg:px-10 sm:px-4 fixed w-full drop-shadow-sm backdrop-blur-sm backdrop-brightness-[1.1] z-10">
      <a href="/">
        <img className="w-[150px]" src="/logos.png" />
      </a>
      <div>
        {user ? (
          <div className="flex justify-center items-center gap-2">
            <a href="/create-trip">
              <Button
                variant="outline"
                className=" h-[35px] w-[100px] rounded-full bg-transparent border-black hover:bg-red-700 hover:border-red-700 hover:text-white transition-all"
              >
                + Create Trip
              </Button>
            </a>

            <a href="/my-trips">
              <Button
                variant="outline"
                className="h-[35px] w-[80px] rounded-full bg-transparent border-black hover:bg-red-700 hover:border-red-700 hover:text-white transition"
              >
                My Trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
              <img
                  src={user?.picture}
                  className="lg:h-[37px] lg:w-[37px] sm:h-[30px] sm:[30px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="flex gap-2 cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  <IoIosLogOut className="h-[26px]" /> Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button
            variant="outline"
            className="rounded-full bg-transparent border-black hover:bg-black hover:border-black hover:text-white transition"
            onClick={() => setOpenDailog(true)}
          >
            Sign In
          </Button>
        )}
      </div>
      <Dialog open={openDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img className="w-[180px]" src="/logos.png" />
              <h2 className="font-bold text-lg mt-5">Sign In with Google</h2>
              <p>sign in to the website with google authentication.</p>
              <div>
                <Button onClick={login} className="mt-4 w-full">
                  Sign In with Google
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
