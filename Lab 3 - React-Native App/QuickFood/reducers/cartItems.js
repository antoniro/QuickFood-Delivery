import { ToastAndroid } from "react-native";

const cartItems = (state = [], action) => {
    var i = -1;
  switch (action.type) {
    case "ADD_TO_CART":
      //console.log(state);
      i = state.findIndex(
        element =>
          element.item.id == action.payload.item.id &&
          element.restaurant.id == action.payload.restaurant.id
      );
      if (i == -1) {
        return [...state, action.payload];
      }
      ToastAndroid.show("Item aleady in Cart!", ToastAndroid.SHORT);
      return state;
    case "REMOVE_FROM_CART":
      return state.filter(
        cartItem =>
          cartItem.item.id !== action.payload.item.id ||
          cartItem.restaurant.id !== action.payload.restaurant.id
      );
    case "INCREASE_QUANTITY":
      i = state.findIndex(
        element =>
          element.item.id == action.payload.item.id &&
          element.restaurant.id == action.payload.restaurant.id
      );
      //console.log(i);
      if (i !== -1) {
          //console.log(state)
        state[i].item.quantity = state[i].item.quantity + 1;
        //console.log(state)
        return [...state];
      }
      return state;
    case "DECREASE_QUANTITY":
            i = state.findIndex(
                element =>
                  element.item.id == action.payload.item.id &&
                  element.restaurant.id == action.payload.restaurant.id
              );
              //console.log(i);
              if (i !== -1) {
                  //console.log(state)
                state[i].item.quantity = state[i].item.quantity <= 1 ? state[i].item.quantity : state[i].item.quantity - 1;
                //console.log(state)
                return [...state];
              }
              return state;
  }

  return state;
};

export default cartItems;
