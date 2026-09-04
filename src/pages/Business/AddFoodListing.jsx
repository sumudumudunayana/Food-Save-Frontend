import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import "../../styles/Business/AddFoodListing.css";

const AddFoodListing = () => {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("foodSaveUser");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const businessName = user?.name?.trim() || "";

  const [formData, setFormData] = useState({
    businessName,
    foodName: "",
    category: "",
    description: "",
    quantity: "",
    unit: "",
    location: "",
    expiryDate: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const validateForm = () => {
    if (!businessName || !user?._id) {
      return "Please log in with a business account before adding food.";
    }

    if (!formData.foodName.trim()) {
      return "Please enter the food name.";
    }

    if (!formData.category) {
      return "Please select a food category.";
    }

    if (!formData.description.trim()) {
      return "Please provide a description.";
    }

    if (!formData.quantity || Number(formData.quantity) < 1) {
      return "Quantity must be at least 1.";
    }

    if (!formData.unit) {
      return "Please select a unit.";
    }

    if (!formData.location.trim()) {
      return "Please enter the location.";
    }

    if (!formData.expiryDate) {
      return "Please select an expiry date.";
    }

    const selectedDate = new Date(formData.expiryDate);

    if (selectedDate <= new Date()) {
      return "Expiry date must be in the future.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const data = {
        businessId: user._id,
        businessName,
        foodName: formData.foodName.trim(),
        category: formData.category,
        description: formData.description.trim(),
        quantity: Number(formData.quantity),
        unit: formData.unit,
        location: formData.location.trim(),
        expiryDate: formData.expiryDate,
      };

      await API.post("/foods", data);

      setSuccess("Food listing added successfully!");

      setFormData({
        businessName,
        foodName: "",
        category: "",
        description: "",
        quantity: "",
        unit: "",
        location: "",
        expiryDate: "",
      });

      setTimeout(() => {
        navigate("/food");
      }, 1200);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to add the food listing. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="add-food-page">
      <section className="add-food-container">

        <div className="add-food-header">
          <span>FOODSAVE BUSINESS</span>

          <h1>Add Food Listing</h1>

          <p>
            List your surplus food and help prevent good food from going to
            waste.
          </p>
        </div>

        <form className="add-food-form" onSubmit={handleSubmit}>

          {error && (
            <div className="form-message error-message">
              {error}
            </div>
          )}

          {success && (
            <div className="form-message success-message">
              {success}
            </div>
          )}

          {/* Business Name */}
          <div className="form-group">
            <label htmlFor="businessName">
              Business Name
            </label>

            <input
              id="businessName"
              name="businessName"
              type="text"
              placeholder="e.g. Fresh Bite Bakery"
              value={formData.businessName}
              readOnly
            />
          </div>

          {/* Food Name */}
          <div className="form-group">
            <label htmlFor="foodName">
              Food Name
            </label>

            <input
              id="foodName"
              name="foodName"
              type="text"
              placeholder="e.g. Vegetable Buns"
              value={formData.foodName}
              onChange={handleChange}
            />
          </div>

          {/* Category + Unit */}
          <div className="form-row">

            <div className="form-group">
              <label htmlFor="category">
                Category
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">
                  Select category
                </option>

                <option value="Prepared Meals">
                  Prepared Meals
                </option>

                <option value="Bakery">
                  Bakery
                </option>

                <option value="Fruits">
                  Fruits
                </option>

                <option value="Vegetables">
                  Vegetables
                </option>

                <option value="Dairy">
                  Dairy
                </option>

                <option value="Packaged Food">
                  Packaged Food
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="unit">
                Unit
              </label>

              <select
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
              >
                <option value="">
                  Select unit
                </option>

                <option value="portions">
                  Portions
                </option>

                <option value="kg">
                  Kilograms (kg)
                </option>

                <option value="items">
                  Items
                </option>

                <option value="packs">
                  Packs
                </option>
              </select>
            </div>

          </div>

          {/* Quantity */}
          <div className="form-group">
            <label htmlFor="quantity">
              Quantity
            </label>

            <input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              placeholder="e.g. 20"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows="4"
              placeholder="Describe the surplus food..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Location + Expiry */}
          <div className="form-row">

            <div className="form-group">
              <label htmlFor="location">
                Location
              </label>

              <input
                id="location"
                name="location"
                type="text"
                placeholder="e.g. Polonnaruwa"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="expiryDate">
                Expiry Date & Time
              </label>

              <input
                id="expiryDate"
                name="expiryDate"
                type="datetime-local"
                value={formData.expiryDate}
                onChange={handleChange}
              />
            </div>

          </div>

          {/* Buttons */}
          <div className="form-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/food")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading
                ? "Adding Listing..."
                : "Add Food Listing"}
            </button>

          </div>

        </form>

      </section>
    </main>
  );
};

export default AddFoodListing;
