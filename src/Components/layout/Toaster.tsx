'use client';

import { Toaster } from 'react-hot-toast';

export default function CustomToaster() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={12}
      containerClassName="mt-8"
      toastOptions={{
        duration: 4500,
        style: {
          background: '#0a0a0a',           
          color: '#f1f1f1',
          border: '1px solid rgba(234, 179, 8, 0.25)', 
          padding: '16px 24px',
          borderRadius: '14px',
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(16px)',
          fontSize: '15.5px',
          fontWeight: '500',
          letterSpacing: '0.4px',
          maxWidth: '380px',
        },

        success: {
          style: {
            borderColor: 'rgba(234, 179, 8, 0.45)',
            color: '#f1f1f1',
          },
          iconTheme: {
            primary: '#eab308', 
            secondary: '#0a0a0a',
          },
        },
        error: {
          style: {
            borderColor: 'rgba(185, 28, 28, 0.45)',
            color: '#f1f1f1',
          },
          iconTheme: {
            primary: '#b91c1c',
            secondary: '#0a0a0a',
          },
        },
        loading: {
          style: {
            borderColor: 'rgba(163, 163, 163, 0.3)',
          },
          iconTheme: {
            primary: '#a3a3a3',
            secondary: '#0a0a0a',
          },
        },
      }}
    />
  );
}