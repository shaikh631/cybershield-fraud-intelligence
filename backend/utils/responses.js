export function ok(res, data = {}, status = 200) {
  return res.status(status).json({ success: true, data });
}

export function message(res, text, status = 200) {
  return res.status(status).json({ success: true, message: text });
}

export function fail(res, text, status = 500, details) {
  const body = { success: false, message: text };
  if (details) body.details = details;
  return res.status(status).json(body);
}
