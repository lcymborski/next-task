import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface ErrorInfoProps {
  isError?: boolean
}

const ErrorInfo = ({ isError }: ErrorInfoProps) => {
  useEffect(() => {
    if (isError) {
      toast.error('There was an error while loading data, please try again', {
        hideProgressBar: true,
        theme: 'light',
      })
    }
  }, [isError])

  return <ToastContainer />
}

export default ErrorInfo
