import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import "../../styles/Food/Food.css";

const Food = () => {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFoods = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {};

      if (search.trim()) {
        params.search = search;
      }

      if (category) {
        params.category = category;
      }

      if (location.trim()) {
        params.location = location;
      }

      const response = await API.get("/foods", {
        params,
      });

      setFoods(response.data.foods || []);
    } catch (error) {
      console.error(error);

      setError("Unable to load available food. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchFoods();
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setLocation("");

    setTimeout(() => {
      fetchFoods();
    }, 0);
  };

  return (
    <main className="food-page">
      {/* Page Header */}
      <section className="food-header">
        <div>
          <span className="food-label">AVAILABLE SURPLUS FOOD</span>

          <h1>Find Food Near You</h1>

          <p>
            Discover surplus food from local businesses and help prevent
            good food from going to waste.
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="food-search-section">
        <form className="food-search-form" onSubmit={handleSearch}>
          <div className="search-field">
            <label>Search Food</label>

            <input
              type="text"
              placeholder="e.g. Rice, Bread, Buns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="search-field">
            <label>Category</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Prepared Meals">Prepared Meals</option>
              <option value="Bakery">Bakery</option>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Dairy">Dairy</option>
              <option value="Packaged Food">Packaged Food</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="search-field">
            <label>Location</label>

            <input
              type="text"
              placeholder="e.g. Colombo"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <button type="submit" className="search-btn">
            Search
          </button>

          <button
            type="button"
            className="clear-btn"
            onClick={clearFilters}
          >
            Clear
          </button>
        </form>
      </section>

      {/* Food Listings */}
      <section className="food-list-section">
        <div className="food-list-heading">
          <div>
            <span>FOODSAVE MARKETPLACE</span>
            <h2>Available Food</h2>
          </div>

          <p>
            {foods.length} listing{foods.length !== 1 ? "s" : ""} available
          </p>
        </div>

        {loading && (
          <div className="food-message">
            <p>Loading available food...</p>
          </div>
        )}

        {!loading && error && (
          <div className="food-message error">
            <p>{error}</p>
            <button onClick={fetchFoods}>Try Again</button>
          </div>
        )}

        {!loading && !error && foods.length === 0 && (
          <div className="food-message">
            <div className="empty-icon">🍱</div>

            <h3>No food listings found</h3>

            <p>
              Try changing your search or filter options.
            </p>
          </div>
        )}

        {!loading && !error && foods.length > 0 && (
          <div className="food-grid">
            {foods.map((food) => (
              <article className="food-card" key={food._id}>
                <div className="food-card-image">
                  <span>🍱</span>

                  <span className="food-status">
                    Available
                  </span>
                </div>

                <div className="food-card-content">
                  <span className="food-category">
                    {food.category}
                  </span>

                  <h3>{food.foodName}</h3>

                  <p className="food-description">
                    {food.description}
                  </p>

                  <div className="food-info">
                    <div>
                      <span>Quantity</span>
                      <strong>
                        {food.quantity} {food.unit}
                      </strong>
                    </div>

                    <div>
                      <span>Location</span>
                      <strong>{food.location}</strong>
                    </div>
                  </div>

                  <div className="food-expiry">
                    Available until{" "}
                    {new Date(food.expiryDate).toLocaleString()}
                  </div>

                  <Link
                    to={`/food/${food._id}`}
                    className="view-food-btn"
                  >
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Food;