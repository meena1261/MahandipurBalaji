
import React, { ReactNode, createContext, useContext, useState, FC } from "react";

// Define the structure of the configuration
interface Metadata {
  title: string;
  description: string;
  og_image: string;
  og_title: string;
  og_description: string;
  og_url: string;
  meta_keywords: string;
  meta_description: string;
  meta_author: string;
  twitter_card: string;
  twitter_site: string;
  twitter_title: string | null;
  twitter_description: string | null;
  twitter_image: string | null;
  bottomDescription: string | null;

}

interface GlobalConfigContextType {
  whatsappNumber: string;
  metadata: Metadata;
  setWhatsappNumber: (value: string) => void;
  setMetadata: (value: Metadata) => void;
}

// Create context
const GlobalConfigContext = createContext<GlobalConfigContextType | null>(null);

// Create provider
export const GlobalConfigProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [whatsappNumber, setWhatsappNumber] = useState<string>("9887406806");
  const [metadata, setMetadata] = useState<Metadata>({
    title: "Techno Boat - Top Fantasy Sports App Development Company | Cricket live line app Development | Software Development in Jaipur (Rajasthan), India",
    description: "Top Fantasy Sports App Development Company | Cricket live line app Development | Software Development in Jaipur (Rajasthan), India",
    og_image: "/uploads/c4998336-2340-4440-9e3a-c1633948cbe9.jpeg",
    og_title: "Techno Boat - Top Fantasy Sports App Development Company | Cricket live line app Development | Software Development in Jaipur (Rajasthan), India",
    og_description: "Top Fantasy Sports App Development Company | Cricket live line app Development | Software Development in Jaipur (Rajasthan), India",
    og_url: "https://klwhfs3z-3000.inc1.devtunnels.ms/",
    meta_keywords: "[Crickety,Jaipur]",
    meta_description: "Top Fantasy Sports App Development Company | Cricket live line app Development | Software Development in Jaipur (Rajasthan), India",
    meta_author: "Technoboat",
    twitter_card: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUBoMucXuF8wvCrjnmKX4YGJ5HhOp0hXy33Q&s",
    twitter_site: "https://klwhfs3z-3000.inc1.devtunnels.ms/",
    twitter_title: null,
    twitter_description: null,
    twitter_image: null,
    bottomDescription:'Stay Informed, Inspired, and Connected Unleashing the Power of Digital Innovation with Techno boat',

  });

  return (
    <GlobalConfigContext.Provider value={{ whatsappNumber, metadata, setWhatsappNumber, setMetadata }}>
      {children}
    </GlobalConfigContext.Provider>
  );
};

// Custom hook to use the context
export const useGlobalConfig = () => {
  const context = useContext(GlobalConfigContext);
  if (!context) {
    throw new Error("useGlobalConfig must be used within a GlobalConfigProvider");
  }
  return context;
};


// globalConfig.ts
// utils/getGlobalConfig.ts
// /utils/getGlobalConfig.ts or /types/GlobalConfigContext.ts
export const getGlobalConfig = () => {
  return {
    metadata: {
      title: "Techno Boat - Top Fantasy Sports App Development Company",
      description: "Top Fantasy Sports App Development Company in Jaipur (Rajasthan), India",
      og_title: "Techno Boat - Fantasy Sports App Developers",
      og_description: "Leading in cricket app development.",
      og_image: "/images/og-image.jpg",
      twitter_card: "summary_large_image",
      twitter_title: "Techno Boat",
      twitter_description: "Get your dream cricket app developed.",
      twitter_image: "/images/twitter-image.jpg",
    },
  };
};