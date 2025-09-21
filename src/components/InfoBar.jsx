import { CreditCard, RefreshCcw, Tag, Truck } from "lucide-react"
import { motion } from "framer-motion"

const InfoBar = () => {
  const items = [
    { icon: <RefreshCcw className="w-5 h-5 text-[#0d99ff]" />, text: "7 Days Exchange Policy" },
    { icon: <CreditCard className="w-5 h-5 text-[#0d99ff]" />, text: "Cash on Delivery" },
    { icon: <Truck className="w-5 h-5 text-[#0d99ff]" />, text: "Free Shipping" },
    { icon: <Tag className="w-5 h-5 text-[#0d99ff]" />, text: "Best Prices" },
  ]

  return (
    <div className="w-full flex justify-center mt-4">
      <motion.div
        className="bg-[#f0f8ff] text-gray-800 border border-gray-300 rounded-lg w-full px-6 py-3 max-w-7xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-wrap justify-between gap-4">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-full cursor-default shadow-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
            >
              {item.icon}
              <span className="text-sm font-bold">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default InfoBar
