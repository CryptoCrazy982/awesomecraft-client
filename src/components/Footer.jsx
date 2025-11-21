import React, { useContext } from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiKeyReturnLight } from "react-icons/pi";
import { BsWallet2 } from "react-icons/bs";
import { LiaGiftSolid } from "react-icons/lia";
import { BiSupport } from "react-icons/bi";
import { Link } from "react-router-dom";
import { IoChatboxOutline, IoCloseSharp } from "react-icons/io5";

import FormControlLabel from "@mui/material/FormControlLabel";




import Button from "@mui/material/Button";
import { Checkbox } from "@mui/material";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaPinterestP } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";


const Footer = () => {
  
  return (
    <>
  <footer className="py-6 bg-[#fafafa] px-4 lg:px-8">
    <div className="container">
      {/* TOP ICON ROW */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 py-6">
        <div className="flex flex-col items-center text-center group">
          <LiaShippingFastSolid className="text-[40px] group-hover:text-primary transition-all duration-300" />
          <h3 className="text-[16px] font-[600] mt-3">Fast Delivery</h3>
          <p className="text-[12px] font-[500]">Get Assured Fast Delivery</p>
        </div>

        <div className="flex flex-col items-center text-center group">
          <PiKeyReturnLight className="text-[40px] group-hover:text-primary transition-all duration-300" />
          <h3 className="text-[16px] font-[600] mt-3">30 Days Returns</h3>
          <p className="text-[12px] font-[500]">For an Exchange Product</p>
        </div>

        <div className="flex flex-col items-center text-center group">
          <BsWallet2 className="text-[40px] group-hover:text-primary transition-all duration-300" />
          <h3 className="text-[16px] font-[600] mt-3">Secured Payment</h3>
          <p className="text-[12px] font-[500]">Payment Cards Accepted</p>
        </div>

        <div className="flex flex-col items-center text-center group">
          <LiaGiftSolid className="text-[40px] group-hover:text-primary transition-all duration-300" />
          <h3 className="text-[16px] font-[600] mt-3">Special Gifts</h3>
          <p className="text-[12px] font-[500]">Our First Product Order</p>
        </div>

        <div className="flex flex-col items-center text-center group">
          <BiSupport className="text-[40px] group-hover:text-primary transition-all duration-300" />
          <h3 className="text-[16px] font-[600] mt-3">Support 24/7</h3>
          <p className="text-[12px] font-[500]">Contact us Anytime</p>
        </div>
      </div>

      {/* MAIN FOOTER ROW */}
      <div className="flex flex-col lg:flex-row gap-10 py-8">

        {/* LEFT COLUMN */}
        <div className="w-full lg:w-[25%] lg:border-r border-gray-200 pr-0 lg:pr-6">
          <h2 className="text-[22px] font-[600] mb-4">Awesome Crafts</h2>
          <p className="text-[13px] mb-4">
            Awesome Craft provides all types of templates <br />
            507-Union Trade Centre France
          </p>

          <Link className="text-[13px]" to="mailto:sales@awesomecrafts.com">
            sales@awesomecrafts.com
          </Link>

          <span className="text-[22px] block mt-3 mb-5 text-primary font-[600]">
            (+91) 9711-99-0257
          </span>

          <div className="flex items-center gap-2">
            <IoChatboxOutline className="text-[40px] text-primary" />
            <span className="text-[16px] font-[600] leading-5">
              Online Chat <br /> Get Expert Help
            </span>
          </div>
        </div>

        {/* MIDDLE COLUMNS */}
        <div className="w-full lg:w-[40%] flex gap-8">
          <div className="w-1/2">
            <h2 className="text-[18px] font-[600] mb-4">Trending Templates</h2>
            <ul>
              {[
                ["Wedding Templates", "/collections/Wedding-invites"],
                ["Baby & Kids", "/collections/Baby-and-Kids-invitations"],
                ["Party & Invite", "/collections/party-&-festival-invites"],
                ["Puja Invites", "/collections/party-&-festival-invites"],
                ["Corporate", "/collections/corporate-invites"],
                ["Anniversary", "/collections/anniversary"],
              ].map(([title, link]) => (
                <li key={title} className="mb-2 text-[14px]">
                  <Link to={link}>{title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-1/2">
            <h2 className="text-[18px] font-[600] mb-4">Our Company</h2>
            <ul>
              {[
                "Delivery",
                "Legal Notice",
                "Terms and conditions of use",
                "About us",
                "Secure payment",
                "Login",
              ].map((title) => (
                <li key={title} className="mb-2 text-[14px]">
                  <Link to="/">{title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full lg:w-[35%] pr-0 lg:pr-6">
          <h2 className="text-[18px] font-[600] mb-3">Subscribe to newsletter</h2>
          <p className="text-[13px]">
            Subscribe to our latest newsletter to get news about special discounts.
          </p>

          <form className="mt-5">
            <input
              type="text"
              className="w-full h-[45px] border rounded-sm pl-4 pr-4 mb-4 focus:border-gray-400"
              placeholder="Your Email Address"
            />
            <Button className="btn-org w-full">SUBSCRIBE</Button>

            <FormControlLabel
              className="mt-3 block"
              control={<Checkbox />}
              label=" I agree to the terms and conditions and the privacy policy"
            />
          </form>
        </div>
      </div>
    </div>
  </footer>

  {/* BOTTOM STRIP */}
  <div className="border-t border-gray-200 bg-white px-4 lg:px-8 py-5">
    <div className="container flex flex-col lg:flex-row items-center justify-between gap-5">
      <ul className="flex items-center gap-3">
        {[FaFacebookF, AiOutlineYoutube, FaPinterestP, FaInstagram].map(
          (Icon, i) => (
            <li key={i}>
              <Link
                to="/"
                className="w-[35px] h-[35px] rounded-full border border-gray-300 flex items-center justify-center group hover:bg-primary transition-all"
              >
                <Icon className="text-[18px]" />
              </Link>
            </li>
          )
        )}
      </ul>

      <p className="text-[13px] text-center">© 2025 - Awesome Crafts</p>

      <div className="flex items-center gap-2">
        <img src="/carte_bleue.png" alt="img" />
        <img src="/visa.png" alt="img" />
        <img src="/master_card.png" alt="img" />
        <img src="/american_express.png" alt="img" />
        <img src="/paypal.png" alt="img" />
      </div>
    </div>
  </div>
</>

  );
};

export default Footer;
