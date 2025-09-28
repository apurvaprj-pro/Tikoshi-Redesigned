import { motion } from "framer-motion"
import { ShieldCheck, ArrowRight } from "lucide-react"

const OtpVerification = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center"
      >
        <div className="flex justify-center mb-4">
          <ShieldCheck size={48} className="text-[#0d99ff]" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">OTP Verification</h1>
        <p className="text-gray-600 mb-6">
          We’ve sent a verification code to your email/phone. Enter it below to continue.
        </p>

        {/* OTP Input */}
        <div className="flex justify-center gap-3 mb-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <input
              key={i}
              type="text"
              maxLength="1"
              className="w-14 h-14 text-center text-xl font-semibold border rounded-xl focus:ring-2 focus:ring-[#0d99ff] outline-none"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button className="w-full flex items-center justify-center gap-2 bg-[#0d99ff] hover:bg-[#0b88e6] text-white font-semibold py-3 rounded-2xl shadow-md transition">
          Verify <ArrowRight size={18} />
        </button>

        {/* Resend */}
        <p className="text-gray-600 text-sm mt-6">
          Didn’t receive a code?{" "}
          <button className="text-[#0d99ff] font-medium hover:underline">Resend</button>
        </p>
      </motion.div>
    </div>
  )
}

export default OtpVerification
