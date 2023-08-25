export function updateCartInfo(
  state: any,
  cartInfo: any,
  item: any,
  cartId?: string
) {
  state.products = cartInfo.lines.edges.map((line) => {
    return {
      line: line,
      item: {
        handle: item.handle,
        id: item.id,
        title: item.title,
        variantQuantity: item.variantQuantity,
      },
    };
  });

  if (cartId) {
    state.cartId = cartInfo.id;
  }

  state.totalQuantity = cartInfo.totalQuantity;
  state.chargeAmount = cartInfo.cost.checkoutChargeAmount.amount;
}
