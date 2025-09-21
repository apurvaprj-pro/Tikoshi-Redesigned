import { motion } from "framer-motion"
import { Trash2, ArrowRight } from "lucide-react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      name: "Tikoshi Wireless Earbuds",
      price: 79.99,
      image: "https://via.placeholder.com/100",
      quantity: 1,
    },
    {
      id: 2,
      name: "Tikoshi Smartwatch Pro",
      price: 149.99,
      image: "https://via.placeholder.com/100",
      quantity: 2,
    },
  ]

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-6 py-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-900 mb-6"
        >
          Your Cart
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow p-6 space-y-6"
          >
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4 last:border-none"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                  <div>
                    <h2 className="font-semibold text-gray-900">{item.name}</h2>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <button className="px-2 py-1 border rounded-l-lg">-</button>
                      <span className="px-3">{item.quantity}</span>
                      <button className="px-2 py-1 border rounded-r-lg">+</button>
                    </div>
                  </div>
                </div>
                <button className="text-red-500 hover:text-red-600">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </motion.div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow p-6 h-fit"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Shipping</span>
              <span>$5.00</span>
            </div>
            <div className="flex justify-between text-gray-900 font-semibold text-lg mb-6">
              <span>Total</span>
              <span>${(subtotal + 5).toFixed(2)}</span>
            </div>
            <button
              className="w-full flex items-center justify-center gap-2 bg-[#0d99ff] hover:bg-[#0b88e6] text-white font-semibold py-3 rounded-2xl shadow-md transition"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Cart
