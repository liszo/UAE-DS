'use client';

import { format } from 'date-fns';
import { FaArrowLeft, FaClock, FaGlobe } from 'react-icons/fa';
import { useState, useEffect } from 'react';

interface TimeSlotsProps {
  selectedDate: Date;
  selectedTime: string;
  onSelectTime: (time: string) => void;
  onBack: () => void;
}

export default function TimeSlots({ selectedDate, selectedTime, onSelectTime, onBack }: TimeSlotsProps) {
  const [userTimezone, setUserTimezone] = useState('');
  
  useEffect(() => {
    // Get user's timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserTimezone(timezone);
  }, []);

  // Define available time slots
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  // Simulate some slots being booked
  const bookedSlots = ['10:00', '14:30', '16:00'];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Back to calendar
      </button>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Select a time for {format(selectedDate, 'EEEE, MMMM d, yyyy')}
        </h2>
        <p className="text-gray-600 flex items-center">
          <FaGlobe className="mr-2" />
          Times shown in: <span className="font-medium ml-1">{userTimezone}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {timeSlots.map(time => {
          const isBooked = bookedSlots.includes(time);
          const isSelected = selectedTime === time;

          return (
            <button
              key={time}
              onClick={() => !isBooked && onSelectTime(time)}
              disabled={isBooked}
              className={`
                py-3 px-4 rounded-lg font-medium transition-all duration-200
                flex items-center justify-center
                ${isBooked
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : isSelected
                    ? 'bg-primary text-white'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }
              `}
            >
              <FaClock className="mr-2 text-sm" />
              {time}
            </button>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Duration:</strong> 30 minutes<br />
          <strong>Format:</strong> Video call (Google Meet link will be sent)<br />
          <strong>Timezone:</strong> {userTimezone}
        </p>
      </div>
    </div>
  );
}