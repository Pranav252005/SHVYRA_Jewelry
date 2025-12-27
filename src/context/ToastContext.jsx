import React, { createContext, useContext, useState, useCallback } from 'react'
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi'

const ToastContext = createContext()

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, 3000)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const showSuccess = useCallback((message) => addToast(message, 'success'), [addToast])
  const showError = useCallback((message) => addToast(message, 'error'), [addToast])
  const showInfo = useCallback((message) => addToast(message, 'info'), [addToast])

  return (
    <ToastContext.Provider value={{ showSuccess, showError, showInfo }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-24 right-4 z-[200] space-y-2">
        {toasts.map(toast => (
          <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

const Toast = ({ toast, onClose }) => {
  const icons = {
    success: <FiCheckCircle size={20} />,
    error: <FiAlertCircle size={20} />,
    info: <FiInfo size={20} />
  }

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  }

  return (
    <div className="animate-slide-in-right">
      <div className={`${colors[toast.type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-md`}>
        <div className="flex-shrink-0">
          {icons[toast.type]}
        </div>
        <p className="flex-1 text-sm font-medium">{toast.message}</p>
        <button
          onClick={onClose}
          className="flex-shrink-0 hover:bg-white/20 rounded-full p-1 transition-colors"
          aria-label="Close notification"
        >
          <FiX size={16} />
        </button>
      </div>
    </div>
  )
}

export default ToastContext
