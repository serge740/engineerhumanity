import { Phone, Mail, MapPin } from "lucide-react";

const ContactCards = () => {
  const contacts = [
    {
      icon: <Phone size={40} className="text-white" />,
      title: "Texas Office",
      info: "+1 (469) 967-0444",
      bgColor: "bg-[#0aa9d7]",
    },
    {
      icon: <Phone size={40} className="text-white" />,
      title: "Rwanda Office",
      info: "+250 788 307 186",
      bgColor: "bg-green-500",
    },
    {
      icon: <Mail size={40} className="text-white" />,
      title: "Email (Texas)",
      info: "contact@e4hinitiative.org",
      bgColor: "bg-purple-500",
    },
    {
      icon: <Mail size={40} className="text-white" />,
      title: "Email (Rwanda)",
      info: "engineersforhumanity20@gmail.com",
      bgColor: "bg-red-500",
    },
    {
      icon: <MapPin size={40} className="text-white" />,
      title: "Texas Address",
      info: "908 Audelia RD, Suite 200, Box 139, Richardson, TX 75081, USA",
      bgColor: "bg-sky-600",
    },
    {
      icon: <MapPin size={40} className="text-white" />,
      title: "Rwanda Address",
      info: "Diamond House, 2nd Floor, Kigali City, Kicukiro Center",
      bgColor: "bg-green-600",
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