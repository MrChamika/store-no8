export const site = {
  name: "Store No. 8",
  shortName: "No. 8",
  tagline: "Everyday essentials, curated with care.",
  description:
    "Store No. 8 is a curated lifestyle and gift boutique in Kegalle offering toys & collectibles, fashion bags, beauty & hair accessories, artistic home decor and fine ceramics — thoughtfully selected and priced fairly.",
  url: "https://storeno8.lk",
  address: {
    line1: "No 493, Kandy Road",
    city: "Kegalle",
    region: "Sri Lanka",
    postalCode: "71000",
  },
  phone: "0352 222 360",
  phoneHref: "+94352222360",
  whatsapp: "https://wa.me/94352222360",
  email: "storeno8lk@gmail.com",
  hours: [
    { days: "Monday – Friday", time: "9:00 AM – 8:00 PM" },
    { days: "Saturday", time: "9:00 AM – 8:00 PM" },
    { days: "Sunday & Poya Days", time: "10:00 AM – 6:00 PM" },
  ],
  social: {
    facebook: "https://www.facebook.com/storeno8/",
    instagram: "https://www.instagram.com/storeno8/",
  },
  delivery: {
    freeOver: 5000,
    fee: 450,
    note: "Island-wide delivery available on all orders.",
  },
} as const

export function formatLKR(value: number) {
  return `LKR ${value.toLocaleString("en-LK")}`
}
