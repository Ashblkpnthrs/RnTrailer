import React, { Component } from 'react';
import { FlatList, Image, View, Text, TouchableOpacity } from "react-native";
import { AsyncStorage, AppState, NetInfo } from "react-native";


class Trailers extends React.Component {
    static navigationOptions = {
        title: 'SuperCineBattle',
    };
    constructor(props) {
        super(props);
        this.state = {
            trailers: [],
            appState: AppState.currentState
        };
        this.appState ===true;
    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
        NetInfo.isConnected.fetch().done(
            (isConnected) => { this.setState({ appState: isConnected }); }
        );
    }

    componentWillMount() {
        this.getMoviesFromApi();
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    }

    handleConnectionChange = (isConnected) => {
        console.log('First change, type: ' + isConnected.type + ', effectiveType: ' + isConnected.effectiveType);
        this.setState({ appState: isConnected });
    
    }

    goToTrailer(item) {
        this.props.navigation.navigate('Trailer', { trailer: item });
    }

    getMoviesFromApi() {
        if (this.appState.state === true ) {
            return fetch('http://192.168.10.24:8080/trailers')
            .then((response) => response.json())
            .then((responseJson) => {
                try {
                    AsyncStorage.setItem('@LocalStorage:key', JSON.stringify(responseJson));
                } catch (error) {
                    // Error saving data
                }
                this.setState({ trailers: responseJson })
            })} else {
                try {
                     
                    if (AsyncStorage.getItem('@LocalStorage:key', JSON.parse(responseJson)) !== null) {
                      // We have data!!
                      this.setState({ trailers: responseJson })
                    }
                   } catch (error) {
                     // Error retrieving data
                   } 
            }    
    }

    render() {
        const { navigate } = this.props.navigation
        return (
            <>
                <Text>Current State Connection is : {this.state.appState}</Text>
                <FlatList
                    data={this.state.trailers}
                    keyExtractor={(item, index) => 'key' + index}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => this.goToTrailer(item)}>
                            <View style={{ width: 100, flexDirection: "row" }}>
                                <View>
                                    <Image
                                        style={{ width: 300, height: 200 }}
                                        source={{ uri: item.poster }} />
                                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>
                                            {item.title}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                />
            </>
        );
    }
}

export default Trailers;

