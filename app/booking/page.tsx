'use client';

import { useState } from 'react';
import Calendar from '@/components/booking/Calendar';
import TimeSlots from '@/components/booking/TimeSlots';
import BookingForm from '@/components/booking/BookingForm';
import { FaCalendarAlt, FaClock, FaUser } from 'react-icons/fa';

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Book a Consultation</h1>
          <p className="text-xl text-gray-600">
            Schedule a free 30-minute consultation to discuss your project
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex justify-between items-center">
            <div className={`flex items-center ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-primary text-white' : 'bg-gray-200'
              }`}>
                <FaCalendarAlt />
              </div>
              <span className="ml-2 hidden sm:inline">Select Date</span>
            </div>
            
            <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`} />
            
            <div className={`flex items-center ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-primary text-white' : 'bg-gray-200'
              }`}>
                <FaClock />
              </div>
              <span className="ml-2 hidden sm:inline">Select Time</span>
            </div>
            
            <div className={`flex-1 h-1 mx-4 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`} />
            
            <div className={`flex items-center ${step >= 3 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 3 ? 'bg-primary text-white' : 'bg-gray-200'
              }`}>
                <FaUser />
              </div>
              <span className="ml-2 hidden sm:inline">Your Details</span>
            </div>
          </div>
        </div>

        {/* Booking Steps */}
        <div className="max-w-4xl mx-auto">
          {step === 1 && (
            <Calendar 
              selectedDate={selectedDate}
              onSelectDate={(date) => {
                setSelectedDate(date);
                setStep(2);
              }}
            />
          )}

          {step === 2 && selectedDate && (
            <TimeSlots
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSelectTime={(time) => {
                setSelectedTime(time);
                setStep(3);
              }}
              onBack={() => setStep(1)}
            />
          )}

          {step === 3 && selectedDate && selectedTime && (
            <BookingForm
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onBack={() => setStep(2)}
            />
          )}
        </div>
      </div>
    </div>
  );
}