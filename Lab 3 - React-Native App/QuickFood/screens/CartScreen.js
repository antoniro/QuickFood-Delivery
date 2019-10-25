import React from "react";
import { View, Text, StyleSheet, ScrollView, ToastAndroid } from "react-native";
import CartItemList from "../components/CartItemList";
import { connect } from "react-redux";
import { Button } from "native-base";
import { bold } from "ansi-colors";

class CartScreen extends React.Component {
  static navigationOptions = {
    headerTitle: "Cart"
  };
  render() {
    //console.log(this.props)

    return (
      <View>
        <ScrollView>
          {this.props.cartItems.length > 0 ? (
            <View>
              <CartItemList
                styles={{ flex: 1 }}
                cartItems={this.props.cartItems}
                onPress={this.props.itemChanged}
              />
              <Text style={{ textAlign: "center", paddingTop:20, fontSize:18, fontWeight:"bold" }}>
                Total: ${calculateCartTotal(this.props.cartItems)}
              </Text>
              <Button style={{margin:20}} block primary onPress={() => placeOrder()}>
                <Text
                  style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                >
                  Place Order
                </Text>
              </Button>
            </View>
          ) : (
            <Text style={{ textAlign: "center", margin: 20, fontSize: 16 }}>
              No items in your cart!
            </Text>
          )}
        </ScrollView>
      </View>
    );
  }
}

function calculateCartTotal(cartItems) {
  if (cartItems.length <= 0) {
    return 0;
  }

  var total = 0.0;
  for (let i = 0; i < cartItems.length; i++) {
    const element = cartItems[i];
    total += element.item.price * element.item.quantity;
  }

  return total.toFixed(2);
}

function placeOrder() {
  ToastAndroid.show("Your order was placed!", ToastAndroid.SHORT);
}

const mapStateToProps = state => {
  return {
    cartItems: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    itemChanged: (menuItem, restaurantItem, event) => {
      var info = { item: menuItem, restaurant: restaurantItem };
      switch (event) {
        case "REMOVE_FROM_CART":
          dispatch({ type: "REMOVE_FROM_CART", payload: info });
          break;
        case "INCREASE_QUANTITY":
                dispatch({ type: "INCREASE_QUANTITY", payload: info });
                break;
          break;
        case "DECREASE_QUANTITY":
                dispatch({ type: "DECREASE_QUANTITY", payload: info });
          break;
        default:
          break;
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartScreen);
