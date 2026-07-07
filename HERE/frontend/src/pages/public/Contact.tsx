import React from "react";

import ContactCards from "../../components/ContactCards";
import ContactForm from "../../components/ContactForm";
import { useEffect } from "react";
import { TeamHero } from "./team/TeamHero";
function Contact() {
      useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <div>
      <TeamHero 
        title="Contact Us" 
        linkTitle="Contact" 
        linkHref="/contact" 

      />
      <ContactCards />
      <ContactForm />
    </div>
  );
}

export default Contact;