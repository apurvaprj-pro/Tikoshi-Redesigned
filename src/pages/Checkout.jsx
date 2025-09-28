import { motion } from "framer-motion"
import { CreditCard, MapPin, ArrowRight } from "lucide-react"

const Checkout = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-gray-900 mb-6"
      >
        Checkout
      </motion.h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Shipping Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow p-6 space-y-6"
        >
          <div>
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <MapPin size={20} className="text-[#0d99ff]" /> Shipping Address
            </h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0d99ff] outline-none"
              />
              <input
                type="text"
                placeholder="Street Address"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0d99ff] outline-none"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0d99ff] outline-none"
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0d99ff] outline-none"
                />
              </div>
              <input
                type="text"
                placeholder="Country"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0d99ff] outline-none"
              />
            </form>
          </div>

          <div>
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <CreditCard size={20} className="text-[#0d99ff]" /> Payment Method
            </h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Card Number"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0d99ff] outline-none"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Expiry Date"
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0d99ff] outline-none"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0d99ff] outline-none"
                />
              </div>
            </form>
          </div>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow p-6 h-fit"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Subtotal</span>
            <span>$229.98</span>
          </div>
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Shipping</span>
            <span>$5.00</span>
          </div>
          <div className="flex justify-between text-gray-900 font-semibold text-lg mb-6">
            <span>Total</span>
            <span>$234.98</span>
          </div>
          <button
            className="w-full flex items-center justify-center gap-2 bg-[#0d99ff] hover:bg-[#0b88e6] text-white font-semibold py-3 rounded-2xl shadow-md transition"
          >
            Place Order <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default Checkout
