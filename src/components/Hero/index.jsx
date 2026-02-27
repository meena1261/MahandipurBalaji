"use client";
import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import axios from "axios"; // Axios for making API calls

const HeroSection = ({ existingConfigData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter(); // useRouter should be inside the component
  // const [existingConfigData, setExistingConfigData] = useState(null);

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
      newErrors.email = "Enter a valid email address.";
    if (!formData.phone.trim())
      newErrors.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone number must be 10 digits.";
    if (!formData.message.trim())
      newErrors.message = "Requirements are required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Submit data to API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Success handling
        alert("Form submitted successfully!");
        localStorage.setItem("hasSubmittedForm", "true");

        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        setErrors({});
      } else {
        // Extract and handle server-side validation errors
        const result = await response.json();
        if (result.errors) {
          setErrors(result.errors); // Assuming server returns error object
        } else {
          alert("Failed to submit the form. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden pt-[120px] md:pt-[130px] lg:pt-[160px]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-black/10">
        <Image
          src='/images/logo/Group 7467.png'
          alt="Background"
          layout="fill"  // Fill the container
          objectFit="cover"  // Ensure it covers the entire container
          className="w-full h-full object-cover mix-blend-overlay"
        />
      </div>

      {/* Content Container */}
      <div className="relative w-full px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-3 lg:gap-12 items-start lg:items-center">
            {/* Left Content */}
            <div className="text-white space-y-4 sm:space-y-6">
              {/* <div className="inline-block bg-black/30 px-4 sm:px-6 py-2 rounded-full">
                <p className="text-sm sm:text-base lg:text-lg">
                  {existingConfigData != null && existingConfigData.slogan || 'Make a distinct online presence to match your brand'}
                </p>
              </div> */}

              {/* <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                {existingConfigData && existingConfigData.website_title ? existingConfigData.website_title : (
                  <>
                    Fantasy Sports
                    <br />
                    App Development Services
                  </>
                )}

              </h1> */}

              {/* <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-2xl">
                {existingConfigData && existingConfigData.website_description ? existingConfigData.website_description : (
                  <>
                    In order to help our clients achieve their goals, we work closely
                    with them to understand their objectives and develop customized
                    solutions.
                  </>
                )}
              </p> */}
              {/* 
              <button onClick={() => router.push("/contact")} className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-colors duration-300">

                अभी देखे
              </button> */}
            </div>

            {/* Right Form */}
            <div className="bg-gray-900/100 p-4 sm:p-6 lg:p-8 rounded-xl backdrop-blur-sm w-full lg:w-[90%] xl:w-[80%] mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-orange-300">
                {/* Get A Free Quote */}
                Mehandipur Balaji Sawamani, Arji, Chola Booking. Contact for bookings. Pure prasad. Book online now.
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-white mb-2 text-sm sm:text-base">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Name"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white text-gray-900"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white mb-2 text-sm sm:text-base">
                    Email *
                  </label>
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
                    placeholder="Enter Email"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white text-gray-900"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white mb-2 text-sm sm:text-base">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
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
                    placeholder="Phone Number"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white text-gray-900"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white mb-2 text-sm sm:text-base">
                    Requirements
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter Your Requirements"
                    rows="4"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white text-gray-900 resize-none"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-orange-600 hover:bg-orange-700 text-white py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-colors duration-300 ${isSubmitting && "opacity-50 cursor-not-allowed"
                    }`}
                >
                  {isSubmitting ? "Bookink..." : "Book Now"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
