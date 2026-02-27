// import { service } from "@/types/global";
import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  // {
  //   id: 1,
  //   title: "DashBoard",
  //   path: "/admin",
  //   newTab: false,
  // },
  {
    id: 6,
    title: "Booking",
    newTab: false,
    path: "/services",

    // submenu: service.map((item: { slug: any; title: any; }) => ({
    //   id: item.slug, // Using the slug as the unique ID for each submenu item
    //   title: item.title,
    //   path: `/services/${item.slug}`, // Constructing dynamic path based on the slug
    //   newTab: false,
    // })),
  },

  // {
  //   id: 3,
  //   title: "Pricing",
  //   path: "/pricing",
  //   newTab: false,
  // },
  {
    id: 5,
    title: "Contact",
    path: "/contact",
    newTab: false,
  },
  {
    id: 5,
    title: "Blog",
    path: "/blogs",
    newTab: false,
  },
  {
    id: 5,
    title: "Portfolio",
    path: "/portfolio",
    newTab: false,
  },
  {
    id: 2,
    title: "About",
    path: "/about",
    newTab: false,
  },

];
export default menuData;
