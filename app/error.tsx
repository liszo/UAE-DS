'use client';

import { useEffect } from 'react';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="text-center max-w-md">
        <FaExclamationTriangle className="text-6xl text-red-500 mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-8">
          We apologize for the inconvenience. An error occurred while loading this page.
        </p>
        <button
          onClick={() => reset()}
          className="btn-primary inline-flex items-center"
        >
          <FaRedo className="mr-2" />
          Try again
        </button>
      </div>
    </div>
  );
}