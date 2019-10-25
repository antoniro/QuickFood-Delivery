import React from "react";
import {
  Platform,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Dimensions
} from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Left,
  Right,
  Button,
  Thumbnail
} from "native-base";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer, withNavigation } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

class CartItemList extends React.Component {
  renderCartItemList = props => {
    //console.log(menuItems);
    //console.log(restaurantImageSrc);
    //console.log(props.cartItems)
    return props.cartItems.map((info, index) => {
      console.log(info.item.id);
      return (
        <CardItem key={index} bordered>
          <Body>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center"
              }}
            >
              <Button
                danger
                small
                style={{ marginRight: 20 }}
                onPress={() =>
                  this.props.onPress(
                    info.item,
                    info.restaurant,
                    "REMOVE_FROM_CART"
                  )
                }
              >
                <Text
                  style={{
                    paddingHorizontal: 10,
                    color: "white",
                    fontWeight: "bold"
                  }}
                >
                  X
                </Text>
              </Button>
              <Thumbnail source={info.restaurant.imageSrc} />
              <View style={{ flex: 1, marginHorizontal: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {info.restaurant.category} {index + 1}
                </Text>
                <Text style={{ color: "rgb(102, 102, 102)" }}>
                  {info.item.description}
                </Text>
                <Text style={{ color: "rgb(102, 102, 102)" }}>
                  ${info.item.price}
                </Text>
              </View>
              <View style={{ marginRight: 20 }}>
                <Button
                  small
                  light
                  style={{ paddingHorizontal: 10 }}
                  onPress={() =>
                    this.props.onPress(
                      info.item,
                      info.restaurant,
                      "INCREASE_QUANTITY"
                    )
                  }
                >
                  <Text>+</Text>
                </Button>
                <Text
                  style={{
                    textAlign: "center",
                    paddingVertical: 6,
                    fontWeight: "bold"
                  }}
                >
                  {console.log(info.item)}{info.item.quantity}
                </Text>
                <Button small light style={{ paddingHorizontal: 10 }} onPress={() =>
                    this.props.onPress(
                      info.item,
                      info.restaurant,
                      "DECREASE_QUANTITY"
                    )
                  }>
                  <Text>-</Text>
                </Button>
              </View>
              <View style={{ marginLeft: 0, marginRight: 0, width:50, flexWrap:"nowrap" }}>
                <Text style={{ fontWeight: "bold" }}>
                  ${(info.item.price * info.item.quantity).toFixed(2)}
                </Text>
              </View>
            </View>
          </Body>
        </CardItem>
      );
    });
  };

  render() {
    return <Card>{this.renderCartItemList(this.props)}</Card>;
  }
}

export default CartItemList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
