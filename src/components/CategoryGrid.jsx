import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

const categories = [
  { name: "Ethnic Wear", img: "https://via.placeholder.com/150" },
  { name: "Western Dresses", img: "https://via.placeholder.com/150" },
  { name: "Menswear", img: "https://via.placeholder.com/150" },
  { name: "Footwear", img: "https://via.placeholder.com/150" },
  { name: "Home Decor", img: "https://via.placeholder.com/150" },
  { name: "Beauty", img: "https://via.placeholder.com/150" },
  { name: "Accessories", img: "https://via.placeholder.com/150" },
]

const CategoryGrid = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
    })
  }, [])

  return (
    <div className="w-full py-6 bg-white">
      {/* Title */}
      <h2
        className="text-2xl md:text-3xl font-bold text-center mb-6 text-[#0d99ff]"
        data-aos="fade-up"
      >
        Shop by Category
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 max-w-6xl mx-auto px-4">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="flex flex-col items-center cursor-pointer group transform transition duration-300 hover:scale-105"
            data-aos="zoom-in"
            data-aos-delay={i * 100} // staggered effect
          >
            {/* Larger circle with thicker border */}
            <div className="relative w-32 h-32 rounded-full border-4 border-gray-300 bg-[#f9fcff] flex items-center justify-center overflow-hidden transition group-hover:border-[#0d99ff]">
              <img
                src={cat.img}
                alt={cat.name}
                className="w-20 h-20 object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* Label */}
            <p className="mt-3 text-sm font-medium text-gray-700 group-hover:text-[#0d99ff] transition-colors">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryGrid;
