"use client";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import axios from "axios"; // Axios for making API calls
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation"; // For App Router (New)
import Image from 'next/image';

const PortfolioCreateForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Fetch URL parameters (to check if we're editing)

  const [previewImages, setPreviewImages] = useState([]);
  const [content, setContent] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [existingPortfolioData, setExistingPortfolioData] = useState(null);

  const PortfolioId = searchParams.get("id"); // Fetch Portfolio ID from URL


  useEffect(() => {
    console.log("aaya hai")
    // Fetch existing Portfolio data if we're in edit mode
    if (PortfolioId) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/portfolio?slug=${PortfolioId}`).then((response) => {
        const Portfolio = response.data.portfolios[0];


        // Ensure you're getting the complete Portfolio data
        if (Portfolio) {
          console.log(`dta of ${Portfolio}`);
          setExistingPortfolioData(Portfolio);
          setContent(Portfolio.longDescription || ""); // Default empty content if not available
          // setKeywords(Portfolio.tags || ""); // Default empty string if no tags are available
          setPreviewImages([Portfolio?.image || ""]);

          // Correct image URL handling
          // setPreviewImages([`http://localhost:3000/_next/image?url=${Portfolio.imageUrl}`]); // Remove the extra space in the URL
        }
      }).catch((error) => {
        console.error("Error fetching Portfolio data:", error);
      });
    }
  }, [PortfolioId]);




  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(5, "Title must be at least 5 characters")
      .max(100, "Title must not exceed 100 characters")
      .required("Title is required"),
    slug: Yup.string()
      .matches(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens")
      .required("Slug is required"),
    description: Yup.string()
      .max(60, "Meta title should not exceed 60 characters")
      .required("Meta title is required"),
    category: Yup.string()
      .min(3, "Category must be at least 3 characters")
      .required("Category is required"),
    duration: Yup.string()
      .matches(/^\d+(\.\d+)?$/, "Duration must be a valid number")
      .required("Duration is required"),
    client: Yup.string()
      .min(3, "Client name must be at least 3 characters")
      .required("Client is required"),
    website: Yup.string()
      .url("Website must be a valid URL")
      .required("Website is required"),
    contactPhone: Yup.string()
      .matches(/^\+?[1-9]\d{1,14}$/, "Contact phone must be a valid phone number")
      .required("Contact phone is required"),
    contactEmail: Yup.string()
      .email("Must be a valid email address")
      .required("Contact email is required"),
    iosAppLink: Yup.string()
      .url("iOS App link must be a valid URL"),
    androidAppLink: Yup.string()
      .url("Android App link must be a valid URL"),
    fileLink: Yup.string()
      .url("File link must be a valid URL"),
  });


  const handleQuillChange = (value) => {
    setContent(value);
  };


  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      const image = URL.createObjectURL(files[0]); // Create image URL for preview
      setPreviewImages([image]);
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("Submitted values:", values);
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("slug", values.slug);
      formData.append("description", values.description);
      formData.append("longDescription", content);
      formData.append("category", values.category);
      formData.append("duration", values.duration);
      formData.append("contactEmail", values.contactEmail);

      formData.append("client", values.client);
      formData.append("website", values.website);
      formData.append("contactPhone", values.contactPhone);
      formData.append("iosAppLink", values.iosAppLink);
      formData.append("androidAppLink", values.androidAppLink);
      formData.append("fileLink", values.fileLink);

      if (existingPortfolioData != null && PortfolioId != "") {
        formData.append("id", existingPortfolioData?.id);
      }

      if (previewImages.length > 0) {
        const imageFile = previewImages[0];
        console.log("Image file:", imageFile);
        const imageBlob = await fetch(imageFile).then((res) => res.blob()).catch(err => {
          console.error("Image Blob Error:", err);
        });
        formData.append("file", imageBlob, "featuredImage.jpg");
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/portfolio`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Portfolio created successfully:", response.data);

      resetForm();
      setContent("");
      router.push("/admin/adminPortfolio");
    } catch (error) {
      console.error("Error creating Portfolio:", error.response?.data || error.message);
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="max-w-4xl mx-auto p-6">
        <Formik
          enableReinitialize={PortfolioId != "" ? true : false}

          initialValues={{
            title: existingPortfolioData?.title || "",
            slug: existingPortfolioData?.slug || "",
            description: existingPortfolioData?.description || "",
            category: existingPortfolioData?.category || "",
            duration: existingPortfolioData?.duration || "",
            client: existingPortfolioData?.client || "",
            website: existingPortfolioData?.website || "",
            contactPhone: existingPortfolioData?.contactPhone || "",
            contactEmail: existingPortfolioData?.contactEmail || "",
            iosAppLink: existingPortfolioData?.iosAppLink || "",
            androidAppLink: existingPortfolioData?.androidAppLink || "",
            fileLink: existingPortfolioData?.fileLink || "",

          }}
          // validationSchema={validationSchema}
          onSubmit={handleSubmit} // This should point to your handleSubmit function
        >
          {({ errors, touched, isSubmitting, values, setFieldValue }) => (
            <Form className="space-y-6">
              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Field
                  type="text"
                  name="title"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-4 pr-4 text-dark focus:border-primary focus-visible:outline-none"
                  placeholder="Enter Portfolio title"
                />
                {errors.title && touched.title && (
                  <div className="text-red-500 text-sm mt-1">{errors.title}</div>
                )}
              </div>

              {/* Slug Input */}
              <div>
                <label className="block text-sm font-medium mb-2">Slug</label>
                <Field
                  type="text"
                  name="slug"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-4 pr-4 text-dark focus:border-primary focus-visible:outline-none"
                  placeholder="enter-slug-here"
                />
                {errors.slug && touched.slug && (
                  <div className="text-red-500 text-sm mt-1">{errors.slug}</div>
                )}
              </div>

              {/* Meta Title Input */}
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Field
                  type="text"
                  name="description"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-4 pr-4 text-dark focus:border-primary focus-visible:outline-none"
                  placeholder="Enter meta title"
                />
                {errors.description && touched.description && (
                  <div className="text-red-500 text-sm mt-1">{errors.description}</div>
                )}
              </div>


              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <Field
                  type="text"
                  name="category"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-4 pr-4 text-dark focus:border-primary focus-visible:outline-none"
                  placeholder="Enter category"
                />
                {errors.category && touched.category && (
                  <div className="text-red-500 text-sm mt-1">{errors.category}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Duration</label>
                <Field
                  type="text"
                  name="duration"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-4 pr-4 text-dark focus:border-primary focus-visible:outline-none"
                  placeholder="Enter duration"
                />
                {errors.duration && touched.duration && (
                  <div className="text-red-500 text-sm mt-1">{errors.duration}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Client</label>
                <Field
                  type="text"
                  name="Client"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-4 pr-4 text-dark focus:border-primary focus-visible:outline-none"
                  placeholder="Enter Client"
                />
                {errors.Client && touched.Client && (
                  <div className="text-red-500 text-sm mt-1">{errors.Client}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Website</label>
                <Field
                  type="text"
                  name="website"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-4 pr-4 text-dark focus:border-primary focus-visible:outline-none"
                  placeholder="Enter website"
                />
                {errors.website && touched.website && (
                  <div className="text-red-500 text-sm mt-1">{errors.website}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">ContactPhone</label>
                <Field
                  type="text"
                  name="contactPhone"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-4 pr-4 text-dark focus:border-primary focus-visible:outline-none"
                  placeholder="Enter contactPhone"
                />
                {errors.contactPhone && touched.contactPhone && (
                  <div className="text-red-500 text-sm mt-1">{errors.contactPhone}</div>
                )}
              </div>


              <div>
                <label className="block text-sm font-medium mb-2">ContactEmail</label>
                <Field
                  type="text"
                  name="contactEmail"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-4 pr-4 text-dark focus:border-primary focus-visible:outline-none"
                  placeholder="Enter contactEmail"
                />
                {errors.contactEmail && touched.contactEmail && (
                  <div className="text-red-500 text-sm mt-1">{errors.contactEmail}</div>
                )}
              </div>


              <div>
                <label className="block text-sm font-medium mb-2">iosAppLink</label>
                <Field
                  type="text"
                  name="iosAppLink"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-4 pr-4 text-dark focus:border-primary focus-visible:outline-none"
                  placeholder="Enter iosAppLink"
                />
                {errors.iosAppLink && touched.iosAppLink && (
                  <div className="text-red-500 text-sm mt-1">{errors.iosAppLink}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">AndroidAppLink</label>
                <Field
                  type="text"
                  name="androidAppLink"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-4 pr-4 text-dark focus:border-primary focus-visible:outline-none"
                  placeholder="Enter androidAppLink"
                />
                {errors.androidAppLink && touched.androidAppLink && (
                  <div className="text-red-500 text-sm mt-1">{errors.androidAppLink}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">FileLink</label>
                <Field
                  type="text"
                  name="fileLink"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-4 pr-4 text-dark focus:border-primary focus-visible:outline-none"
                  placeholder="Enter fileLink"
                />
                {errors.fileLink && touched.fileLink && (
                  <div className="text-red-500 text-sm mt-1">{errors.fileLink}</div>
                )}
              </div>



              {/* Content Input */}
              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <ReactQuill
                  value={content}
                  onChange={handleQuillChange}
                  theme="snow"
                  placeholder="Write your content here..."
                />
                {errors.content && touched.content && (
                  <div className="text-red-500 text-sm mt-1">{errors.content}</div>
                )}
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">Featured Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full py-2.5 pl-4 pr-4 border border-stroke rounded-[7px]"
                />
                {previewImages.length > 0 && (
                  <div className="mt-2">
                    <Image src={previewImages[0]} alt="Preview" className="max-w-xs rounded-md" width={100} height={100} />
                  </div>
                )}
              </div>


              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-2.5 px-4 rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Publishing...
                  </div>
                ) : (
                  PortfolioId ? "Update Portfolio Post" : "Publish Portfolio Post"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PortfolioCreateForm;
