export function requireFields(fields) {
  return (req, res, next) => {
    const missing = fields.filter((field) => {
      const value = req.body?.[field];
      return value === undefined || value === null || String(value).trim() === "";
    });
    if (missing.length) {
      return res.status(400).json({
        success: false,
        message: `Missing required field(s): ${missing.join(", ")}`,
      });
    }
    return next();
  };
}

export function limitBodyText(maxLength = 12000) {
  return (req, res, next) => {
    const serialized = JSON.stringify(req.body || {});
    if (serialized.length > maxLength) {
      return res.status(413).json({
        success: false,
        message: `Request body is too large. Limit is ${maxLength} characters.`,
      });
    }
    return next();
  };
}
