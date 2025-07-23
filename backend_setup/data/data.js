const inventory = [
  {
    productId: "prod001",
    name: "Wireless Headphones",
    basePrice: 89.99,
    minPrice: 69.99,
    maxPrice: 109.99,
    currentStock: 45,
    reorderPoint: 20,
    restockLevel: 100,
  },
  {
    productId: "prod002",
    name: "Bluetooth Speaker",
    basePrice: 59.99,
    minPrice: 49.99,
    maxPrice: 79.99,
    currentStock: 12,
    reorderPoint: 15,
    restockLevel: 50,
  },
  {
    productId: "prod003",
    name: "Smart Watch",
    basePrice: 199.99,
    minPrice: 179.99,
    maxPrice: 229.99,
    currentStock: 38,
    reorderPoint: 10,
    restockLevel: 40,
  },
  {
    productId: "prod004",
    name: "Fitness Tracker",
    basePrice: 79.99,
    minPrice: 64.99,
    maxPrice: 89.99,
    currentStock: 8,
    reorderPoint: 12,
    restockLevel: 30,
  },
  {
    productId: "prod005",
    name: "Laptop Sleeve",
    basePrice: 24.99,
    minPrice: 19.99,
    maxPrice: 29.99,
    currentStock: 65,
    reorderPoint: 25,
    restockLevel: 80,
  },
];

const demand_metrics = [
  {
    productId: "prod001",
    views: 450,
    cartAdditions: 120,
    purchases: 38,
    lastPurchased: "2025-04-23T16:00:00Z",
  },
  {
    productId: "prod002",
    views: 380,
    cartAdditions: 85,
    purchases: 10,
    lastPurchased: "2025-04-22T11:20:00Z",
  },
  {
    productId: "prod003",
    views: 520,
    cartAdditions: 95,
    purchases: 42,
    lastPurchased: "2025-04-24T09:15:00Z",
  },
  {
    productId: "prod004",
    views: 290,
    cartAdditions: 65,
    purchases: 15,
    lastPurchased: "2025-04-18T14:30:00Z",
  },
  {
    productId: "prod005",
    views: 180,
    cartAdditions: 30,
    purchases: 12,
    lastPurchased: "2025-04-20T12:45:00Z",
  },
];

const competitor_prices = [
  {
    productId: "prod001",
    competitorPrices: [
      { competitor: "CompA", price: 94.99 },
      { competitor: "CompB", price: 84.99 },
      { competitor: "CompC", price: 99.99 },
    ],
  },
  {
    productId: "prod002",
    competitorPrices: [
      { competitor: "CompA", price: 64.99 },
      { competitor: "CompB", price: 57.99 },
      { competitor: "CompC", price: 69.99 },
    ],
  },
  {
    productId: "prod003",
    competitorPrices: [
      { competitor: "CompA", price: 209.99 },
      { competitor: "CompB", price: 189.99 },
      { competitor: "CompC", price: 219.99 },
    ],
  },
  {
    productId: "prod004",
    competitorPrices: [
      { competitor: "CompA", price: 74.99 },
      { competitor: "CompB", price: 79.99 },
      { competitor: "CompC", price: 81.99 },
    ],
  },
  {
    productId: "prod005",
    competitorPrices: [
      { competitor: "CompA", price: 22.99 },
      { competitor: "CompB", price: 25.99 },
      { competitor: "CompC", price: 23.49 },
    ],
  },
];

const seasonal_factors = [
  {
    currentSeason: "spring",
    seasonalAdjustments: {
      electronics: { spring: 1.0, summer: 0.95, fall: 1.05, winter: 1.1 },
      wearables: { spring: 1.05, summer: 1.1, fall: 1.0, winter: 0.95 },
      accessories: { spring: 1.0, summer: 1.0, fall: 1.02, winter: 1.05 },
    },
    categories: {
      prod001: "electronics",
      prod002: "electronics",
      prod003: "wearables",
      prod004: "wearables",
      prod005: "accessories",
    },
  },
];

module.exports = { inventory, demand_metrics, competitor_prices, seasonal_factors };
