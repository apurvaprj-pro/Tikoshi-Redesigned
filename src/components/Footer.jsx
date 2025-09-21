import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

const Footer = () => {
  const linkVariants = {
    hover: { scale: 1.1, color: "#0d99ff" } // blue hover
  }

  const iconVariants = {
    hover: { scale: 1.2, color: "#0d99ff" }
  }

  return (
    <footer className="bg-gray-100 text-gray-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & Description */}
        <div>
          <h1 className="text-2xl font-extrabold mb-3">Tikoshi</h1>
          <p className="text-gray-600 text-sm">
            Tikoshi is your one-stop online shop for electronics, fashion, and everything in between.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2">
            {["Home", "Shop", "About Us", "Contact"].map((item) => (
              <motion.li
                key={item}
                className="cursor-pointer text-gray-600 hover:text-blue-600 transition-colors"
                variants={linkVariants}
                whileHover="hover"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Customer Service</h2>
          <ul className="space-y-2">
            {["FAQ", "Returns", "Shipping Info", "Track Order"].map((item) => (
              <motion.li
                key={item}
                className="cursor-pointer text-gray-600 hover:text-blue-600 transition-colors"
                variants={linkVariants}
                whileHover="hover"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Newsletter & Social */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Social Media</h2>
          <p className="text-gray-600 text-sm mb-3">Subscribe to get the latest updates</p>
          <div className="flex gap-3">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                variants={iconVariants}
                whileHover="hover"
                className="text-gray-600 hover:text-blue-600"
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>
        </div>

      </div>

      <div className="border-t border-gray-300 text-center py-4 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Tikoshi. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
