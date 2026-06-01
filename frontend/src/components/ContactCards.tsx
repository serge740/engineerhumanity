import { Phone, Mail, MapPin } from "lucide-react";

const offices = [
  {
    name: "Texas Office",
    bgColor: "bg-[#0aa9d7]",
    phone: "+1 (469) 967-0444",
    email: "contact@engineers4humanity.org",
    address: "2012 ELM Place, Northlake, TX 76247",
  },
  {
    name: "Rwanda Office",
    bgColor: "bg-gradient-to-r from-green-600 to-green-700",
    phone: "+250 785 426 752",
    email: "kigalioffice@engineers4humanity.org",
    address: "Diamond House, 2nd Floor, Kigali City, Kicukiro Center",
  },
];

const ContactCards = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
    {offices.map((office) => (
      <div key={office.name} className="bg-gray-100 shadow-lg rounded-xl overflow-hidden">
        {/* Header */}
        <div className={`${office.bgColor} px-6 py-4`}>
          <h2 className="text-xl font-bold text-white">{office.name}</h2>
        </div>

        {/* Details */}
        <div className="p-6 flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <div className={`p-2.5 rounded-full flex-shrink-0 ${office.bgColor}`}>
              <Phone size={22} className="text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Phone</p>
              <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="text-gray-700 font-medium no-underline hover:text-sky-600 transition-colors">
                {office.phone}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className={`p-2.5 rounded-full flex-shrink-0 ${office.bgColor}`}>
              <Mail size={22} className="text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Email</p>
              <a href={`mailto:${office.email}`} className="text-gray-700 font-medium no-underline hover:text-sky-600 transition-colors break-all">
                {office.email}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className={`p-2.5 rounded-full flex-shrink-0 ${office.bgColor}`}>
              <MapPin size={22} className="text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Address</p>
              <p className="text-gray-700 font-medium">{office.address}</p>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default ContactCards;
