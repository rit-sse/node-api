export default function (req, res, next) {
  // If there is no 'orderBy', unset any direction
  if (!req.query.orderBy) {
    req.query.direction = undefined;
  } else {
    req.query.direction = req.query.direction || 'ASC'; // Sort by ascending by default
  }
  next();
}
