const dayjs = require("dayjs");
const { inventory, demand_metrics, competitor_prices, seasonal_factors } = require("../data/data");

function calculatePrice(productId) {
  const inv = inventory.find((p) => p.productId === productId);
  const demand = demand_metrics.find((p) => p.productId === productId);
  const comp = competitor_prices.find((p) => p.productId === productId);
  const seasonal = seasonal_factors[0];

  if (!inv || !demand || !comp) return null;

  const base = inv.basePrice;
  let price = base;
  const factors = [];

  // Inventory logic
  if (inv.currentStock < inv.reorderPoint) {
    const adj = base * 0.06;
    price += adj;
    factors.push({
      name: "inventory",
      adjustment: +adj.toFixed(2),
      explanation: `Low stock (${inv.currentStock} units, below reorder point)`,
    });
  } else if (inv.currentStock > inv.restockLevel) {
    const adj = base * -0.03;
    price += adj;
    factors.push({
      name: "inventory",
      adjustment: +adj.toFixed(2),
      explanation: `High stock (${inv.currentStock} units, above restock level)`,
    });
  }

  // Demand logic
  const demandScore = demand.views * 0.01 + demand.cartAdditions * 0.2 + demand.purchases * 1;
  if (demandScore > 40) {
    const adj = base * 0.04;
    price += adj;
    factors.push({
      name: "demand",
      adjustment: +adj.toFixed(2),
      explanation: "High demand based on engagement",
    });
  } else if (demandScore < 15) {
    const adj = base * -0.02;
    price += adj;
    factors.push({
      name: "demand",
      adjustment: +adj.toFixed(2),
      explanation: "Low demand",
    });
  }

  // Competition logic
  const avgComp = comp.competitorPrices.reduce((sum, c) => sum + c.price, 0) / comp.competitorPrices.length;
  const diff = price - avgComp;

  if (Math.abs(diff / avgComp) > 0.1) {
    const adj = -diff * 0.3;
    price += adj;
    factors.push({
      name: "competition",
      adjustment: +adj.toFixed(2),
      explanation: `Adjusted to stay within ±10% of avg competitor (${avgComp.toFixed(2)})`,
    });
  }

  // Seasonal logic
  const category = seasonal.categories[productId];
  const season = seasonal.currentSeason;
  const multiplier = seasonal.seasonalAdjustments[category][season];
  const seasonalAdj = base * (multiplier - 1);
  price += seasonalAdj;
  factors.push({
    name: "seasonal",
    adjustment: +seasonalAdj.toFixed(2),
    explanation: `${season} adjustment for ${category}`,
  });

  // Time decay logic
  const daysAgo = dayjs().diff(dayjs(demand.lastPurchased), "day");
  if (daysAgo > 30) {
    const adj = base * -0.02;
    price += adj;
    factors.push({
      name: "timeDecay",
      adjustment: +adj.toFixed(2),
      explanation: `Low recent activity (last purchase ${daysAgo} days ago)`,
    });
  }

  if (price > inv.maxPrice) {
    const diff = inv.maxPrice - price;
    price = inv.maxPrice;
    factors.push({
      name: "maxPriceCap",
      adjustment: +diff.toFixed(2),
      explanation: "Price capped at maximum allowed",
    });
  } else if (price < inv.minPrice) {
    const diff = inv.minPrice - price;
    price = inv.minPrice;
    factors.push({
      name: "minPriceCap",
      adjustment: +diff.toFixed(2),
      explanation: "Price raised to meet minimum allowed",
    });
  }

  return {
    productId: inv.productId,
    name: inv.name,
    basePrice: inv.basePrice,
    optimizedPrice: +price.toFixed(2),
    factors,
  };
}

module.exports = calculatePrice;
