import React, { useEffect, useState } from "react";

const categories = ["All", "men's clothing", "jewelery", "electronics", "women's clothing"];

function FakeStore() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API fetch error:", err);
        setLoading(false);
      });
  }, []);

  const handleFilter = (category) => {
    setActiveCategory(category);
    if (category === "All") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((item) => item.category === category));
    }
  };

  if (loading) return <div className="text-center mt-10 text-xl">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">🛍️ Product Categories</h1>

      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded font-medium border ${
              activeCategory === cat
                ? "bg-yellow-500 text-white border-yellow-600"
                : "bg-white text-gray-800 border-gray-300 hover:bg-yellow-100"
            }`}
            onClick={() => handleFilter(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 w-full object-contain mb-4"
            />
            <h2 className="font-semibold text-sm mb-1">{product.title}</h2>
            <p className="text-gray-700 font-bold">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FakeStore;
