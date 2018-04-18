export default function (field, direction, whitelist) {
  // Only allow sorting by whitelisted fields
  if (!whitelist.includes(field)) {
    return {};
  }

  return {
    // Sequelize will escape the field and validate the direction against valid direction params
    order: [[field, direction]],
  };
}
