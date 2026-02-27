"use client";

import React, { useState, useEffect } from "react";

const ConsultationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const hasSubmitted = localStorage.getItem("hasSubmittedForm");

    if (!hasSubmitted) {
      const hasShownThisSession = sessionStorage.getItem("hasShownModal");

      if (!hasShownThisSession) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 100);

        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.message.trim())
      newErrors.message = "Query description is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form submitted:", formData);
        localStorage.setItem("hasSubmittedForm", "true");
        handleClose();
        alert("Thank you for your submission!");
      } else {
        alert("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative animate-slide-up">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Modal content */}
        <h2
          className="text-3xl font-bold text-center mb-8"
          style={{ color: "rgb(249, 120, 55)" }}
        >
          {/* Get a Free Consultation */}
          मेहंदीपुर बालाजी धाम        (सवामणी, अर्जी, और चोला बुकिंग)        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className={`w-full px-4 py-3 border ${errors.name ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2`}
              style={{ "--tw-ring-color": "rgb(55, 88, 249)" }}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => {
                handleChange(e); // Update the form data
                const value = e.target.value;
                if (
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                  value === ""
                ) {
                  // Clear the error if the value is valid or empty
                  setErrors((prev) => ({ ...prev, email: "" }));
                } else {
                  // Set an error message if invalid
                  setErrors((prev) => ({
                    ...prev,
                    email: "Please enter a valid email address.",
                  }));
                }
              }}
              onBlur={() => {
                // Validate on blur to show error if invalid or empty
                if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                  setErrors((prev) => ({
                    ...prev,
                    email: "Please enter a valid email address.",
                  }));
                }
              }}
              placeholder="Email"
              className={`w-full px-4 py-3 border ${errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2`}
              style={{ "--tw-ring-color": "rgb(55, 88, 249)" }}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>


          <div >

            <input
              type="tel"
              name="phone"
              placeholder="Mobile Number"


              value={formData.phone}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  // Allow only numeric input
                  handleChange(e);
                }
              }}
              onBlur={() => {
                // Show error if input is empty or invalid
                if (!/^\d{10}$/.test(formData.phone)) {
                  setErrors((prev) => ({
                    ...prev,
                    phone: "Please enter a valid 10-digit phone number.",
                  }));
                } else {
                  setErrors((prev) => ({ ...prev, phone: "" }));
                }
              }}
              className={`w-full px-4 py-3 border ${errors.phone ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2`}
              style={{ "--tw-ring-color": "rgb(55, 88, 249)" }}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe Your Query"
              rows="4"
              className={`w-full px-4 py-3 border ${errors.message ? "border-red-500" : "border-gray-300"
                } rounded-lg resize-none focus:outline-none focus:ring-2`}
              style={{ "--tw-ring-color": "rgb(55, 88, 249)" }}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full text-white py-3 px-6 rounded-lg transition-colors duration-200"
            style={{
              backgroundColor: "rgb(55, 88, 249)",
              ":hover": {
                backgroundColor: "rgb(45, 78, 239)",
              },
            }}
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConsultationModal;
