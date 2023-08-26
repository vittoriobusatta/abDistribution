import { ADD_TO_CART, REMOVE_TO_CART } from "@redux/constants/cart";
import {
  cancelOptimisticRemoveToCart,
  optimisticAddToCart,
  optimisticRemoveToCart,
} from "@redux/reducers/cart";
import { createAsyncThunk } from "@reduxjs/toolkit";
type CartActionFunction = (item: any) => Promise<any>;

export const genericCartAction = (
  type: string,
  actionFunction: CartActionFunction
) => {
  return createAsyncThunk(
    type,
    async (item: any, { dispatch, rejectWithValue }) => {
      // if (type === REMOVE_TO_CART) {
      //   dispatch(optimisticRemoveToCart(item));
      // }
      try {
        const result = await actionFunction(item);
        return {
          item,
          result,
        };
      } catch (err) {
        // if (type === REMOVE_TO_CART) {
        //   dispatch(cancelOptimisticRemoveToCart(item));
        // }
        return rejectWithValue(err.message);
      }
    }
  );
};

export function updateCartInfo(
  state: any,
  cartInfo: any,
  item: any,
  cartId?: string
) {
  state.products = cartInfo.lines.edges.map((line) => {
    return {
      line: line,
      item: item,
    };
  });

  if (cartId) {
    state.cartId = cartInfo.id;
  }

  state.totalQuantity = cartInfo.totalQuantity;
  state.chargeAmount = cartInfo.cost.checkoutChargeAmount.amount;
  state.checkoutUrl = cartInfo.checkoutUrl;
}

export function productExistsInCart(state, item) {
  return state.products.findIndex(
    (p) => p.item.merchandiseId === item.merchandiseId
  );
}

export function addItemToProducts(state, item) {
  const productIndex = productExistsInCart(state, item);

  if (productIndex > -1) {
    console.log("ajouter un produit existant");
    state.products[productIndex].item.variantQuantity += item.variantQuantity;
  } else {
    console.log("ajouter un nouveau produit");
    const newProduct = {
      line: null,
      item,
    };
    state.products.push(newProduct);
  }

  return state.products;
}


export function optimisticallyCreateCart(state, item) {
  const productIndex = productExistsInCart(state, item);

  if (productIndex > -1) {
    console.log("il y a un produit");
    return
    // state.products[productIndex].item.variantQuantity += item.variantQuantity;
  } else {
    console.log("il n'y a pas de produit");
    const newProduct = {
      line: null,
      item,
    };
    state.products.push(newProduct);
  }
}

// export function removeItemFromProducts(products, itemId) {
//   return products.filter((product) => product.item.id !== itemId);
// }


// export function optimisticallyAddToCart(state, item) {
//   const newProduct = {
//     line: null, // Car nous n'avons pas de vrai 'line' pour l'instant
//     item: {
//       handle: item.handle,
//       merchandiseId: item.merchandiseId,
//       title: item.title,
//       variantQuantity: item.variantQuantity,
//       totalVariantsQuantity: item.variantQuantity,
//     },
//   };

//   state.products.push(newProduct);
//   state.totalQuantity += item.variantQuantity;
//   // Vous pouvez aussi mettre à jour les autres propriétés du panier ici si nécessaire
// }

// function trulyUpdateCartInfo(state, cartInfo) {
//   state.products = cartInfo.lines.edges.map((line) => ({
//     line,
//     item: line.node.item, // Suppose que 'item' est dans 'line.node'
//   }));
//   state.totalQuantity = cartInfo.totalQuantity;
//   state.chargeAmount = cartInfo.cost.checkoutChargeAmount.amount;
//   state.checkoutUrl = cartInfo.checkoutUrl;
// }
