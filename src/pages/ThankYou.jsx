import { motion } from "framer-motion"
import { CheckCircle, ArrowRight } from "lucide-react"

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md text-center"
      >
        <CheckCircle size={64} className="text-[#0d99ff] mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Thank You!</h1>
        <p className="text-gray-600 mb-6">
          Your order has been placed successfully. You’ll receive a confirmation email soon.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button className="w-full flex items-center justify-center gap-2 bg-[#0d99ff] hover:bg-[#0b88e6] text-white font-semibold py-3 rounded-2xl shadow-md transition">
            Track My Order <ArrowRight size={18} />
          </button>
          <button className="w-full mt-3 flex items-center justify-center gap-2 border border-[#0d99ff] text-[#0d99ff] hover:bg-[#0d99ff] hover:text-white font-semibold py-3 rounded-2xl transition">
            Continue Shopping
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ThankYou
