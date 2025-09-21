import { useEffect, useState, useRef, useCallback } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { getApi } from "../baseAPIService";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PLACEHOLDER = "https://via.placeholder.com/150?text=No+Image";
const PRIMARY = "#0d99ff";
const SKELETON_MIN_MS = 300;

// Category Tile
const CategoryTile = ({ cat, idx, onActivate, onHover, onLeave }) => {
  const [imgSrc, setImgSrc] = useState(cat.imageURL || PLACEHOLDER);

  const handleImgError = () => {
    if (imgSrc !== PLACEHOLDER) setImgSrc(PLACEHOLDER);
  };

  const accessibleLabel = cat.name || "Category";

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={accessibleLabel}
      onClick={() => onActivate(cat)}
      onMouseEnter={(e) => onHover(cat, e)}
      onMouseLeave={() => onLeave()}
      onFocus={(e) => onHover(cat, e)}
      onBlur={() => onLeave()}
      data-aos="zoom-in"
      data-aos-delay={idx * 50}
      className="flex flex-col items-center cursor-pointer flex-shrink-0 w-40 mx-2 outline-none"
    >
      <div className="relative w-32 h-32 rounded-full border-4 border-gray-300 bg-[#f9fcff] flex items-center justify-center overflow-hidden transition group-hover:border-[#0d99ff]">
        <img
          src={imgSrc}
          alt={cat.name || "category image"}
          onError={handleImgError}
          loading="lazy"
          style={{ width: 80, height: 80, objectFit: "contain" }}
          className="block"
        />
      </div>
      <span className="mt-2 text-center font-semibold text-sm">{cat.name}</span>
      {cat.description && (
        <span className="mt-1 text-center text-xs text-gray-500 line-clamp-2">
          {cat.description}
        </span>
      )}
    </div>
  );
};

