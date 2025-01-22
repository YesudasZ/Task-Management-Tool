import React from 'react'

interface ErrorAlertProps {
  message: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => (
  <div className="rounded-md bg-red-50 p-4">
    <div className="text-sm text-red-700">{message}</div>
  </div>
)