import { motion } from "framer-motion"
import { Package, Truck, CheckCircle, ArrowRight } from "lucide-react"

const MyOrders = () => {
  const orders = [
    {
      id: "TKS12345",
      date: "Sep 15, 2025",
      status: "Shipped",
      total: 229.98,
      items: 2,
    },
    {
      id: "TKS12344",
      date: "Sep 05, 2025",
      status: "Delivered",
      total: 79.99,
      items: 1,
    },
    {
      id: "TKS12343",
      date: "Aug 25, 2025",
      status: "Processing",
      total: 149.99,
      items: 1,
    },
  ]

  const getStatusIcon = (status) => {
    if (status === "Delivered") return <CheckCircle className="text-green-500" size={20} />
    if (status === "Shipped") return <Truck className="text-[#0d99ff]" size={20} />
    return <Package className="text-gray-500" size={20} />
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-gray-900 mb-6"
      >
        My Orders
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow p-6 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold text-gray-900">Order #{order.id}</h2>
              <p className="text-gray-600 text-sm">Placed on {order.date}</p>
              <p className="text-gray-700 mt-1">{order.items} item(s)</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end">
                {getStatusIcon(order.status)}
                <span
                  className={`font-medium ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "Shipped"
                      ? "text-[#0d99ff]"
                      : "text-gray-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-gray-900 font-semibold mt-1">${order.total.toFixed(2)}</p>
              <button className="flex items-center gap-1 text-[#0d99ff] font-medium mt-2 hover:underline">
                View Details <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default MyOrders
