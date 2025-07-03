import emailjs from '@emailjs/browser';

// Initialize EmailJS for contact forms
const initContactEmailJS = () => {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_CONTACT_EMAILJS_PUBLIC_KEY) {
    emailjs.init(process.env.NEXT_PUBLIC_CONTACT_EMAILJS_PUBLIC_KEY);
  }
};

export const sendQuoteNotification = async (formData: any) => {
  initContactEmailJS();
  
  if (!process.env.NEXT_PUBLIC_CONTACT_EMAILJS_SERVICE_ID || 
      !process.env.NEXT_PUBLIC_CONTACT_EMAILJS_QUOTE_ADMIN_TEMPLATE) {
    throw new Error('EmailJS configuration missing for contact forms');
  }

  return await emailjs.send(
    process.env.NEXT_PUBLIC_CONTACT_EMAILJS_SERVICE_ID,
    process.env.NEXT_PUBLIC_CONTACT_EMAILJS_QUOTE_ADMIN_TEMPLATE,
    {
      customer_name: formData.name,
      customer_email: formData.email,
      customer_company: formData.company || 'Not provided',
      customer_phone: formData.phone || 'Not provided',
      service_requested: formData.service,
      budget_range: formData.budget || 'Not specified',
      timeline: formData.timeline || 'Not specified',
      project_details: formData.message,
      submission_date: new Date().toLocaleDateString(),
      submission_time: new Date().toLocaleTimeString()
    }
  );
};

export const sendQuoteConfirmation = async (formData: any) => {
  initContactEmailJS();
  
  if (!process.env.NEXT_PUBLIC_CONTACT_EMAILJS_SERVICE_ID || 
      !process.env.NEXT_PUBLIC_CONTACT_EMAILJS_QUOTE_CUSTOMER_TEMPLATE) {
    throw new Error('EmailJS configuration missing for contact forms');
  }

  return await emailjs.send(
    process.env.NEXT_PUBLIC_CONTACT_EMAILJS_SERVICE_ID,
    process.env.NEXT_PUBLIC_CONTACT_EMAILJS_QUOTE_CUSTOMER_TEMPLATE,
    {
      to_name: formData.name,
      to_email: formData.email,
      service_requested: formData.service
    }
  );
};