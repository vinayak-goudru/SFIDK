// Vercel Serverless Function: /api/health
module.exports = (req, res) => {
  res.json({ status: "ok", message: "SFI DK Backend Server Running" });
};

