import React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactCards = () => {
  const contacts = [
    {
      icon: <Phone size={40} className="text-white" />,
      title: "Phone Number",
      info: "+(250) 791 166 097",
      bgColor: "bg-[#0aa9d7]",
    },
    {
      icon: <Mail size={40} className="text-white" />,
      title: "Email Address",
      info: "info@amisdelapaix.com",
      bgColor: "bg-green-500",
    },
    {
      icon: <MapPin size={40} className="text-white" />,
      title: "Location",
      info:"KN 78 st,  Kigali-Rwanda",
      bgColor: "bg-red-500",
    },
    {
      icon: <Clock size={40} className="text-white" />,
      title: "Working Hours",
      info: (
        <>
          <span className="block">Mon – Sat: 9AM – 6PM</span>
       
        </>
      ),
      bgColor: "bg-purple-500",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 p-6">
      {contacts.map((contact, index) => (
        <div
          key={index}
          className="flex items-center w-full sm:w-[48%] lg:w-[23%] p-4 bg-gray-100 shadow-lg rounded-xl"
        >
          <div className={`p-3 rounded-full ${contact.bgColor}`}>
            {contact.icon}
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-semibold">{contact.title}</h2>
            <p className="text-gray-600">{contact.info}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactCards;