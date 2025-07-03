'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { FaArrowLeft, FaCalendarCheck, FaSpinner } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);

interface BookingFormProps {
  selectedDate: Date;
  selectedTime: string;
  onBack: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

export default function BookingForm({ selectedDate, selectedTime, onBack }: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Prepare booking data
      const bookingData = {
        ...data,
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: selectedTime,
        timestamp: new Date().toISOString()
      };

      // Send to WordPress using custom endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/custom/v1/create-booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      });

      if (response.ok) {
        // Send confirmation email to customer
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          {
            to_name: data.name,
            to_email: data.email,
            booking_date: format(selectedDate, 'EEEE, MMMM d, yyyy'),
            booking_time: selectedTime,
            service: data.service,
            message: data.message || 'No additional message'
          }
        );

        // Send notification email to admin
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID!,
          {
            customer_name: data.name,
            customer_email: data.email,
            customer_phone: data.phone || 'Not provided',
            customer_company: data.company || 'Not provided',
            booking_date: format(selectedDate, 'EEEE, MMMM d, yyyy'),
            booking_time: selectedTime,
            service: data.service,
            message: data.message || 'No additional message'
          }
        );

        setIsSuccess(true);
      } else {
        throw new Error('Booking failed');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('There was an error submitting your booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rest of the component remains the same...
  if (isSuccess) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <FaCalendarCheck className="text-6xl text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-4">
            Your consultation has been scheduled for:
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="font-semibold">
              {format(selectedDate, 'EEEE, MMMM d, yyyy')} at {selectedTime}
            </p>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            You'll receive a confirmation email with the meeting link shortly.
          </p>
          <p className="text-sm text-gray-500">
            Please check your spam folder if you don't receive the email within 5 minutes.
          </p>
        </div>
        <a href="/" className="btn-primary">
          Back to Home
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Back to time selection
      </button>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Complete Your Booking</h2>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm">
            <strong>Date:</strong> {format(selectedDate, 'EEEE, MMMM d, yyyy')}<br />
            <strong>Time:</strong> {selectedTime} (30 minutes)
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              {...register('name', { required: 'Name is required' })}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              {...register('phone')}
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-2">
              Company Name
            </label>
            <input
              type="text"
              id="company"
              {...register('company')}
            />
          </div>
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-medium mb-2">
            Service Interested In *
          </label>
          <select
            id="service"
            {...register('service', { required: 'Please select a service' })}
            className={errors.service ? 'border-red-500' : ''}
          >
            <option value="">Select a service</option>
            <option value="web-design">Website Design & Development</option>
            <option value="ai-automation">AI Automation</option>
            <option value="digital-marketing">Digital Marketing</option>
            <option value="seo">SEO Services</option>
            <option value="ecommerce">E-commerce Solutions</option>
            <option value="other">Other</option>
          </select>
          {errors.service && (
            <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Tell us about your project
          </label>
          <textarea
            id="message"
            rows={4}
            {...register('message')}
            placeholder="Brief description of what you're looking to achieve..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Booking...
            </>
          ) : (
            'Confirm Booking'
          )}
        </button>
      </form>
    </div>
  );
}