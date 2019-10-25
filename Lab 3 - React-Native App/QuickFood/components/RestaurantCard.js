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
import { Container, Header, Content, Card, CardItem, Body } from "native-base";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, withNavigation } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

var MAX_CARD_WIDTH = Dimensions.get("window").width - 35;

class RestaurantCard extends React.Component {
  render() {
    //console.log(this.props.restaurantItem);
    return (
      <View style={{ margin: 5 }}>
        <Card style={{ maxWidth: MAX_CARD_WIDTH }}>
          <CardItem button onPress={() => {this.props.navigation.navigate("Menu", this.props.restaurantItem)}} cardBody>
            <View style={{padding:0, margin:0}}>
            <CardItem cardBody>
              <Image
                style={styles.image}
                 source={this.props.restaurantItem.imageSrc}
              />
            </CardItem>
            <CardItem style={{ padding: 10 }}>
              <View>
                <Text style={styles.restaurantName}>{this.props.restaurantItem.name}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center"
                  }}
                >
                  <Text style={styles.restaurantDetailsText}>
                    {this.props.restaurantItem.priceRange}
                  </Text>
                  <Text style={styles.restaurantDetailsSeparation}>
                    {"\u2B24"}
                  </Text>
                  <Text style={styles.restaurantDetailsText}>{this.props.restaurantItem.category}</Text>
                  <Text style={styles.restaurantDetailsSeparation}>
                    {"\u2B24"}
                  </Text>
                  <Text style={styles.restaurantDetailsText}>
                    {this.props.restaurantItem.rating + "  "}
                    <Image source={require("../assets/star.png")} />
                  </Text>
                  <Text style={styles.restaurantDetailsSeparation}>
                    {"\u2B24"}
                  </Text>
                  <Text style={styles.restaurantDetailsText}>
                    {this.props.restaurantItem.address}
                  </Text>
                </View>
              </View>
            </CardItem>
            </View>
            
          </CardItem>
        </Card>
      </View>
    );
  }
}

export default withNavigation(RestaurantCard);

const styles = StyleSheet.create({
  restaurantName: {
    fontSize: 18
  },
  restaurantDetailsText: {
    paddingBottom: 5,
    paddingRight: 15,
    fontSize: 14
  },
  restaurantDetailsSeparation: {
    paddingBottom: 5,
    paddingRight: 15,
    fontSize: 10
  },
  restaurantCard: {},
  container: {
    width: 320,
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 10,
    shadowColor: "rgba(0,0,0,0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5
  },
  image: {
    height: 200,
    width: null,
    flex: 1
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  description: {
    color: "#999",
    marginTop: 5
  },
  iconContainer: {
    position: "absolute",
    right: 20,
    bottom: 15
  }
});
