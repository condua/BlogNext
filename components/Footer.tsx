// components/Footer.tsx
import React from "react";
import {
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaTiktok,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import Image from "next/image";
import logo from "../public/logo.png";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 py-8" id="contact">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row justify-between items-center">
          <div className="sm:w-1/2 -mb-5 md:mb-0 flex flex-col items-center">
            <div className="my-2 md:block hidden w-24 h-18 relative">
              <Image
                src={logo}
                alt="Logo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <p className="text-sm text-gray-400 text-center sm:text-left">
              Copyright © {new Date().getFullYear()} All rights reserved
              <br /> Made by Phan Hoàng Phúc
            </p>
          </div>

          <div className="w-full border-1 border-solid md:hidden my-2" />

          <div className="flex flex-row justify-around gap-x-2 w-full items-center">
            <div className="my-2 md:hidden w-20 h-15 relative">
              <Image
                src={logo}
                alt="Logo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="flex flex-col text-xs md:text-lg gap-y-1.5">
              <p>Liên hệ</p>
              <p className="flex gap-1 items-center">
                <FaPhone color="red" />
                <a href="tel:0399915548" className="text-white hover:underline">
                  Số điện thoại: 0399915548
                </a>
              </p>
              <p className="flex gap-1 items-center">
                <FaEnvelope color="white" />
                <a
                  href="mailto:phanhoangphuc0311@gmail.com"
                  className="text-white hover:underline"
                >
                  <span className="md:inline hidden">Email: </span>{" "}
                  phanhoangphuc0311@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className="w-full border-1 border-solid md:hidden my-2" />

          <div className="flex text-xs md:text-lg space-x-2 md:space-x-6 md:mb-0 mb-4">
            <a
              href="https://web.facebook.com/profile.php?id=61574532009854"
              className="flex items-center gap-2 hover:text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={20} /> Facebook
            </a>
            <a
              href="https://www.youtube.com/@tonyphan34"
              className="flex items-center gap-2 hover:text-red-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube size={20} /> Youtube
            </a>
            <a
              href="https://www.linkedin.com/company/50290243"
              className="flex items-center gap-2 hover:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={20} /> LinkedIn
            </a>
            <a
              href="https://www.tiktok.com/@mlpaedutech"
              className="flex items-center gap-2 hover:text-gray-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok size={20} /> TikTok
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
