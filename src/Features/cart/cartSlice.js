import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],

  //   cart: [
  //     {
  //       pizzaId: 12,
  //       name: "Mediterranean",
  //       quantity: 2,
  //       unitPrice: 16,
  //       totalPrice: 32,
  //     },
  //   ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      //first find the item
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      //increase the quantity
      item.quantity += 1;
      //calculate the total price
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      //first find the item
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      //decrease the quantity
      item.quantity -= 1;
      //calculate the total price
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) {
        //another way of refering to  the deleteItem reducer
        cartSlice.caseReducers.deleteItem(state, action);
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  clearCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  deleteItem,
} = cartSlice.actions;

export default cartSlice.reducer;
export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, currentItem) => sum + currentItem.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, currentItem) => sum + currentItem.totalPrice, 0);

// export function getCurrentQuantityById(id, state) {
//   return state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
// }

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;


