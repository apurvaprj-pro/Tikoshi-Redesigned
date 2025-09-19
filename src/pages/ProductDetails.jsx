import React, { useMemo, useState, useRef } from "react";
import { ShoppingCart, Zap } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import productsData from "../data/products";
import Navbar from "../components/Navbar";

const ProductDetails = () => {
  const { id } = useParams();
  const product = productsData.find((p) => String(p.id) === id);

  const [zoomVisible, setZoomVisible] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({ x: 50, y: 50 });
  const [selectedImage, setSelectedImage] = useState(0);
  const imgRef = useRef(null);

  if (!product) {
    return <p className="text-center py-10 text-gray-500">Product not found.</p>;
  }

  const images = [
    `https://placehold.co/600x600/png?text=${encodeURIComponent(product.name)}+1`,
    `https://placehold.co/600x600/png?text=${encodeURIComponent(product.name)}+2`,
    `https://placehold.co/600x600/png?text=${encodeURIComponent(product.name)}+3`,
  ];

  const price = useMemo(() => {
    const n = Number(product.price ?? 0);
    return n > 0 ? n.toFixed(2) : "00.00";
  }, [product.price]);

  const recommendedProducts = useMemo(() => {
    const basePrice = Number(product.price) || 1;
    return productsData
      .filter((p) => p.id !== product.id)
      .map((p) => {
        let score = 0;
        if (p.category === product.category) score += 5;
        const priceDiff = Math.abs(Number(p.price) - Number(product.price)) / basePrice;
        if (priceDiff <= 0.2) score += 3;
        return { ...p, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);
  }, [product]);

  const StarSVG = ({ filled = false, half = false, size = 16, index }) => {
    const path =
      "M12 .587l3.668 7.431 8.082 1.175-5.85 5.703 1.382 8.06L12 18.897 4.718 23.0l1.382-8.06L.25 9.237l8.082-1.175L12 .587z";
    const gradientId = `halfGrad-${index}`;
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        {filled ? (
          <path d={path} fill="#0d99ff" stroke="#0d99ff" />
        ) : half ? (
          <>
            <defs>
              <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
                <stop offset="50%" stopColor="#0d99ff" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path d={path} fill={`url(#${gradientId})`} stroke="#0d99ff" />
            <path d={path} fill="none" stroke="#d1d5db" />
          </>
        ) : (
          <path d={path} fill="none" stroke="#d1d5db" />
        )}
      </svg>
    );
  };

  const renderStars = (rating = 0) => {
    const rounded = Math.round(rating * 2) / 2;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rounded)) {
        stars.push(<StarSVG key={i} index={i} filled />);
      } else if (i === Math.ceil(rounded) && rounded % 1 === 0.5) {
        stars.push(<StarSVG key={i} index={i} half />);
      } else {
        stars.push(<StarSVG key={i} index={i} />);
      }
    }
    return <div className="flex items-center gap-1">{stars}</div>;
  };

  const staticRating = 4.5;

  const handleMouseMove = (e) => {
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const xPercent = ((e.clientX - left) / width) * 100;
    const yPercent = ((e.clientY - top) / height) * 100;
    setZoomStyle({ x: xPercent, y: yPercent });
  };

  return (
    <>
      <Navbar />
      <section className="px-8 py-12 bg-gray-50 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-2xl shadow-2xl p-6 lg:p-12 relative overflow-visible">
          {/* ---------- LEFT SIDE ---------- */}
          <div className="flex gap-6 relative">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3 z-10">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`border-2 rounded-lg overflow-hidden w-20 h-20 transition-transform hover:scale-105 ${
                    selectedImage === i ? "border-[#0d99ff]" : "border-gray-200"
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div
              className="relative flex justify-center items-center w-full max-w-xl z-10"
              onMouseEnter={() => setZoomVisible(true)}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setZoomVisible(false)}
            >
              <img
                ref={imgRef}
                src={images[selectedImage]}
                alt={product.name}
                className="rounded-xl shadow-lg w-full h-[450px] object-cover"
              />
            </div>
          </div>

          {/* ---------- RIGHT SIDE ---------- */}
          <div className="relative flex flex-col justify-between min-h-[450px] z-0">
            {zoomVisible ? (
              // 🔍 Show Zoom Full Column
              <div
                className="w-full h-full rounded-xl border-2 border-gray-200 shadow-lg"
                style={{
                  backgroundImage: `url(${images[selectedImage].replace("600x600", "1600x1600")})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "200%",
                  backgroundPosition: `${zoomStyle.x}% ${zoomStyle.y}%`,
                }}
              />
            ) : (
              // 📦 Show Product Info
              <div className="relative z-10 bg-white/90 backdrop-blur-md rounded-xl p-6 shadow-lg">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>

                <div className="flex items-center gap-2 mb-4">
                  {renderStars(staticRating)}
                  <span className="text-gray-500 text-sm ml-2">(120 reviews)</span>
                </div>

                <p className="text-4xl font-bold text-[#0d99ff] mb-6">${price}</p>

                <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                  {product.description ?? "No description available for this product."}
                </p>

                <div className="flex gap-4">
                  <button className="flex-1 bg-[#0d99ff] text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-600 transition flex items-center justify-center gap-2 shadow-md">
                    <ShoppingCart size={20} /> ADD TO CART
                  </button>
                  <button className="flex-1 bg-[#0d99ff] text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-600 transition flex items-center justify-center gap-2 shadow-md">
                    <Zap size={20} /> BUY NOW
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ---------- RECOMMENDED PRODUCTS ---------- */}
        <div className="mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">You may also like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {recommendedProducts.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition transform hover:scale-105 cursor-pointer"
                aria-label={`View ${p.name}`}
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={`https://placehold.co/400x400/png?text=${encodeURIComponent(p.name)}`}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="px-4 py-4">
                  <h4 className="text-gray-800 font-medium text-base line-clamp-2">{p.name}</h4>
                  <div className="flex items-center gap-1 mt-1">{renderStars(staticRating)}</div>
                  <p className="text-[#0d99ff] font-semibold mt-1 text-base">
                    ${p.price ? Number(p.price).toFixed(2) : "00.00"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
