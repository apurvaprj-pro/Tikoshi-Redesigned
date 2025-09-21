import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  // Define the boundaries of the invisible div
  const containerTop = 30; // % from top
  const containerBottom = 70; // % from top

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-white via-[#e6f3ff] to-white px-4 text-center">

      {/* Background Animated Shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#0d99ff]/10 rounded-full blur-3xl animate-spin-slow"></div>
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-[#0d99ff]/20 rounded-full blur-2xl animate-ping-slow"></div>
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#0d99ff]/15 rounded-full blur-3xl animate-spin-reverse"></div>

      {/* Invisible text container */}
      <div className="relative z-10 w-full max-w-lg mx-auto">
        {/* Main 404 Text */}
        <motion.h1
          className="text-8xl sm:text-9xl md:text-[12rem] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#0d99ff] to-[#00cfff]"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          404
        </motion.h1>

        {/* Playful Message */}
        <motion.p
          className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Oops! Your shopping cart went on an adventure without you.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            to="/"
            className="bg-[#0d99ff] text-white px-8 py-4 rounded-full font-bold shadow-2xl hover:bg-blue-600 transition transform hover:scale-110 hover:shadow-[0_0_30px_rgba(13,153,255,0.6)]"
          >
            Take Me Back Home
          </Link>
        </motion.div>
      </div>

      {/* Floating Circles Spawn Outside the Invisible Text Container */}
      {Array.from({ length: 12 }).map((_, i) => {
        const top =
          Math.random() * (100 - (containerBottom - containerTop)) +
          (containerBottom < 100 ? containerBottom : 0); // spawn outside bottom
        const left = Math.random() * 100;
        return (
          <div
            key={i}
            className="absolute bg-[#0d99ff]/40 w-2 h-2 rounded-full animate-float"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 5}s`,
            }}
          ></div>
        );
      })}

      {/* Keyframes for float animation */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-20px) translateX(10px); }
            100% { transform: translateY(0px) translateX(0px); }
          }
          .animate-float { animation: float 4s ease-in-out infinite; }
          .animate-spin-slow { animation: spin 20s linear infinite; }
          .animate-spin-reverse { animation: spin -25s linear infinite; }
          .animate-ping-slow { animation: ping 4s cubic-bezier(0,0,0.2,1) infinite; }
        `}
      </style>
    </div>
  );
};

export default NotFound;
