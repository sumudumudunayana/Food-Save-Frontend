import { useEffect, useState } from "react";
import API from "../../services/api";
import "../../styles/Business/BusinessRequests.css";

const BusinessRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  // Get logged-in business
  const storedUser = localStorage.getItem("foodSaveUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const businessName =
    user?.businessName ||
    user?.name ||
    user?.fullName ||
    user?.full_name ||
    user?.username ||
    "";
  const businessId = user?._id;

  // Fetch business requests
  const fetchRequests = async () => {
    if (!businessId) {
      setError("Business account details are missing. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await API.get(
        `/requests/business/${encodeURIComponent(businessId)}`,
        { params: { businessName: businessName.trim() } }
      );

      setRequests(response.data.requests || []);
    } catch (error) {
      console.error("Error fetching business requests:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load food requests. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [businessId, businessName]);

  // Update request status
  const updateStatus = async (requestId, status) => {
    try {
      setUpdatingId(requestId);
      setError("");

      await API.put(`/requests/${requestId}/status`, {
        status,
      });

      // Refresh requests after update
      await fetchRequests();
    } catch (error) {
      console.error("Error updating request:", error);

      setError(
        error.response?.data?.message ||
          "Unable to update request status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusClass = (status) => {
    return `business-request-status ${status}`;
  };

  if (loading) {
    return (
      <main className="business-requests-page">
        <section className="business-requests-container">
          <div className="business-requests-message">
            <p>Loading incoming requests...</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="business-requests-page">
      <section className="business-requests-container">

        {/* Header */}
        <div className="business-requests-header">
          <span>BUSINESS</span>

          <h1>Incoming Food Requests</h1>

          <p>
            Review requests from recipients and manage
            the status of your donated food.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="business-requests-message error">
            <p>{error}</p>

            <button onClick={fetchRequests}>
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!error && requests.length === 0 && (
          <div className="business-requests-message">

            <div className="empty-business-request-icon">
              📦
            </div>

            <h2>No incoming requests</h2>

            <p>
              You currently have no food requests from
              recipients.
            </p>

          </div>
        )}

        {/* Requests */}
        {!error && requests.length > 0 && (
          <div className="business-requests-list">

            {requests.map((request) => (
              <article
                className="business-request-card"
                key={request._id}
              >

                {/* Card Header */}
                <div className="business-request-card-header">

                  <div>
                    <span className="business-request-category">
                      FOOD REQUEST
                    </span>

                    <h2>
                      {request.foodName || "Food Listing"}
                    </h2>

                    <p>
                      Requested by{" "}
                      <strong>
                        {request.recipientName || "Recipient"}
                      </strong>
                    </p>
                  </div>

                  {/* Status */}
                  <span
                    className={getStatusClass(
                      request.status
                    )}
                  >
                    {request.status}
                  </span>

                </div>

                {/* Details */}
                <div className="business-request-details">

                  <div>
                    <span>Food Name</span>

                    <strong>
                      {request.foodName || "N/A"}
                    </strong>
                  </div>

                  <div>
                    <span>Recipient</span>

                    <strong>
                      {request.recipientName || "N/A"}
                    </strong>
                  </div>

                  <div>
                    <span>Quantity Requested</span>

                    <strong>
                      {request.quantityRequested}
                    </strong>
                  </div>

                  <div>
                    <span>Requested On</span>

                    <strong>
                      {request.requestedAt
                        ? new Date(
                            request.requestedAt
                          ).toLocaleString()
                        : "N/A"}
                    </strong>
                  </div>

                </div>

                {/* Actions */}
                <div className="business-request-actions">

                  {request.status === "pending" && (
                    <>
                      <button
                        className="accept-request-btn"
                        disabled={updatingId === request._id}
                        onClick={() =>
                          updateStatus(
                            request._id,
                            "accepted"
                          )
                        }
                      >
                        {updatingId === request._id
                          ? "Updating..."
                          : "Accept Request"}
                      </button>

                      <button
                        className="reject-request-btn"
                        disabled={updatingId === request._id}
                        onClick={() =>
                          updateStatus(
                            request._id,
                            "rejected"
                          )
                        }
                      >
                        Reject Request
                      </button>
                    </>
                  )}

                  {request.status === "accepted" && (
                    <>
                      <p className="request-action-info">
                        ✓ Request accepted. Food is ready
                        for collection.
                      </p>

                      <button
                        className="collect-request-btn"
                        disabled={updatingId === request._id}
                        onClick={() =>
                          updateStatus(
                            request._id,
                            "collected"
                          )
                        }
                      >
                        {updatingId === request._id
                          ? "Updating..."
                          : "Mark as Collected"}
                      </button>
                    </>
                  )}

                  {request.status === "rejected" && (
                    <p className="request-action-info rejected">
                      This request has been rejected.
                    </p>
                  )}

                  {request.status === "collected" && (
                    <p className="request-action-info collected">
                      ✓ Food has been collected successfully.
                    </p>
                  )}

                </div>

              </article>
            ))}

          </div>
        )}

      </section>
    </main>
  );
};

export default BusinessRequests;
