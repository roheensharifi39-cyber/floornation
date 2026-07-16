export const siteConfig = {
  name: "Floor Nation",
  url: "https://floornation.ae",
  description:
    "Premium flooring, decking, outdoor structures, and custom furniture solutions for residential and commercial spaces across Dubai and the UAE.",
  phoneMobile: "+971 56 917 8686",
  phoneOffice: "+971 4 238 7786",
  phoneMobileHref: "tel:+971569178686",
  phoneOfficeHref: "tel:+97142387786",
  email: "info@floornation.ae",
  whatsapp: "https://wa.me/971569178686",
  address: [
    "Al Nokhita Building, 6th Floor, Office 619",
    "Al Khaleej Road, Al Hamriya",
    "Dubai, United Arab Emirates",
    "P.O. Box 63049",
  ],
} as const;

export const primaryNavigation = [
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Custom Furniture", href: "/custom-furniture" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;
