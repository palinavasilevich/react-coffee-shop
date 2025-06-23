export function getTotalPrice(items) {
  const totalPrice = items.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  return totalPrice;
}
