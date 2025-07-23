exports.getPing = (req, res) => {
  res.status(200).json({ status: "success", message: "pong" });
};
