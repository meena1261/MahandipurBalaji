
"use client";

import React, { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = () => {
    const formErrors: Partial<FormData> = {};
    if (!formData.name.trim()) formErrors.name = "Full Name is required";
    if (!formData.email.trim()) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email address is invalid";
    }
    if (!formData.phone.trim()) formErrors.phone = "Phone is required";
    if (!formData.message.trim()) formErrors.message = "Message is required";
    return formErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      // alert("Form submitted successfully");
      // Reset the form data

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
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
          setErrors({});
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 1000);

        } else {
          alert("Failed to submit the form. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("There was an error submitting the form. Please try again.");
      } finally {


      }
    };





    // Show success popup


    // Hide alert after 1 second

    // Optionally clear any existing errors after a successful submission


  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  return (
    <section id="contact" className="relative py-2 md:py-[20px]">
      <div className="absolute left-0 top-0 -z-[1] h-full w-full dark:bg-dark"></div>
      <div className="absolute left-0 top-0 -z-[1] h-1/2 w-full bg-[#E9F9FF] dark:bg-dark-700 lg:h-[45%] xl:h-1/2"></div>
      <div className="container px-4">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div className="ud-contact-content-wrapper">
              <div className="ud-contact-title mb-12 lg:mb-[150px]">
                <span className="mb-6 block text-base font-medium text-dark dark:text-white">
                  CONTACT US
                </span>
                <h2 className=" text-[25px] font-semibold leading-[1.14] text-dark dark:text-white">
                  We value your bookings, inquiries, and requests.
                </h2>

              </div>
              <div className="mb-12 flex flex-wrap justify-between lg:mb-0">
                <div className="mb-8 flex w-[330px] max-w-full">
                  {/* <div className="mr-6 text-[32px] text-primary">
                    <svg
                      width="29"
                      height="35"
                      viewBox="0 0 29 35"
                      className="fill-current"
                    >
                      <path d="M14.5 0.710938C6.89844 0.710938 0.664062 6.72656 0.664062 14.0547C0.664062 19.9062 9.03125 29.5859 12.6406 33.5234C13.1328 34.0703 13.7891 34.3437 14.5 34.3437C15.2109 34.3437 15.8672 34.0703 16.3594 33.5234C19.9688 29.6406 28.3359 19.9062 28.3359 14.0547C28.3359 6.67188 22.1016 0.710938 14.5 0.710938ZM14.9375 32.2109C14.6641 32.4844 14.2812 32.4844 14.0625 32.2109C11.3828 29.3125 2.57812 19.3594 2.57812 14.0547C2.57812 7.71094 7.9375 2.625 14.5 2.625C21.0625 2.625 26.4219 7.76562 26.4219 14.0547C26.4219 19.3594 17.6172 29.2578 14.9375 32.2109Z" />
                      <path d="M14.5 8.58594C11.2734 8.58594 8.59375 11.2109 8.59375 14.4922C8.59375 17.7188 11.2187 20.3984 14.5 20.3984C17.7812 20.3984 20.4062 17.7734 20.4062 14.4922C20.4062 11.2109 17.7266 8.58594 14.5 8.58594ZM14.5 18.4297C12.3125 18.4297 10.5078 16.625 10.5078 14.4375C10.5078 12.25 12.3125 10.4453 14.5 10.4453C16.6875 10.4453 18.4922 12.25 18.4922 14.4375C18.4922 16.625 16.6875 18.4297 14.5 18.4297Z" />
                    </svg>
                  </div> */}
                  <div>
                    <h3 className="mb-[15px] text-lg font-semibold text-dark dark:text-white">
                      Shiv misthan Bhandar
                    </h3>
                    <p className="text-base text-body-color dark:text-dark-6">
                      Shop number 6.B, Mehandipur Balaji Ram Mandir wali line, Dist- Dausa (Rajasthan)
                    </p>
                  </div>
                </div>
                <div className="mb-8 flex w-[330px] max-w-full">
                  <div className="mr-6 text-[32px] text-primary">
                    <svg
                      width="34"
                      height="25"
                      viewBox="0 0 34 25"
                      className="fill-current"
                    >
                      <path d="M30.5156 0.960938H3.17188C1.42188 0.960938 0 2.38281 0 4.13281V20.9219C0 22.6719 1.42188 24.0938 3.17188 24.0938H30.5156C32.2656 24.0938 33.6875 22.6719 33.6875 20.9219V4.13281C33.6875 2.38281 32.2656 0.960938 30.5156 0.960938ZM30.5156 2.875C30.7891 2.875 31.0078 2.92969 31.2266 3.09375L17.6094 11.3516C17.1172 11.625 16.5703 11.625 16.0781 11.3516L2.46094 3.09375C2.67969 2.98438 2.89844 2.875 3.17188 2.875H30.5156ZM30.5156 22.125H3.17188C2.51562 22.125 1.91406 21.5781 1.91406 20.8672V5.00781L15.0391 12.9922C15.5859 13.3203 16.1875 13.4844 16.7891 13.4844C17.3906 13.4844 17.9922 13.3203 18.5391 12.9922L31.6641 5.00781V20.8672C31.7734 21.5781 31.1719 22.125 30.5156 22.125Z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-center">
                      <h3 className="mb-4 text-lg font-semibold text-dark dark:text-white">
                        How Can We Assist with Your Booking?
                      </h3>
                      <p className="text-base text-body-color dark:text-dark-6 flex items-center gap-2">

                        <a href="mailto:info@mahandipurbalaji.com" className="hover:underline">
                          info@mahandipurbalaji.com
                        </a>
                      </p>
                      <p className="text-base text-body-color dark:text-dark-6 flex items-center gap-2">

                        <a href="tel:+918559833140" className="hover:underline">
                          +918559833140
                        </a>
                      </p>

                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <div
              className="wow fadeInUp rounded-lg bg-white px-8 py-10 shadow-testimonial dark:bg-dark-2 dark:shadow-none sm:px-10 sm:py-12 md:p-[60px] lg:p-10 lg:px-10 lg:py-12 2xl:p-[60px]"
              data-wow-delay=".2s
              "
            >
              <h3 className="mb-8 text-2xl font-semibold text-dark dark:text-white md:text-[28px] md:leading-[1.42]">
                Stay tuned with us

              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-[22px]">
                  <label className="mb-4 block text-sm text-body-color dark:text-dark-6">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => {
                      handleChange(e); // Update the form data
                      const value = e.target.value.trim();
                      if (value.length > 0) {
                        setErrors((prev) => ({ ...prev, name: "" }));
                      } else {
                        setErrors((prev) => ({
                          ...prev,
                          name: "Full Name is required.",
                        }));
                      }
                    }}
                    onBlur={() => {
                      // Validate on blur
                      if (!formData.name || formData.name.trim() === "") {
                        setErrors((prev) => ({
                          ...prev,
                          name: "Full Name is required.",
                        }));
                      }
                    }}
                    className="w-full border-0 border-b border-[#f1f1f1] bg-transparent pb-3 text-dark placeholder:text-body-color/60 focus:border-primary focus:outline-none dark:border-dark-3 dark:text-white"
                    placeholder="Your Name"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div className="mb-[22px]">
                  <label className="mb-4 block text-sm text-body-color dark:text-dark-6">
                    Email*
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
                    className="w-full border-0 border-b border-[#f1f1f1] bg-transparent pb-3 text-dark placeholder:text-body-color/60 focus:border-primary focus:outline-none dark:border-dark-3 dark:text-white"
                    placeholder="example@domain.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                <div className="mb-[22px]">
                  <label className="mb-4 block text-sm text-body-color dark:text-dark-6">
                    Phone*
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
                    className="w-full border-0 border-b border-[#f1f1f1] bg-transparent pb-3 text-dark placeholder:text-body-color/60 focus:border-primary focus:outline-none dark:border-dark-3 dark:text-white"
                    placeholder="+91 1234567890"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>

                <div className="mb-[22px]">
                  <label className="mb-4 block text-sm text-body-color dark:text-dark-6">
                    Message*
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={(e) => {
                      handleChange(e); // Update the form data
                      const value = e.target.value.trim();
                      if (value.length > 0) {
                        setErrors((prev) => ({ ...prev, message: "" }));
                      } else {
                        setErrors((prev) => ({
                          ...prev,
                          message: "Message is required.",
                        }));
                      }
                    }}
                    onBlur={() => {
                      // Validate on blur
                      if (!formData.message || formData.message.trim() === "") {
                        setErrors((prev) => ({
                          ...prev,
                          message: "Message is required.",
                        }));
                      }
                    }}
                    rows={3}
                    className="w-full resize-none border-0 border-b border-[#f1f1f1] bg-transparent pb-3 text-dark placeholder:text-body-color/60 focus:border-primary focus:outline-none dark:border-dark-3 dark:text-white"
                    placeholder="Your Message"
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                </div>

                <div className="mb-0">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-3 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-primary/90"
                  >
                    Send
                  </button>
                </div>
              </form>
              {/* Success Alert */}
              {showAlert && (
                <div style={styles.alert}>
                  <p>Form submitted successfully!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
const styles: { alert: React.CSSProperties } = {

  alert: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    zIndex: 1000,
    fontSize: '16px',
  },
};

export default Contact;
