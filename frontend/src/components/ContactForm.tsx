import React, { useRef } from 'react';
import { MapPin, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { toast, Toaster } from 'react-hot-toast';

const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    
    emailjs.sendForm(
      'service_kpwmm5i', 
      'b7jOaP947bfDLqXuV', 
      form.current, 
      'YOUR_PUBLIC_KEY'
    )
    .then(() => {
      toast.success('Message sent successfully!');
      form.current.reset();
    }, () => {
      toast.error('Failed to send message. Please try again.');
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      <div className="max-w-8xl p-4 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-xl sm:tracking-tight lg:text-4xl">
            Get in Touch
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-md text-gray-500">
            We'd love to hear from you. Send us a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Map Section */}
          <div className="relative h-full min-h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-20 rounded-3xl"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8 backdrop-blur-sm bg-white/30 rounded-2xl border border-white/20">
                <MapPin className="w-16 h-16 mx-auto text-white" />
                <h3 className="mt-4 text-2xl font-bold text-white">Kigali Rwanda</h3>
                <p className="mt-2 text-white/90">KN 78 St, Kigali-Rwanda</p>
              </div>
            </div>
            {/* Replace with your actual map embed */}
            <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15951.569763727984!2d30.06144818839922!3d-1.9447542648495376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca6e35c1e5c15%3A0xe5f2712541cb4c24!2sNorrsken%20House%20Kigali!5e0!3m2!1sen!2srw!4v1712399153274!5m2!1sen!2srw"
               className="w-full h-full border-0 rounded-3xl"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-10">
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <div className=" relative rounded-md shadow-sm">
                    <input
                      type="text"
                      name="first_name"
                      id="first-name"
                      required
                      className=" bg-neutral-100 focus:bg-neutral-200 block w-full text-sm px-2 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <input
                      type="text"
                      name="last_name"
                      id="last-name"
                      required
                    className=" bg-neutral-100 focus:bg-neutral-200 block w-full text-sm px-2 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className=" relative rounded-md shadow-sm">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                   
                    className=" bg-neutral-100 focus:bg-neutral-200 block w-full text-sm px-2 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <div className="">
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="block w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
    
                    defaultValue={''}
                  />
                </div>
              </div>

              <div className="">
                <button
                  type="submit"
                  className="group relative w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 bg-gradient-to-br from-sky-600 to-green-600  "
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <Send className="h-5 w-5 text-blue-200 group-hover:text-blue-100 transition-colors duration-300" />
                  </span>
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;