// Skeleton
const SkeletonGrid = ({ count = 8 }) => {
  return (
    <div className="flex overflow-hidden space-x-4 px-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col items-center animate-pulse w-40">
          <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-gray-200" />
          <div className="h-4 mt-3 w-24 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
};

// Helper: build hierarchical map from raw rows
const buildHierarchy = (rows = []) => {
  const categoriesMap = new Map();

  rows.forEach((r) => {
    const catId = r.categoryID;
    if (!categoriesMap.has(catId)) {
      categoriesMap.set(catId, {
        id: catId,
        name: r.categoryName,
        imageURL: r.imageURL,
        level1: new Map(),
      });
    }
    const category = categoriesMap.get(catId);

    const l1Id = r.level1ID ?? r.level1Id ?? null;
    if (l1Id != null) {
      if (!category.level1.has(l1Id)) {
        category.level1.set(l1Id, {
          id: l1Id,
          name: r.categoryLevel1,
          level2: new Map(),
        });
      }

      const l2Id = r.level2ID ?? r.level2Id ?? null;
      if (l2Id != null) {
        const level1Obj = category.level1.get(l1Id);
        if (!level1Obj.level2.has(l2Id)) {
          level1Obj.level2.set(l2Id, {
            id: l2Id,
            name: r.categoryLevel2,
            level3: new Map(),
          });
        }

        const l3Id = r.level3ID ?? r.level3Id ?? null;
        if (l3Id != null) {
          const level2Obj = level1Obj.level2.get(l2Id);
          if (!level2Obj.level3.has(l3Id)) {
            level2Obj.level3.set(l3Id, {
              id: l3Id,
              name: r.categoryLevel3,
            });
          }
        }
      }
    }
  });

  const categories = Array.from(categoriesMap.values()).map((cat) => ({
    id: cat.id,
    name: cat.name,
    imageURL: cat.imageURL,
    level1: Array.from(cat.level1.values()).map((l1) => ({
      id: l1.id,
      name: l1.name,
      level2: Array.from(l1.level2.values()).map((l2) => ({
        id: l2.id,
        name: l2.name,
        level3: Array.from(l2.level3.values()),
      })),
    })),
  }));

  return categories;
};

// Main Component
const CategoryGrid = () => {
  const [categories, setCategories] = useState([]); // tiles
  const [hierarchy, setHierarchy] = useState([]); // dropdown data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);
  const scrollRef = useRef(null);
  const wrapperRef = useRef(null);
  const startTimeRef = useRef(0);

  // dropdown state
  const [hoveredCatId, setHoveredCatId] = useState(null);
  const [dropdownLeft, setDropdownLeft] = useState(0);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const hideTimeoutRef = useRef(null);

  const handleActivate = useCallback((cat) => {
    console.log("Category clicked:", cat.id, cat.name);
  }, []);

  // Scroll handler
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 300; // px per click
    if (direction === "left") {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Hover handlers
  const handleTileHover = (cat, e) => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    const containerRect = scrollRef.current?.getBoundingClientRect();
    const tileRect = e.currentTarget.getBoundingClientRect();
    const wrapperRect = wrapperRef.current?.getBoundingClientRect();

    // compute left relative to wrapper (so absolute positioning inside wrapper works)
    let left = 0;
    if (wrapperRect && tileRect) {
      left = tileRect.left - wrapperRect.left + tileRect.width / 2;
    } else if (containerRect && tileRect) {
      left = tileRect.left - containerRect.left + tileRect.width / 2;
    } else {
      left = tileRect.left + tileRect.width / 2;
    }

    setHoveredCatId(cat.id);
    setDropdownLeft(left);
    setDropdownVisible(true);
  };

  const handleTileLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setDropdownVisible(false);
      setHoveredCatId(null);
    }, 180);
  };

  const handleDropdownEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setDropdownVisible(true);
  };
  const handleDropdownLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setDropdownVisible(false);
      setHoveredCatId(null);
    }, 120);
  };

  const fetchCategories = useCallback(async () => {
    controllerRef.current = new AbortController();
    setLoading(true);
    setError(null);
    startTimeRef.current = Date.now();

    try {
      const response = await getApi("CategoryMenu/GetAllCategory", {
        signal: controllerRef.current.signal,
      });

      const data = response?.data?.data;
      if (!Array.isArray(data)) throw new Error("Invalid response shape");

      const normalized = data.map((it) => ({
        id: it.categoryID,
        name: it.categoryName,
        description: it.description ?? "",
        imageURL: it.imageURL ?? it.image ?? "",
      }));

      const uniqueCategories = Array.from(
        new Map(normalized.map((item) => [item.id, item])).values()
      );

      setCategories(uniqueCategories);
      setHierarchy(buildHierarchy(data));
    } catch (err) {
      if (err?.name === "AbortError") return;
      console.error("Error fetching categories:", err);
      setError("Failed to load categories");
    } finally {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, SKELETON_MIN_MS - elapsed);

      setTimeout(() => {
        setLoading(false);
      }, remaining);
    }
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-out-cubic", once: true });
    fetchCategories();
    return () => {
      controllerRef.current?.abort();
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [fetchCategories]);

  useEffect(() => {
    if (!loading && typeof AOS !== "undefined" && AOS.refresh) AOS.refresh();
  }, [loading, categories.length]);

  const hoveredHierarchy = hierarchy.find((h) => h.id === hoveredCatId) ?? null;

  return (
    <div className="w-full py-6 bg-white relative">
      <h2
        className="text-2xl md:text-3xl font-bold text-center mb-6 text-[#0d99ff]"
        data-aos="fade-up"
      >
        Shop by Category
      </h2>

      {loading && <SkeletonGrid count={10} />}
      {error && (
        <div className="text-center">
          <p className="text-red-500 mb-2">{error}</p>
          <button
            className="px-4 py-2 bg-[#0d99ff] text-white rounded"
            onClick={fetchCategories}
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && categories.length === 0 && (
        <p className="text-center text-gray-500">No categories found.</p>
      )}

      {!loading && !error && categories.length > 0 && (
        // wrapperRef is the positioned container for arrows & dropdown
        <div ref={wrapperRef} className="relative max-w-6xl mx-auto">
          {/* Left Arrow - absolute and outside the carousel area; hidden on small screens */}
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="hidden sm:flex items-center justify-center absolute -left-6 top-1/2 -translate-y-1/2 bg-[#0d99ff] text-white shadow-lg rounded-full p-2 hover:bg-[#0b88e5] transition z-20"
            style={{ width: 40, height: 40 }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Carousel area with padding so content doesn't touch arrows */}
          <div className="relative px-8">
            <div
              ref={scrollRef}
              className="flex overflow-x-auto no-scrollbar scroll-smooth px-2 py-2"
            >
              {categories.map((cat, i) => (
                <div key={cat.id}>
                  <CategoryTile
                    cat={cat}
                    idx={i}
                    onActivate={handleActivate}
                    onHover={handleTileHover}
                    onLeave={handleTileLeave}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="hidden sm:flex items-center justify-center absolute -right-6 top-1/2 -translate-y-1/2 bg-[#0d99ff] text-white shadow-lg rounded-full p-2 hover:bg-[#0b88e5] transition z-20"
            style={{ width: 40, height: 40 }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Centralized Dropdown — positioned relative to wrapper */}
          {dropdownVisible && hoveredHierarchy && (
            <div
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
              className="absolute top-full mt-2 z-50"
              style={{
                left: Math.max(8, dropdownLeft - 220), // clamp left a bit to avoid extreme edges
                minWidth: 300,
                maxWidth: 720,
              }}
            >
              <div className="bg-white rounded shadow-lg border border-gray-100 p-4 w-[440px]">
                <div className="flex items-start space-x-4">
                  {/* Left column: category info Archana*/}
                  {/* <div className="flex-shrink-0 w-20">
                    <img
                      src={hoveredHierarchy.imageURL || PLACEHOLDER}
                      alt={hoveredHierarchy.name}
                      className="w-16 h-16 object-contain"
                    />
                  </div> */}

                  {/* Right column: hierarchical lists --Archana */}
                  <div className="flex-1">
                    {/* <h3 className="text-sm font-semibold mb-2">
                      {hoveredHierarchy.name}
                    </h3> */}

                    <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                      {hoveredHierarchy.level1.length === 0 && (
                        <div className="text-xs text-gray-500">No subcategories</div>
                      )}

                      {hoveredHierarchy.level1.map((l1) => (
                        <div key={l1.id} className="">
                          <div className="text-sm font-medium">{l1.name}</div>
                          <div className="ml-3 mt-1 space-y-1">
                            {l1.level2.length === 0 && (
                              <div className="text-xs text-gray-500 ml-2">
                                No level 2
                              </div>
                            )}

                            {l1.level2.map((l2) => (
                              <div key={l2.id} className="ml-2">
                                <div className="text-xs font-semibold">{l2.name}</div>
                                <div className="ml-3 mt-1 flex flex-wrap gap-2">
                                  {l2.level3.length === 0 ? (
                                    <div className="text-xs text-gray-400">—</div>
                                  ) : (
                                    l2.level3.map((l3) => (
                                      <button
                                        key={l3.id}
                                        onClick={() =>
                                          console.log(
                                            "Clicked level3",
                                            hoveredHierarchy.id,
                                            l1.id,
                                            l2.id,
                                            l3.id
                                          )
                                        }
                                        className="text-xs px-2 py-1 rounded hover:bg-[#f0f9ff] transition"
                                        style={{ color: PRIMARY }}
                                      >
                                        {l3.name}
                                      </button>
                                    ))
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryGrid;
