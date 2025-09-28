import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Trash2 } from "lucide-react"
import Navbar from "../components/Navbar"

const wishlistSeed = [
  {
    id: 1,
    title: "Wireless Headphones",
    description: "Noise-cancelling over-ear headphones with crystal-clear sound.",
    price: "$199",
    image: "https://placehold.co/640x480/png?text=Headphones",
  },
  {
    id: 2,
    title: "Smartwatch Pro",
    description: "Track fitness, health, and stay connected on the go.",
    price: "$249",
    image: "https://placehold.co/640x480/png?text=Smartwatch",
  },
  {
    id: 3,
    title: "Mechanical Keyboard",
    description: "Tactile switches with customizable RGB lighting.",
    price: "$129",
    image: "https://placehold.co/640x480/png?text=Keyboard",
  },
  {
    id: 4,
    title: "Portable Speaker",
    description: "Rich sound in a compact, waterproof design.",
    price: "$89",
    image: "https://placehold.co/640x480/png?text=Speaker",
  },
]

const Wishlist = () => {
  const [items, setItems] = useState(wishlistSeed)
  const [favorites, setFavorites] = useState(new Set())
  const [query, setQuery] = useState("")

  const primary = "#0d99ff"

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const removeItem = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id))
  }

  const filtered = items.filter((it) => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      it.title.toLowerCase().includes(q) || it.description.toLowerCase().includes(q)
    )
  })

  return (
    <>
      <Navbar />
      <div className="p-6 md:p-10 max-w-6xl mx-auto">
        <style>{`:root { --primary: ${primary}; }`}</style>

        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-extrabold leading-tight" style={{ color: "var(--primary)" }}>
            My Wishlist
          </h1>
          <div className="relative w-full sm:w-72">
            <input
              id="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search wishlist..."
              className="w-full border border-gray-300 rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
          </div>
        </header>

        <main>
          <AnimatePresence>
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="rounded-2xl border border-dashed border-gray-200 p-8 text-center"
              >
                <p className="text-gray-600">No items found.</p>
              </motion.div>
            ) : (
              <motion.ul
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((item) => (
                  <motion.li
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                  >
                    <motion.div
                      whileHover={{ y: -6, boxShadow: "0 12px 24px rgba(0,0,0,0.12)" }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="rounded-2xl bg-white shadow-md overflow-hidden border"
                      style={{ borderColor: "rgba(13,153,255,0.06)" }}
                    >
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-44 object-cover"
                          draggable={false}
                        />
                        <div className="absolute right-3 top-3 flex gap-2">
                          <button
                            onClick={() => toggleFavorite(item.id)}
                            aria-pressed={favorites.has(item.id)}
                            className="p-2 rounded-full bg-white shadow hover:scale-110 transition"
                          >
                            <Heart
                              className="w-4 h-4"
                              style={{ color: favorites.has(item.id) ? "var(--primary)" : "#555" }}
                            />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            aria-label={`Remove ${item.title}`}
                            className="p-2 rounded-full bg-white shadow hover:scale-110 transition"
                          >
                            <Trash2 className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="text-lg font-semibold" style={{ color: "#0b7fe0" }}>{item.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-lg font-bold" style={{ color: "var(--primary)" }}>{item.price}</span>
                          <button className="px-4 py-2 rounded-lg border border-[var(--primary)] text-[var(--primary)] text-sm font-medium transition hover:bg-[var(--primary)] hover:text-white">
                            Move to Cart
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </main>
      </div>
    </>
  )
}

export default Wishlist
