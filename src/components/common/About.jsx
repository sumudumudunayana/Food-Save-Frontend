import React from "react";
import "../../styles/common/About.css";

const About = () => {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-container">
          <span className="about-label">ABOUT FOODSAVE</span>

          <h1>
            Reducing Food Waste.
            <br />
            Helping Communities.
          </h1>

          <p>
            FoodSave is a food-sharing platform designed to connect businesses
            with surplus food to people and organizations who need it.
          </p>
        </div>
      </section>

      <section className="about-content">
        <div className="about-container">

          {/* About Project */}
          <div className="about-section">
            <div className="about-section-title">
              <span>01</span>
              <h2>About the Project</h2>
            </div>

            <div className="about-section-text">
              <p>
                FoodSave is a web-based food donation and sharing platform
                developed to help reduce food waste while supporting people in
                need.
              </p>

              <p>
                Businesses such as restaurants, bakeries, supermarkets, and
                other food providers can list surplus food on the platform.
                Recipients can browse the available food and submit requests
                for the items they need.
              </p>

              <p>
                The system provides a simple way for businesses and recipients
                to connect, making the process of donating, requesting, and
                collecting surplus food more organized and efficient.
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="about-section">
            <div className="about-section-title">
              <span>02</span>
              <h2>How FoodSave Works</h2>
            </div>

            <div className="about-steps">

              <div className="about-step">
                <div className="step-number">1</div>
                <div>
                  <h3>Businesses List Food</h3>
                  <p>
                    Businesses can add available surplus food with details
                    such as food name, quantity, and other relevant
                    information.
                  </p>
                </div>
              </div>

              <div className="about-step">
                <div className="step-number">2</div>
                <div>
                  <h3>Recipients Browse</h3>
                  <p>
                    Recipients can browse available food listings and find
                    food that is suitable for their needs.
                  </p>
                </div>
              </div>

              <div className="about-step">
                <div className="step-number">3</div>
                <div>
                  <h3>Recipients Send Requests</h3>
                  <p>
                    A recipient can select a food item and submit a request
                    specifying the quantity required.
                  </p>
                </div>
              </div>

              <div className="about-step">
                <div className="step-number">4</div>
                <div>
                  <h3>Businesses Manage Requests</h3>
                  <p>
                    Businesses can review incoming requests and accept or
                    reject them based on the available food quantity.
                  </p>
                </div>
              </div>

              <div className="about-step">
                <div className="step-number">5</div>
                <div>
                  <h3>Food Is Collected</h3>
                  <p>
                    Once a request is accepted, the food can be collected and
                    the business can mark the request as collected.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Features */}
          <div className="about-section">
            <div className="about-section-title">
              <span>03</span>
              <h2>Key Features</h2>
            </div>

            <div className="about-features">

              <div className="about-feature">
                <div className="feature-icon">🍱</div>
                <h3>Food Listings</h3>
                <p>
                  Businesses can create and manage surplus food listings.
                </p>
              </div>

              <div className="about-feature">
                <div className="feature-icon">🔎</div>
                <h3>Food Discovery</h3>
                <p>
                  Recipients can browse available food and find suitable
                  donations.
                </p>
              </div>

              <div className="about-feature">
                <div className="feature-icon">📋</div>
                <h3>Food Requests</h3>
                <p>
                  Recipients can submit requests for specific food items and
                  quantities.
                </p>
              </div>

              <div className="about-feature">
                <div className="feature-icon">✅</div>
                <h3>Request Management</h3>
                <p>
                  Businesses can accept, reject, and complete incoming food
                  requests.
                </p>
              </div>

              <div className="about-feature">
                <div className="feature-icon">📦</div>
                <h3>Quantity Management</h3>
                <p>
                  Available food quantities are updated when requests are
                  accepted.
                </p>
              </div>

              <div className="about-feature">
                <div className="feature-icon">🌱</div>
                <h3>Social Impact</h3>
                <p>
                  FoodSave encourages food redistribution and helps reduce
                  unnecessary food waste.
                </p>
              </div>

            </div>
          </div>

          {/* Technology */}
          <div className="about-section">
            <div className="about-section-title">
              <span>04</span>
              <h2>Technology Used</h2>
            </div>

            <div className="technology-list">
              <div className="technology-item">
                <strong>React.js</strong>
                <span>Frontend user interface</span>
              </div>

              <div className="technology-item">
                <strong>Node.js</strong>
                <span>Backend runtime environment</span>
              </div>

              <div className="technology-item">
                <strong>Express.js</strong>
                <span>REST API and server-side routing</span>
              </div>

              <div className="technology-item">
                <strong>MongoDB</strong>
                <span>Database for application data</span>
              </div>

              <div className="technology-item">
                <strong>Mongoose</strong>
                <span>MongoDB data modelling</span>
              </div>

            </div>
          </div>

          {/* Mission */}
          <div className="about-mission">
            <span>OUR MISSION</span>

            <h2>
              Making surplus food more useful
              <br />
              instead of letting it go to waste.
            </h2>

            <p>
              FoodSave aims to create a simple digital platform where surplus
              food can be redirected to people who need it, creating benefits
              for businesses, communities, and the environment.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
};

export default About;