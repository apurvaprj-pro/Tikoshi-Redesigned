import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { title: "Personal Care", image: "https://placehold.in/300x300?text=Care" },
  { title: "Electronics", image: "https://placehold.in/300x300?text=Electronics" },
  { title: "Makeup", image: "https://placehold.in/300x300?text=Makeup" },
  { title: "Smart Phones", image: "https://placehold.in/300x300?text=Phones" },
  { title: "Men Perfume", image: "https://placehold.in/300x300?text=Perfume" },
];

// Variants for animation
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  }),
};

export default function BestDeal() {
  return (
    <section className="px-6 py-10 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
          Today's Best Deal
        </h2>
        <a
          href="#"
          className="text-sm font-medium text-[#0d99ff] flex items-center gap-1 hover:underline"
        >
          VIEW ALL <ArrowRight size={16} />
        </a>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            className="group rounded-2xl bg-white shadow-sm border-2 border-[#0d99ff] flex flex-col overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#0d99ff]/40"
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} // triggers when 20% of card is visible
          >
            {/* Image */}
            <div className="flex-grow flex items-center justify-center bg-gray-100 overflow-hidden">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* Title */}
            <div className="bg-[#0d99ff] text-white text-sm md:text-base font-medium text-center py-3">
              {cat.title}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
