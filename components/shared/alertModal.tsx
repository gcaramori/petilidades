import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

interface AlertModalProps {
  title: string
  message: string
  onClose: () => void
  isOpen: boolean
}

export default function AlertModal({
  title,
  message,
  onClose,
  isOpen,
}: AlertModalProps) {
  const closeModal = () => {
    onClose()
  }

  return (
    <div
      className={`fixed z-50 inset-0 overflow-y-auto ${
        isOpen ? '' : 'hidden'
      } ${inter.className}`}
    >
      <div className="flex items-center md:items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        ></span>

        <div
          className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div>
            <div className="mt-3 text-center sm:mt-5">
              <h3
                className="text-xl md:text-2xl leading-6 font-bold text-black mb-6"
                id="modal-headline"
              >
                {title}
              </h3>

              <div className="mt-2">
                <p className="text-sm md:text-md font-medium text-gray-500">
                  {message}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              onClick={closeModal}
              className="inline-flex justify-center w-full border border-transparent shadow-sm px-4 py-2 bg-black text-base font-bold text-white transition-all hover:bg-gray-200 hover:text-black focus:outline-none focus:ring-none active:outline-none active:ring-none sm:text-md"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
