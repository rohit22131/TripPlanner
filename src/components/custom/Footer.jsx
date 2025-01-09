import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { TiSocialPinterest } from 'react-icons/ti';

const Footer = () => {
  return (
    // <div className='w-full mt-40 bg-gray-900 text-gray-300 p-2'>

    //   <div className='flex flex-col max-w-[1400px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-gray-500'>
    //     <p className='py-3'>Created by - Rohit Swami</p>
    //     <div className='flex justify-between sm:w-[300px] pt-4 text-2xl'>
    //       <FaFacebook />
    //       <FaInstagram />
    //       <FaTwitter />
    //       <TiSocialPinterest size={30} />
    //     </div>
    //   </div>
    // </div>


    
    <footer className="bg-gray-800 text-white py-3 mt-40">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          {/* Left section - Company Info */}
          <div className="text-center sm:text-left">
            <img className='w-[150px] mb-5' src="/logos.png" alt="" />
            <p className="text-sm">&copy; 2024 MyWebsite. All Rights Reserved.</p>
          </div>

          {/* Right section - Social Media Links */}
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
              <FaFacebook size={24} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FaTwitter size={24} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.printest.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
            <TiSocialPinterest size={30} />
            </a>
          </div>
        </div>

        {/* Footer Links (Optional) */}
        <div className="mt-2 text-center">
          <a href="/privacy-policy" className="text-sm text-gray-400 hover:text-white mr-6">Privacy Policy</a>
          <a href="/terms" className="text-sm text-gray-400 hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
