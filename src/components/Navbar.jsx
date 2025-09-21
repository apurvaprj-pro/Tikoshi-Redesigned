import { useState } from "react"
import { ShoppingCart, User, Search, Menu, X } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {
  const [query, setQuery] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount] = useState(2)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${query}`)
      setQuery("")
    }
  }

  return (
    <nav className="sticky top-0 w-full bg-[#0d99ff] text-white border-b border-white/20 shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-2 md:px-4 py-3 md:py-4">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-extrabold tracking-tight cursor-pointer -ml-12"
        >
          Tikoshi
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center bg-white rounded-full overflow-hidden w-4/5 max-w-2xl shadow-sm border border-gray-200"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products, brands and more..."
            className="flex-grow px-4 py-2 text-gray-800 focus:outline-none text-sm"
          />
          <button
            type="submit"
            className="bg-[#0d99ff] px-4 py-2 flex items-center justify-center hover:bg-blue-600 transition cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>

        {/* Icons + Profile */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            className="hidden md:block bg-white text-[#0d99ff] px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition shadow-sm text-sm cursor-pointer"
            onClick={() => window.location.href = "https://seller.tikoshishop.in"}
          >
            Become a Supplier
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="p-2 hover:bg-white/20 rounded-full transition cursor-pointer"
            >
              <User className="w-6 h-6" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg border border-gray-300 overflow-hidden z-50">
                <div className="relative">
                  <div className="absolute -top-2 right-4 w-3 h-3 bg-white rotate-45 border-l border-t border-gray-300"></div>
                  <Link to="/orders" className="w-full block text-left px-4 py-2 text-sm hover:bg-gray-100 transition cursor-pointer">My Orders</Link>
                  <Link to="/wishlist" className="w-full block text-left px-4 py-2 text-sm hover:bg-gray-100 transition cursor-pointer">Wishlist</Link>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition cursor-pointer">Login</button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition cursor-pointer">Register</button>
                </div>
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="p-2 hover:bg-white/20 rounded-full transition relative cursor-pointer -mr-30">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 -translate-x-1/9 -translate-y-1/9 bg-red-500 text-white text-xs w-5 h-5 rounded-full shadow-sm flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 hover:bg-white/20 rounded-full transition cursor-pointer">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0d99ff] border-t border-white/20 px-4 pb-4 space-y-3">
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center bg-white rounded-full overflow-hidden w-full max-w-5xl h-14 shadow-md border border-gray-200"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products, brands and more..."
              className="flex-grow px-6 py-3 text-gray-800 focus:outline-none text-base"
            />
            <button
              type="submit"
              className="bg-[#0d99ff] px-6 py-3 flex items-center justify-center hover:bg-blue-600 transition cursor-pointer"
            >
              <Search className="w-6 h-6" />
            </button>
          </form>

          <Link to="/orders" className="w-full block text-white hover:underline text-sm cursor-pointer">My Orders</Link>
          <Link to="/wishlist" className="w-full block text-white hover:underline text-sm cursor-pointer">Wishlist</Link>
          <Link to="/cart" className="w-full block text-white hover:underline text-sm cursor-pointer">Cart</Link>
          <Link to="/checkout" className="w-full block text-white hover:underline text-sm cursor-pointer">Checkout</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
  