import React from 'react';
import { StyleSheet, Text, View ,AsyncStorage,Alert  } from 'react-native';
import {Content, Form, Item, Input, Label, Button} from 'native-base'
import BaseComponent from './BaseComponent'
import backgroundImage from '../../assets/login.jpg';
import SearchScreen from './search';
import Loader from './loader'
import { StackActions,NavigationActions } from 'react-navigation';
const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'SearchScreen' })],
});



export default class LoginScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            controls: {
                username: {
                    value: ''
                },
                password: {
                    value: ''
                }
            }
        };
    }

    loginHandler = () => {
        this.authenticate().then(authenticated => {
            this.toggleIsLoadingState();
            if (authenticated) {
                console.log(this.props.navigation);
                //this.props.navigation.navigate('SearchScreen')
                this.props.navigation.dispatch(resetAction);

            } else {
                const title = 'Unable to sign in';
                const message = 'The username or password that you typed is incorrect'
                Alert.alert(title, message);
            }
        }).catch((error) => {
            console.log('Error:', error);
            this.toggleIsLoadingState();
        });
    }
    authenticate = () => {
        this.toggleIsLoadingState();
        let authenticated = false;
        let username = this.state.controls.username.value;
        let password = this.state.controls.password.value;
        let url = `https://swapi.co/api/people/?search=${username}`;
        return fetch(url).then(response => {
            return response.json();
        }).then(responseJson => {
            console.log('Response: ', responseJson);
            if (responseJson.results) {
                let name = responseJson.results[0].name;
                let birthYear = responseJson.results[0].birth_year;
                authenticated = username.toLowerCase() === name.toLowerCase() && password === birthYear;
            }
            return authenticated;
        }).catch(error => console.log('Error fetching data:', error));
    }
    toggleIsLoadingState = () => {
        this.setState(previousState => {
            return {
                ...previousState,
                isLoading: !previousState.isLoading
            }
        });
    }
    updateInputState = (key, value) => {
        this.setState(previousState => {
            return {
                controls: {
                    ...previousState.controls,
                    [key]: {
                        ...previousState.controls[key],
                        value: value
                    }
                }
            }
        });
    }
    render() {
        let content = null;

        if (this.state.isLoading) {
            content = (
                <Loader />
            );
        }
        else{
            content = (
                <View>
                    <Form>
                        <Item floatingLabel last>
                            <Label style={{color:'#FFF5EE'}}>Username</Label>
                            <Input
                                style={styles.input}
                                value={this.state.controls.username.value}
                                autoCapitalize='none'
                                autoCorrect={false}
                                onChangeText={(text) => this.updateInputState('username', text)}
                            />
                        </Item>
                        <Item floatingLabel last>
                            <Label style={{color:'#FFF5EE'}}>Password</Label>

                            <Input
                                style={styles.input}
                                value={this.state.controls.password.value}
                                secureTextEntry
                                onChangeText={(text) => this.updateInputState('password', text)}
                            />
                        </Item>
                    </Form>
                    <View style={styles.buttonContainer}>
                        <Button transparent  onPress={this.loginHandler}>
                            <Text style={styles.text}>Sign In</Text>
                        </Button>
                    </View>
                </View>
            );
        }
        return (
            <BaseComponent imageBackgroundSource={backgroundImage}>
                <Content contentContainerStyle={styles.content}>
                    {content}
                </Content>
            </BaseComponent>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    input: {
        color : "white"
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',

    },
    text:{
        color:'white',
        fontWeight:'bold'
    }
});