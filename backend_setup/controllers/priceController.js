const calculatePrice = require("../utils/calculatePrice");

exports.getPrice = async (req, res) => {
  const { productId } = req.params;

  const result = await calculatePrice(productId);
  if (!result) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(result);
};
