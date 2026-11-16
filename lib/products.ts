export type Product = {
  id: string
  slug: string
  name: string
  category: string
  price: number
  compareAtPrice?: number
  image: string
  gallery: string[]
  badge?: "New" | "Bestseller" | "Sale" | "Limited"
  rating: number
  reviews: number
  description: string
  features: string[]
  options: string[]
  inStock: boolean
}

export type Category = {
  slug: string
  name: string
  description: string
  image: string
}

const img = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const categories: Category[] = [
  {
    slug: "toys-collectibles",
    name: "Toys & Collectibles",
    description: "Electric ride-on cars, RC supercars, action figures, dinosaurs and soft plushies.",
    image: img("photo-1596461404969-9ae70f2830c1"),
  },
  {
    slug: "bags-accessories",
    name: "Bags & Accessories",
    description: "Quilted crossbody bags, structured totes, mini backpacks and gentleman's silk ties.",
    image: img("photo-1584917865442-de89df76afd3"),
  },
  {
    slug: "beauty-accessories",
    name: "Beauty & Hair",
    description: "Velvet padded headbands, satin scrunchies, claw clips and daily beauty essentials.",
    image: img("photo-1596462502278-27bfdc403348"),
  },
  {
    slug: "home-decor",
    name: "Home Decor & Living",
    description: "Artistic animal statues, couple figurines, potted faux greenery and decorative accents.",
    image: img("photo-1579783900882-c0d3dad7b119"),
  },
  {
    slug: "ceramics-tableware",
    name: "Ceramics & Tableware",
    description: "Expressive emoji mugs, gold-script mugs, bone china tea sets and fine porcelain.",
    image: img("photo-1514432324607-a09d9b4aefdd"),
  },
]

