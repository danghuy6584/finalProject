import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
        // Check if the item is already in the cart
        const existingItem = state.find(item => item.id === action.payload.id);
  
        if (existingItem) {
          // If the item is already in the cart, increment its quantity
          existingItem.quantity += 1;
        } else {
          // If the item is not in the cart, add it with a quantity of 1
          state.push({ ...action.payload, quantity: 1 });
        }
      },

      
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;