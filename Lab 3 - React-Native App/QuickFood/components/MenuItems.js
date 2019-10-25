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

class MenuItems extends React.Component {
  renderMenuItems = props => {
    //console.log(menuItems);
    //console.log(restaurantImageSrc);
    return props.menuItems.map((item, index) => {
      return (
        <CardItem key={index} bordered>
            <Body>
            <View style={{flexDirection:"row", flexWrap:"wrap", alignItems:"center"}}>
            <Thumbnail source={props.restaurantItem.imageSrc} />
              <View style={{flex:1, marginHorizontal:20}}>
                <Text style={{fontSize:16, fontWeight:"bold"}}>{props.restaurantItem.category} {index + 1}</Text>
                <Text style={{color:'rgb(102, 102, 102)'}}>{item.description}</Text>
              </View>
              <View style={{marginLeft:0, marginRight:40}}>
                <Text>${item.price}</Text>
              </View>
              <Button primary onPress={() => this.props.onPress(item, props.restaurantItem)}>
                <Text
                  style={{
                    paddingHorizontal: 10,
                    fontWeight: "bold",
                    color: "#FFFFFF"
                  }}
                >
                  {" "}
                  Add{" "}
                </Text>
              </Button>
            
            </View>
            </Body>
            
        </CardItem>
      );
    });
  };

  render() {
    return <Card>{this.renderMenuItems(this.props)}</Card>;
  }
}

export default MenuItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
});
