import React, { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!formData.name) {
      isValid = false;
      errors.name = "A name is required.";
    }

    if (!formData.email) {
      isValid = false;
      errors.email = "An email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isValid = false;
      errors.email = "Email is not valid.";
    }

    if (!formData.phone) {
      isValid = false;
      errors.phone = "A phone number is required.";
    }

    if (!formData.message) {
      isValid = false;
      errors.message = "A message is required.";
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      toast("Email sent! Thanks for your feedback");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } else {
      toast("Please fill out all fields correctly.");
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  return (
    <body className="d-flex flex-column">
      <main className="flex-shrink-0">
        <section className="py-5">
          <div className="container px-5">
            <div className="bg-light rounded-3 py-5 px-4 px-md-5 mb-5">
              <div className="text-center mb-5">
                <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                  <i className="bi bi-envelope"></i>
                </div>
                <h1 className="fw-bolder">Get in touch</h1>
                <p className="lead fw-normal text-muted mb-0">
                  We'd love to hear from you
                </p>
              </div>
              <div className="row gx-5 justify-content-center">
                <div className="col-lg-8 col-xl-6">
                  <form id="contactForm">
                    <div className="form-floating mb-3">
                      <input
                        className={`form-control ${
                          errors.name ? "is-invalid" : ""
                        }`}
                        id="name"
                        type="text"
                        placeholder="Enter your name..."
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <label htmlFor="name">Full name</label>
                      <div className="invalid-feedback">{errors.name}</div>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        className={`form-control ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <label htmlFor="email">Email address</label>
                      <div className="invalid-feedback">{errors.email}</div>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        className={`form-control ${
                          errors.phone ? "is-invalid" : ""
                        }`}
                        id="phone"
                        type="tel"
                        placeholder="(123) 456-7890"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      <label htmlFor="phone">Phone number</label>
                      <div className="invalid-feedback">{errors.phone}</div>
                    </div>
                    <div className="form-floating mb-3">
                      <textarea
                        className={`form-control ${
                          errors.message ? "is-invalid" : ""
                        }`}
                        id="message"
                        placeholder="Enter your message here..."
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                      <label htmlFor="message">Message</label>
                      <div className="invalid-feedback">{errors.message}</div>
                    </div>
                    <div className="d-grid">
                      <button
                        className="btn btn-primary btn-lg"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="row gx-5 row-cols-2 row-cols-lg-4 py-5">
              <div className="col">
                <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                  <i className="bi bi-chat-dots"></i>
                </div>
                <div className="h5 mb-2">Chat with us</div>
                <p className="text-muted mb-0">
                  Chat live with one of our support specialists (Coming Soon!)
                </p>
              </div>
              <div className="col">
                <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                  <i className="bi bi-people"></i>
                </div>
                <div className="h5">Ask the community</div>
                <p className="text-muted mb-0">
                  Explore our community forums and communicate with other users.
                </p>
              </div>
              <div className="col">
                <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                  <i className="bi bi-question-circle"></i>
                </div>
                <div className="h5">Get involved</div>
                <p className="text-muted mb-0">
                  Say hello to our team at your next Premier League outing
                </p>
              </div>
              <div className="col">
                <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                  <i className="bi bi-telephone"></i>
                </div>
                <div className="h5">Call us</div>
                <p className="text-muted mb-0">
                  Call us during normal business hours at +44123456789.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </body>
  );
};

export default Contact;
