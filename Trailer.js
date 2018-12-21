import React from "react";
import { View, Text, Image} from "react-native";


class Trailer extends React.Component {
  static navigationOptions = {
    title: 'Trailer Detail',
  };


  render() {
    const { navigation } = this.props;
    const trailer = navigation.getParam('trailer', 'Nothing');
    const poster = trailer.poster;

    return (
          <View style={{ width: 100, flexDirection: "row" }}>
            <View>
              <Text>{trailer.title}</Text>
              <Image
                  style={{ width: 300, height: 200 }}
                  source={{uri: poster}} />
              <Text>{trailer.genre}</Text>
              <Text>{trailer.directors}</Text>
              <Text>{trailer.actors}</Text>
            </View>
          </View>
    );
  }
}

export default Trailer;