export const products: Product[] = [
  // ── Corner 01: Toys & Collectibles ─────────────────────────────────────
  {
    id: "no8-001",
    slug: "electric-rideon-4x4-jeep",
    name: "Electric 12V 4x4 Trail Explorer Jeep",
    category: "toys-collectibles",
    price: 46500,
    compareAtPrice: 54000,
    image: img("photo-1508974239320-0a029497e820"),
    gallery: [
      img("photo-1508974239320-0a029497e820"),
      img("photo-1596461404969-9ae70f2830c1"),
      img("photo-1558060370-d644479cb6f7"),
    ],
    badge: "Bestseller",
    rating: 4.9,
    reviews: 86,
    description:
      "Battery-powered 12V dual-motor ride-on Jeep featuring realistic working LED headlights, parent remote control, bluetooth music player, and rugged spring suspension. Built for adventurous little drivers.",
    features: [
      "12V rechargeable dual-motor drive",
      "Parental 2.4G wireless remote control",
      "Realistic dashboard audio & LED headlights",
      "Suitable for ages 3–7 years",
    ],
    options: ["Army Green", "Bright Yellow", "Sport Red"],
    inStock: true,
  },
  {
    id: "no8-002",
    slug: "rc-highspeed-supercar",
    name: "1:18 RC High-Speed Supercar",
    category: "toys-collectibles",
    price: 6850,
    compareAtPrice: 8200,
    image: img("photo-1594787318286-3d835c1d207f"),
    gallery: [
      img("photo-1594787318286-3d835c1d207f"),
      img("photo-1596461404969-9ae70f2830c1"),
    ],
    badge: "Sale",
    rating: 4.8,
    reviews: 114,
    description:
      "Precision 1:18 scale remote control luxury sports racer with aerodynamic styling, functional LED headlights, and rubber grip racing tires. Delivers responsive high-speed maneuvering on smooth floors.",
    features: [
      "High-response pistol-grip remote control",
      "15 km/h top racing speed",
      "Rechargeable Li-ion battery pack included",
      "Detailed aerodynamic chassis & rubber tires",
    ],
    options: ["Metallic Red", "Gunmetal Grey", "Matte Black"],
    inStock: true,
  },
  {
    id: "no8-003",
    slug: "jurassic-apex-trex-figure",
    name: "Jurassic Apex T-Rex Action Figure",
    category: "toys-collectibles",
    price: 3850,
    image: img("photo-1560157368-946d9c8f7cb6"),
    gallery: [
      img("photo-1560157368-946d9c8f7cb6"),
      img("photo-1563089145-599997674d42"),
    ],
    badge: "New",
    rating: 4.7,
    reviews: 62,
    description:
      "Museum-grade realistic Tyrannosaurus Rex collectible figure featuring textured scale skin, posable roaring jaw, and hand-painted detailing. Perfect for dinosaur enthusiasts of all ages.",
    features: [
      "Articulated jaw and posable limbs",
      "Durable solid PVC non-toxic build",
      "Authentic hand-painted scale texture",
      "Collector display posture (Length: 32cm)",
    ],
    options: ["Forest Green", "Desert Brown"],
    inStock: true,
  },
  {
    id: "no8-004",
    slug: "jumbo-pink-ribbon-teddy-bear",
    name: "Jumbo Pastel Ribbon Teddy Bear",
    category: "toys-collectibles",
    price: 4950,
    image: img("photo-1559454403-b8fb88521f11"),
    gallery: [
      img("photo-1559454403-b8fb88521f11"),
      img("photo-1558877385-81a1c7e67d72"),
    ],
    badge: "Bestseller",
    rating: 4.9,
    reviews: 178,
    description:
      "Ultra-plush cuddly oversized teddy bear with an elegant satin bow ribbon. Hypoallergenic, cloud-soft micro-fleece fabric designed for comforting hugs and memorable birthday gifts.",
    features: [
      "Silky cloud-soft plush fleece",
      "Hypoallergenic polyfill stuffing",
      "Satin bow accent",
      "Height: 50cm",
    ],
    options: ["Pastel Pink", "Classic Cream", "Warm Honey"],
    inStock: true,
  },

  // ── Corner 02: Bags & Accessories ──────────────────────────────────────
  {
    id: "no8-005",
    slug: "quilted-crossbody-chain-bag",
    name: "Quilted Pastel Crossbody Chain Bag",
    category: "bags-accessories",
    price: 4650,
    compareAtPrice: 5800,
    image: img("photo-1584917865442-de89df76afd3"),
    gallery: [
      img("photo-1584917865442-de89df76afd3"),
      img("photo-1591561954557-26941169b49e"),
    ],
    badge: "Sale",
    rating: 4.8,
    reviews: 95,
    description:
      "Chic quilted vegan leather crossbody bag with polished gold-tone turn-lock clasp and woven chain shoulder strap. Sized perfectly for smartphone, keys, lipstick, and daily cards.",
    features: [
      "Diamond quilt vegan leather",
      "Gold-tone hardware & twist lock",
      "Woven chain crossbody strap",
      "Interior zip & slip compartments",
    ],
    options: ["Blush Pink", "Midnight Black", "Alabaster White"],
    inStock: true,
  },
  {
    id: "no8-006",
    slug: "structured-bucket-bag",
    name: "Two-Tone Structured Bucket Bag",
    category: "bags-accessories",
    price: 5800,
    image: img("photo-1548036328-c9fa89d128fa"),
    gallery: [
      img("photo-1548036328-c9fa89d128fa"),
      img("photo-1584917865442-de89df76afd3"),
    ],
    badge: "New",
    rating: 4.7,
    reviews: 48,
    description:
      "Architectural bucket silhouette in rich forest green and cognac brown trim. Features comfortable top carry handle, detachable shoulder strap, and drawstring cinch closure.",
    features: [
      "Structured silhouette with flat base",
      "Dual carry: top handle or crossbody",
      "Gold padlock decorative charm",
      "Spacious drawstring main compartment",
    ],
    options: ["Emerald & Tan", "Mocha & Cream"],
    inStock: true,
  },
  {
    id: "no8-007",
    slug: "slouchy-hobo-shoulder-tote",
    name: "Slouchy Vegan Leather Hobo Tote",
    category: "bags-accessories",
    price: 6400,
    image: img("photo-1590874103328-eac38a683ce7"),
    gallery: [
      img("photo-1590874103328-eac38a683ce7"),
      img("photo-1548036328-c9fa89d128fa"),
    ],
    rating: 4.6,
    reviews: 72,
    description:
      "Supple pebble-grain vegan leather hobo bag designed for effortless everyday wear. Generously sized to fit books, tablet, umbrella, and beauty essentials.",
    features: [
      "Ultra-soft pebble vegan leather",
      "Comfortable wide shoulder strap",
      "Magnetic snap closure",
      "Includes matching zip organizer pouch",
    ],
    options: ["Taupe", "Caramel", "Black"],
    inStock: true,
  },
  {
    id: "no8-008",
    slug: "mens-silk-necktie-gift-box",
    name: "Men's Jacquard Silk Tie & Cufflink Set",
    category: "bags-accessories",
    price: 3950,
    compareAtPrice: 4800,
    image: img("photo-1589756823695-278bc923f962"),
    gallery: [
      img("photo-1589756823695-278bc923f962"),
      img("photo-1598033129183-c4f50c736f10"),
    ],
    badge: "Sale",
    rating: 4.9,
    reviews: 128,
    description:
      "Complete formal accessories gift set including a high-density jacquard woven silk necktie, matching pocket square, polished silver-tone cufflinks, and tie clip in a presentation gift box.",
    features: [
      "100% woven jacquard silk blend",
      "Matching pocket square & cufflinks",
      "Includes brass tie slide clip",
      "Delivered in premium gift presentation box",
    ],
    options: ["Classic Navy Stripe", "Royal Burgundy Pattern", "Charcoal Geometric"],
    inStock: true,
  },

  // ── Corner 03: Beauty & Hair ───────────────────────────────────────────
  {
    id: "no8-009",
    slug: "velvet-padded-statement-headband",
    name: "Velvet Padded Statement Headband",
    category: "beauty-accessories",
    price: 1850,
    image: img("photo-1606760227091-3dd870d97f1d"),
    gallery: [
      img("photo-1606760227091-3dd870d97f1d"),
      img("photo-1522337360788-8b13dee7a37e"),
    ],
    badge: "Bestseller",
    rating: 4.8,
    reviews: 142,
    description:
      "Elevated padded crown headband wrapped in plush jewel-tone velvet. Padded for zero-pinch, all-day comfort, adding instant polish to casual outfits or celebratory events.",
    features: [
      "Padded comfort arch with non-pinch tips",
      "Rich lustrous velvet finish",
      "Lightweight ergonomic base",
      "Suitable for all hair textures",
    ],
    options: ["Emerald Velvet", "Houndstooth Chic", "Champagne Pearl", "Classic Black"],
    inStock: true,
  },
  {
    id: "no8-010",
    slug: "pastel-satin-scrunchie-pack",
    name: "Pastel Satin Scrunchie 5-Pack",
    category: "beauty-accessories",
    price: 1450,
    image: img("photo-1522337360788-8b13dee7a37e"),
    gallery: [
      img("photo-1522337360788-8b13dee7a37e"),
      img("photo-1606760227091-3dd870d97f1d"),
    ],
    rating: 4.9,
    reviews: 210,
    description:
      "Set of 5 buttery-soft silk-feel satin scrunchies designed to prevent hair breakage, friction frizz, and ponytail creasing. Gentle on hair for daytime styles or overnight sleep.",
    features: [
      "Ultra-smooth snag-free satin",
      "High-elastic durable inner core",
      "Prevents hair creasing and split ends",
      "5 complementary pastel shades",
    ],
    options: ["Blush & Nude Mix", "Ocean Blue & Mint Mix"],
    inStock: true,
  },
  {
    id: "no8-011",
    slug: "french-resin-claw-clip-duo",
    name: "French Resin Claw Clip Duo",
    category: "beauty-accessories",
    price: 1650,
    image: img("photo-1606760227091-3dd870d97f1d"),
    gallery: [
      img("photo-1606760227091-3dd870d97f1d"),
      img("photo-1522337360788-8b13dee7a37e"),
    ],
    rating: 4.7,
    reviews: 88,
    description:
      "Pair of durable French resin hair claws featuring interlocking teeth and strong steel springs that secure both fine and thick hair comfortably throughout the day.",
    features: [
      "Shatter-resistant cellulose acetate",
      "Strong steel tension spring",
      "Non-slip rounded inner teeth",
      "Set includes 2 coordinating styles",
    ],
    options: ["Tortoise Shell & Amber", "Pearl White & Rose Marble"],
    inStock: true,
  },
  {
    id: "no8-012",
    slug: "rose-gold-makeup-brush-kit",
    name: "Rose Gold Pro Makeup Brush Kit",
    category: "beauty-accessories",
    price: 6800,
    compareAtPrice: 8500,
    image: img("photo-1596462502278-27bfdc403348"),
    gallery: [
      img("photo-1596462502278-27bfdc403348"),
      img("photo-1512496015851-a90fb38ba796"),
    ],
    badge: "Sale",
    rating: 4.9,
    reviews: 189,
    description:
      "An 8-piece ultra-soft synthetic vegan brush collection with rose gold ferrules. Ideal for flawless blending of liquids, creams, and powders without shedding.",
    features: [
      "Ultra-soft cruelty-free vegan bristles",
      "Reinforced rose gold aluminum ferrules",
      "Ergonomic matte white wooden handles",
      "Includes protective cylinder travel case",
    ],
    options: ["Rose Gold & Pearl", "Classic Black & Gold"],
    inStock: true,
  },

  // ── Corner 04: Home Decor & Living ─────────────────────────────────────
  {
    id: "no8-013",
    slug: "artisan-patterned-giraffe-statue",
    name: "Artisan Patterned Giraffe Sculpture",
    category: "home-decor",
    price: 8900,
    compareAtPrice: 11000,
    image: img("photo-1579783900882-c0d3dad7b119"),
    gallery: [
      img("photo-1579783900882-c0d3dad7b119"),
      img("photo-1582562124811-c09040d0a901"),
    ],
    badge: "Limited",
    rating: 5.0,
    reviews: 34,
    description:
      "Contemporary abstract giraffe art sculpture with vibrant cobalt blue, yellow, and emerald dripped lacquer pattern. A conversation-starting statement piece that brings vivid artistic energy to any space.",
    features: [
      "High-grade cast resin sculpture",
      "High-gloss lacquered art finish",
      "Weighted base with velvet table protector",
      "Height: 38cm",
    ],
    options: ["Abstract Blue & Yellow", "Monochrome Splash"],
    inStock: true,
  },
  {
    id: "no8-014",
    slug: "contemporary-horse-centerpiece",
    name: "Contemporary Stylized Horse Centerpiece",
    category: "home-decor",
    price: 7500,
    image: img("photo-1582562124811-c09040d0a901"),
    gallery: [
      img("photo-1582562124811-c09040d0a901"),
      img("photo-1579783900882-c0d3dad7b119"),
    ],
    badge: "New",
    rating: 4.8,
    reviews: 29,
    description:
      "Dynamic stylized horse sculpture capturing elegance and momentum in modern artistic colors. Finished with smooth contours that elevate console tables, book shelves, and mantels.",
    features: [
      "Artisan hand-finished resin",
      "Vibrant modern colorway",
      "Sleek aerodynamic curves",
      "Felt-padded base to prevent scratches",
    ],
    options: ["Cobalt & Amber", "Silver Chrome"],
    inStock: true,
  },
  {
    id: "no8-015",
    slug: "romantic-bicycle-couple-figurine",
    name: "Romantic Bicycle Couple Keepsake Figurine",
    category: "home-decor",
    price: 3250,
    image: img("photo-1513519245088-0e12902e5a38"),
    gallery: [
      img("photo-1513519245088-0e12902e5a38"),
      img("photo-1582562124811-c09040d0a901"),
    ],
    rating: 4.9,
    reviews: 67,
    description:
      "Sweet nostalgic keepsake figurine depicting a loving couple riding a vintage bicycle with floral basket. Hand-painted in soft pastel tones, ideal for gifts, display cabinets, and living room shelves.",
    features: [
      "Fine detailed hand-painted resin",
      "Wire-spoke vintage bicycle details",
      "Delicate pastel glaze finish",
      "Perfect anniversary or housewarming gift",
    ],
    options: ["Pastel Pink & Blue", "Ivory & Sage"],
    inStock: true,
  },
  {
    id: "no8-016",
    slug: "faux-eucalyptus-ceramic-planter",
    name: "Faux Eucalyptus in Ribbed Ceramic Pot",
    category: "home-decor",
    price: 2650,
    image: img("photo-1485955900006-10f4d324d411"),
    gallery: [
      img("photo-1485955900006-10f4d324d411"),
      img("photo-1509423350716-97f9360b4e09"),
    ],
    badge: "Bestseller",
    rating: 4.7,
    reviews: 92,
    description:
      "Lush hyper-realistic potted eucalyptus foliage nestled in a textured off-white ceramic pot. Brings instant botanical warmth to bathrooms, desks, and side tables without any maintenance.",
    features: [
      "Real-touch hyper-realistic leaves",
      "Heavyweight ribbed ceramic planter",
      "Natural faux soil surface",
      "Zero watering or sunlight required",
    ],
    options: ["Silver Dollar Eucalyptus", "Boxwood Topiary", "Fiddle Leaf"],
    inStock: true,
  },

  // ── Corner 05: Ceramics & Tableware ────────────────────────────────────
  {
    id: "no8-017",
    slug: "heart-eyes-emoji-coffee-mug",
    name: "Heart-Eyes Emoji Ceramic Coffee Mug",
    category: "ceramics-tableware",
    price: 1250,
    image: img("photo-1514432324607-a09d9b4aefdd"),
    gallery: [
      img("photo-1514432324607-a09d9b4aefdd"),
      img("photo-1577937927133-66ef06acdf18"),
    ],
    badge: "Bestseller",
    rating: 4.9,
    reviews: 165,
    description:
      "Cheerful 350ml ceramic mug with glossy vibrant emoji face print and comfortable wide grip handle. Microwave and dishwasher safe, guaranteed to brighten your morning tea or coffee routine.",
    features: [
      "High-temperature fired stoneware",
      "Fade-resistant emoji graphics",
      "Comfortable ergonomic C-handle",
      "Microwave & dishwasher safe (350ml)",
    ],
    options: ["Heart Eyes", "Wink Smile", "Laugh Cry", "Cool Sunglasses"],
    inStock: true,
  },
  {
    id: "no8-018",
    slug: "gold-rim-bone-china-teacup-set",
    name: "Gold-Rim Bone China Teacup & Saucer Set",
    category: "ceramics-tableware",
    price: 3850,
    compareAtPrice: 4500,
    image: img("photo-1577937927133-66ef06acdf18"),
    gallery: [
      img("photo-1577937927133-66ef06acdf18"),
      img("photo-1514432324607-a09d9b4aefdd"),
    ],
    badge: "Sale",
    rating: 4.8,
    reviews: 76,
    description:
      "Classic British tea service cup and embossed matching saucer in lightweight translucent bone china. Finished with hand-painted 24k gold luster rim for refined afternoon teas.",
    features: [
      "Fine translucent bone china",
      "Hand-painted metallic gold rim",
      "Fluted pedestal cup with saucer",
      "Gift box packaging included",
    ],
    options: ["Pure White & Gold", "Pastel Floral & Gold"],
    inStock: true,
  },
  {
    id: "no8-019",
    slug: "royalty-crown-script-mug",
    name: "Royalty Crown Gold Script Mug",
    category: "ceramics-tableware",
    price: 1650,
    image: img("photo-1614735241165-6756e1df61ab"),
    gallery: [
      img("photo-1614735241165-6756e1df61ab"),
      img("photo-1514432324607-a09d9b4aefdd"),
    ],
    badge: "New",
    rating: 4.7,
    reviews: 58,
    description:
      "Modern matte porcelain mug with embossed golden crown motif and elegant calligraphic script. Includes matching gold stirring spoon and ceramic coaster lid for an elevated gift.",
    features: [
      "Matte exterior with gloss glaze interior",
      "Metallic gold foil crown script",
      "Includes gold spoon and fitted ceramic lid",
      "Capacity: 400ml",
    ],
    options: ["King (Matte Black)", "Queen (Matte White)", "Prince (Navy)"],
    inStock: true,
  },
  {
    id: "no8-020",
    slug: "minimalist-ceramic-dinnerware-set",
    name: "Glazed Ceramic Tableware Dinner Set",
    category: "ceramics-tableware",
    price: 5200,
    image: img("photo-1536939459926-301728717817"),
    gallery: [
      img("photo-1536939459926-301728717817"),
      img("photo-1577937927133-66ef06acdf18"),
    ],
    rating: 4.8,
    reviews: 41,
    description:
      "A 4-piece artisan glazed ceramic dining set including dinner plate, side plate, noodle bowl, and tumbler in a clean neutral finish with raw stoneware rim.",
    features: [
      "Durable chip-resistant stoneware",
      "Organic hand-glazed texture",
      "Dishwasher and oven safe up to 220°C",
      "Stackable space-saving design",
    ],
    options: ["Off-White Satin", "Speckled Sand", "Slate Charcoal"],
    inStock: true,
  },
]

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug)
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug)
}

export function getProductsByCategory(slug: string) {
  return products.filter((product) => product.category === slug)
}

export function getFeaturedProducts(count = 8) {
  return products.slice(0, count)
}
