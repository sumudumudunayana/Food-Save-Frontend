import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";
import "../../styles/Food/FoodDetails.css";

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [food, setFood] = useState(null);
  const [quantityRequested, setQuantityRequested] = useState("");
  const [recipientName, setRecipientName] = useState("");

  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Get food details
  const fetchFood = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get(`/foods/${id}`);

      setFood(response.data);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to load this food listing."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFood();
  }, [id]);

  // Submit food request
  const handleRequest = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Validate recipient name
    if (!recipientName.trim()) {
      setError("Please enter your name.");
      return;
    }

    // Validate quantity
    if (!quantityRequested) {
      setError("Please enter the quantity you want to request.");
      return;
    }

    const quantity = Number(quantityRequested);

    if (quantity < 1) {
      setError("Requested quantity must be at least 1.");
      return;
    }

    if (quantity > food.quantity) {
      setError(
        `You can request a maximum of ${food.quantity} ${food.unit}.`
      );
      return;
    }

    try {
      setRequesting(true);

      // Send required details to backend
      await API.post("/requests", {
        foodListingId: food._id,
        foodName: food.foodName,
        businessName: food.businessName,
        recipientName: recipientName.trim(),
        quantityRequested: quantity,
      });

      setSuccess(
        "Food request submitted successfully! The business will review your request."
      );

      // Clear form
      setRecipientName("");
      setQuantityRequested("");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to submit your request. Please try again."
      );
    } finally {
      setRequesting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <main className="food-details-page">
        <div className="food-details-message">
          <p>Loading food details...</p>
        </div>
      </main>
    );
  }

  // Error while loading food
  if (error && !food) {
    return (
      <main className="food-details-page">
        <div className="food-details-message error">
          <h2>Food listing unavailable</h2>
          <p>{error}</p>

          <button onClick={() => navigate("/food")}>
            Back to Browse Food
          </button>
        </div>
      </main>
    );
  }

  if (!food) {
    return null;
  }

  return (
    <main className="food-details-page">
      <section className="food-details-container">

        {/* Back button */}
        <button
          className="back-food-btn"
          onClick={() => navigate("/food")}
        >
          ← Back to Browse Food
        </button>

        <div className="food-details-card">

          {/* Food visual */}
          <div className="food-details-image">
            <span>🍱</span>

            <div className="food-details-status">
              {food.status === "available"
                ? "Available"
                : food.status}
            </div>
          </div>

          {/* Food details */}
          <div className="food-details-content">

            <span className="food-details-category">
              {food.category}
            </span>

            <h1>{food.foodName}</h1>

            <p className="food-details-description">
              {food.description}
            </p>

            <div className="food-business">
              <span>Business</span>
              <strong>{food.businessName}</strong>
            </div>

            <div className="food-details-info">

              <div className="detail-item">
                <span>Available Quantity</span>

                <strong>
                  {food.quantity} {food.unit}
                </strong>
              </div>

              <div className="detail-item">
                <span>Location</span>

                <strong>
                  {food.location}
                </strong>
              </div>

              <div className="detail-item">
                <span>Available Until</span>

                <strong>
                  {new Date(
                    food.expiryDate
                  ).toLocaleString()}
                </strong>
              </div>

            </div>

            {/* Request section */}
            {food.status === "available" && (
              <div className="request-section">

                <h2>Request This Food</h2>

                <p>
                  Enter your name and the amount you would
                  like to request.
                </p>

                <form onSubmit={handleRequest}>

                  {/* Recipient Name */}
                  <div className="request-form-group">
                    <label htmlFor="recipientName">
                      Your Name
                    </label>

                    <input
                      id="recipientName"
                      type="text"
                      placeholder="Enter your name"
                      value={recipientName}
                      onChange={(e) =>
                        setRecipientName(e.target.value)
                      }
                    />
                  </div>

                  {/* Quantity */}
                  <div className="request-form-group">
                    <label htmlFor="quantityRequested">
                      Quantity Requested
                    </label>

                    <input
                      id="quantityRequested"
                      type="number"
                      min="1"
                      max={food.quantity}
                      placeholder={`Maximum ${food.quantity}`}
                      value={quantityRequested}
                      onChange={(e) =>
                        setQuantityRequested(e.target.value)
                      }
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="request-message error">
                      {error}
                    </div>
                  )}

                  {/* Success */}
                  {success && (
                    <div className="request-message success">
                      {success}
                    </div>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="request-food-btn"
                    disabled={requesting}
                  >
                    {requesting
                      ? "Submitting Request..."
                      : "Request Food"}
                  </button>

                </form>
              </div>
            )}

            {/* Unavailable message */}
            {food.status !== "available" && (
              <div className="unavailable-message">
                This food listing is no longer available.
              </div>
            )}

          </div>
        </div>
      </section>
    </main>
  );
};

export default FoodDetails;
