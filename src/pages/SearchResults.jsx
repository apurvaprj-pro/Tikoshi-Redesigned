import { motion } from "framer-motion"
import { Search, Heart } from "lucide-react"

const SearchResults = () => {
  const products = [
    {
      id: 1,
      name: "Tikoshi Wireless Earbuds",
      price: 79.99,
      image: "https://via.placeholder.com/200",
    },
    {
      id: 2,
      name: "Tikoshi Smartwatch Pro",
      price: 149.99,
      image: "https://via.placeholder.com/200",
    },
    {
      id: 3,
      name: "Tikoshi Gaming Headset",
      price: 99.99,
      image: "https://via.placeholder.com/200",
    },
    {
      id: 4,
      name: "Tikoshi 4K Action Camera",
      price: 199.99,
      image: "https://via.placeholder.com/200",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center bg-white rounded-2xl shadow px-4 py-3 mb-8"
      >
        <Search className="text-gray-500 mr-2" size={20} />
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full outline-none text-gray-700"
        />
      </motion.div>

      {/* Results */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-gray-900 mb-6"
      >
        Search Results
      </motion.h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition cursor-pointer"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-xl"
              />
              <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100">
                <Heart size={18} className="text-[#0d99ff]" />
              </button>
            </div>
            <h2 className="font-semibold text-gray-900 mt-4">{product.name}</h2>
            <p className="text-[#0d99ff] font-bold text-lg">${product.price.toFixed(2)}</p>
            <button className="w-full mt-3 bg-[#0d99ff] hover:bg-[#0b88e6] text-white py-2 rounded-xl font-medium transition">
              Add to Cart
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default SearchResults
