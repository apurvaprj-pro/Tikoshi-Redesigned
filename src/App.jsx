import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import { Route, Routes } from "react-router-dom"

// Pages
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import MyOrders from "./pages/MyOrders"
import OtpVerification from "./pages/OtpVerification"
import SearchResults from "./pages/SearchResults"
import ThankYou from "./pages/ThankYou"
import Wishlist from "./pages/Wishlist"

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    })
  }, [])

  return (
    <Routes>
      {/* Main */}
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />

      {/* E-commerce */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<MyOrders />} />
      <Route path="/verify-otp" element={<OtpVerification />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/wishlist" element={<Wishlist />} />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
