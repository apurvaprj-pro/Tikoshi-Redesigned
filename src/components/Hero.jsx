import { motion } from "framer-motion";
import BannerImage from "/banner_image.png";

const Hero = () => {
  return (
    <section className="w-full bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-2 md:py-3 flex flex-col-reverse md:flex-row items-center justify-between gap-4 md:gap-6">
        
        {/* Left: Text */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-[1.2] text-center md:text-left"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Discover the Future of <span className="text-[#0d99ff]">Shopping</span>
          </h1>
          <p className="mt-2 text-base sm:text-lg md:text-xl text-gray-700 max-w-xl mx-auto md:mx-0">
            Tikoshi brings you the latest products, best deals, and a seamless shopping experience.
          </p>
          <div className="mt-3">
            <button className="bg-[#0d99ff] text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-blue-600 transition cursor-pointer">
              Shop Now
            </button>
          </div>
        </motion.div>

        {/* Right: Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-[1.5] flex justify-center md:justify-end w-full md:w-auto"
        >
          <img
            src={BannerImage}
            alt="Shopping"
            className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl h-auto object-cover"
          />
        </motion.div>

      </div>
    </section>
  )
}

export default Hero;
