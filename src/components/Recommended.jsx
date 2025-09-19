import React, { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { SlidersHorizontal, Star, Tag, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import productsData from "../data/products"

const Spinner = () => (
  <div className="flex justify-center py-6">
    <div className="w-8 h-8 border-4 border-t-[#0d99ff] border-gray-200 rounded-full animate-spin"></div>
  </div>
)

const Recommended = () => {
  const ROWS_PER_LOAD = 3
  const navigate = useNavigate()
  const primary = "#0d99ff"

  const getColumnsFromViewport = () => {
    if (typeof window === "undefined") return 3
    if (window.matchMedia("(min-width: 1024px)").matches) return 3
    if (window.matchMedia("(min-width: 640px)").matches) return 3
    return 2
  }

  const [columns, setColumns] = useState(getColumnsFromViewport())
  const [visibleItems, setVisibleItems] = useState(() =>
    productsData.slice(0, getColumnsFromViewport() * ROWS_PER_LOAD)
  )
  const [quickViewProduct, setQuickViewProduct] = useState(null)

  useEffect(() => {
    const onChange = () => {
      const newCols = getColumnsFromViewport()
      setColumns(newCols)
      setVisibleItems((prev) => {
        if (prev.length >= newCols * ROWS_PER_LOAD) return prev
        return productsData.slice(0, newCols * ROWS_PER_LOAD)
      })
    }

    const mqSm = window.matchMedia("(min-width: 640px)")
    const mqLg = window.matchMedia("(min-width: 1024px)")
    const add = (mq) => (mq.addEventListener ? mq.addEventListener("change", onChange) : mq.addListener(onChange))
    const remove = (mq) => (mq.removeEventListener ? mq.removeEventListener("change", onChange) : mq.removeListener(onChange))
    add(mqSm)
    add(mqLg)
    onChange()

    return () => {
      remove(mqSm)
      remove(mqLg)
    }
  }, [])

  const itemsPerLoad = Math.max(1, columns * ROWS_PER_LOAD)

  const loadMore = () => {
    setTimeout(() => {
      const nextIndex = visibleItems.length
      const newItems = productsData.slice(nextIndex, nextIndex + itemsPerLoad)
      setVisibleItems((prev) => [...prev, ...newItems])
    }, 700)
  }

  const QuickViewModal = ({ product, onClose }) => {
    if (!product) return null
    const price = product.price ? Number(product.price).toFixed(2) : "00.00"
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full overflow-hidden relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
          >
            <X size={20} />
          </button>
          <div className="flex flex-col md:flex-row">
            <img
              src={`https://placehold.co/400x400/png?text=${encodeURIComponent(product.name)}`}
              alt={product.name}
              className="w-full md:w-1/2 h-64 md:h-auto object-cover"
            />
            <div className="p-6 flex flex-col justify-between w-full">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                <p className="text-[#0d99ff] font-bold mt-2 text-lg">${price}</p>
                <div className="flex items-center gap-2 mt-2 text-yellow-400 text-sm">
                  ⭐⭐⭐⭐☆
                  <span className="text-gray-500">(120)</span>
                </div>
                <p className="text-gray-600 mt-4 line-clamp-4">
                  {product.description ?? "No description available."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate(`/product/${product.id}`)}
                className="mt-6 bg-[#0d99ff] text-white py-2 text-sm font-medium hover:bg-blue-600 transition w-full flex items-center justify-center gap-2 rounded-lg"
              >
                <Tag size={16} />
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const filters = [
    { label: "Price: Low to High", type: "sort", key: "price", order: "asc" },
    { label: "Price: High to Low", type: "sort", key: "price", order: "desc" },
    { label: "Best Rated", type: "sort", key: "rating", order: "desc" },
    { label: "Newest Arrivals", type: "sort", key: "dateAdded", order: "desc" },
    { label: "On Sale", type: "filter", key: "onSale", value: true },
    { label: "Category: Electronics", type: "filter", key: "category", value: "Electronics" },
    { label: "Category: Fashion", type: "filter", key: "category", value: "Fashion" },
  ]

  return (
    <section className="px-6 py-12 bg-gray-50">
      <div className="flex items-center gap-2 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Recommended for You</h2>
        <Star className="text-[#0d99ff]" size={24} />
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="md:col-span-1 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-6 self-start">
          <div className="flex items-center gap-2 mb-6">
            <SlidersHorizontal className="text-[#0d99ff]" size={22} />
            <h3 className="text-xl font-semibold text-gray-800">Filters</h3>
          </div>

          <div className="mb-6">
            <h4 className="text-gray-600 font-medium mb-3">Sort By</h4>
            <ul className="space-y-2">
              {filters.filter(f => f.type === "sort").map(f => (
                <li
                  key={f.label}
                  className="cursor-pointer text-gray-700 hover:text-[#0d99ff] hover:font-medium transition px-3 py-2 rounded-lg hover:bg-gray-100"
                >
                  {f.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="text-gray-600 font-medium mb-3">Filter By</h4>
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {filters.filter(f => f.type === "filter").map(f => (
                <li
                  key={f.label}
                  className="flex items-center gap-2 text-gray-700 hover:text-[#0d99ff] transition px-3 py-2 rounded-lg hover:bg-gray-100"
                >
                  <input type="checkbox" className="w-4 h-4 text-[#0d99ff] border-gray-300 rounded focus:ring-[#0d99ff]" />
                  <span className="text-sm">{f.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <button className="mt-4 w-full bg-[#0d99ff] text-white py-2 rounded-lg hover:bg-blue-600 transition text-sm font-medium">
            Clear Filters
          </button>
        </aside>

        {/* Products Grid */}
        <div className="md:col-span-3">
          <InfiniteScroll
            dataLength={visibleItems.length}
            next={loadMore}
            hasMore={visibleItems.length < productsData.length}
            loader={<Spinner />}
            endMessage={<p className="text-center py-4 text-gray-400">No more products ✨</p>}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
              {visibleItems.map((product, index) => (
                <div
                  key={index}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group transition-all hover:shadow-lg cursor-pointer"
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    <img
                      src={`https://placehold.co/400x400/png?text=${encodeURIComponent(product.name ?? "Sample Product")}`}
                      alt={product.name ?? "Sample Product"}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setQuickViewProduct(product) }}
                      className="absolute bottom-3 right-3 bg-white/90 text-gray-700 px-3 py-1 text-xs rounded-lg shadow hover:bg-white transition hidden group-hover:block"
                    >
                      Quick View
                    </button>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h4 className="font-medium text-gray-900 text-sm md:text-base line-clamp-2">{product.name}</h4>
                    <p className="text-[#0d99ff] font-semibold mt-1 text-sm md:text-base">
                      ${product.price ? Number(product.price).toFixed(2) : "00.00"}
                    </p>
                  </div>
                  <button
                    className="bg-[#0d99ff] text-white py-2 text-sm font-medium hover:bg-blue-600 transition w-full flex items-center justify-center gap-2"
                    onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`) }}
                  >
                    <Tag size={16} />
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />}
    </section>
  )
}

export default Recommended
