import React, {Component} from 'react';
import { FlatList, Keyboard, StyleSheet, View,TouchableOpacity,Alert } from 'react-native';
import { Header, Item, Input, Icon, Card, CardItem, Text, Body,Button } from 'native-base';
import BaseComponent from './BaseComponent';
import backgroundImage from '../../assets/star_war_1.jpg';
import Loader from './loader'
import { StackActions,NavigationActions } from 'react-navigation';
const resetActionlogin = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'LoginScreen' })],
});

export default class SearchScreen extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: props.username,
            isLoading: false,
            search: {
                disableSrearchBar: false,
                searchesPerMinute: 0
            },
            data: {
                planets: []
            },
            minPopulation: 0,
            maxPopulation: 0
        };

    }

    componentDidMount() {
        this.interval = setInterval(() => {
            console.log('Interval: updating state');
            const srearchBarWasDisabled = this.state.search.disableSrearchBar;
            this.updateNumberOfSearch(true, () => {
                if (srearchBarWasDisabled) {
                    const title = 'Search has been enabled :-)';
                    const message = 'You can make 15 consecutive searches in a minute.';
                    Alert.alert(title, message);
                }
            });
        }, 60000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    logoutHandler =  () => {
        this.props.navigation.dispatch(resetActionlogin);
    };

    searchPlanetOnChange = (searchStr) => {
        if (searchStr !== '') {
            if (this.state.username !== ('Luke Skywalker').toLowerCase()) {
                this.updateNumberOfSearch(false, () => {
                    if (this.state.search.disableSrearchBar) {
                        const title = 'Search limit exceeded!!!';
                        const message = 'You have made 15 searches in less than a minute, search will be enabled soon.';
                        Alert.alert(title, message);
                    }
                });
            }
            let url = `https://swapi.co/api/planets/?search=${searchStr}`;
            this.toggleIsLoadingState();
            this.fetchPlanetData(url).then((data) => {
                this.updateStateBasedOnSearchResult(data, true);
                this.toggleIsLoadingState();
            }).catch((error) => {
                console.log('Error:', error)
                this.toggleIsLoadingState();
            });
        } else {
            this.updateStateBasedOnSearchResult({next: '', results: []}, true);
        }
    }

    cardItemOnPressHandler = (item) => {
        this.props.navigation.navigate('DetailScreen',{item:item})
    }

    fetchPlanetData = (url) => {
        return fetch(url).then(response => {
            return response.json();
        }).then(responseJson => {
            console.log('Response: ', responseJson);
            return responseJson
        }).catch(error => console.log('Error fetching data:', error));
    }

    toggleIsLoadingState = () => {
        this.setState(previousState => {
            return {
                isLoading: !previousState.isLoading
            }
        });
    }

    updateNumberOfSearch = (overwrite, callback) => {
        this.setState(previousState => {
            return {
                search: {
                    disableSrearchBar: overwrite === false && previousState.search.searchesPerMinute + 1 === 15 ? true : false,
                    searchesPerMinute: overwrite === false ? previousState.search.searchesPerMinute + 1 : 0
                }
            }
        }, () => callback());
    }

    updateStateBasedOnSearchResult = (data, overwrite) => {
        this.setState(previousState => {
            const planets = this.getFilteredPlanets(previousState.data.planets , data.results, overwrite);
            const planetPopulations = this.getPopulation(planets);
            return {
                data: {
                    planets: planets
                },
                minPopulation: planetPopulations.length != 0 ? Math.min(...planetPopulations): 0,
                maxPopulation: planetPopulations.length != 0 ? Math.max(...planetPopulations): 0
            }
        });
    }

    getFilteredPlanets = (previousStatePlanetsData, planetsData, overwrite) => {
        let planets = planetsData;
        if (overwrite === false) {
            const allPlanets = previousStatePlanetsData.concat(planetsData);
            const planetNames = allPlanets.map(planet => planet.name);
            planets = allPlanets.filter((planet, index) => {
                return planetNames.indexOf(planet.name) === index;
            });
        }
        return planets;
    }

    getPopulation = (planets) => {
        return planets.map(planet => planet.population)
            .filter((stringPopulation) => stringPopulation !== 'unknown')
            .map((stringPopulation) => parseInt(stringPopulation));
    }

    getTextFontSize = (population) => {
        let minFontSize = 14;
        const maxFontSize = 50;
        let textFontSize = minFontSize;
        if(population !== 'unknown')
        {
            minFontSize = 17
            const numerator = (parseInt(population) - this.state.minPopulation) * (maxFontSize - minFontSize);
            const denominator = this.state.maxPopulation - this.state.minPopulation;
            textFontSize = Math.round(minFontSize + numerator / denominator);
        }
        return textFontSize;
    }
    nFormatter(num) {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
        }
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num;
    }

    render() {
        let content = null;
        if (this.state.isLoading) {
            content = (
                <Loader />
            );
        }
        else {
            content = (
                <FlatList
                    data={this.state.data.planets}
                    keyExtractor={item => item.name}
                    renderItem={({item}) => (
                        <Card>
                            <CardItem button onPress={() => this.cardItemOnPressHandler(item)}>
                                <Body>
                                <Text style={{fontSize: this.getTextFontSize(item.population)}}>
                                    {item.name}
                                </Text>
                                <Text >
                                    {"population: "+this.nFormatter(item.population)}
                                </Text>
                                </Body>
                            </CardItem>
                        </Card>
                    )}

                />
            );
        }

        return (
            <BaseComponent imageBackgroundSource={backgroundImage}>
                <TouchableOpacity onPress={()=>
                    Alert.alert(
                        'Log out',
                        'Do you want to logout?',
                        [
                            {text: 'Cancel', onPress: () => {return null}},
                            {text: 'Confirm', onPress: () => {
                                this.logoutHandler()
                            }},
                        ],
                        { cancelable: false }
                    )
                }>
                    <Text style={{margin: 14,fontWeight: 'bold',color: 'white',textAlign:'right'}}>Logout</Text>
                </TouchableOpacity>
                <Header transparent searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input
                            placeholder="Search" onChangeText={this.searchPlanetOnChange}
                            autoCapitalize='none'
                            autoCorrect={false}
                            disabled={this.state.search.disableSrearchBar}
                        />
                    </Item>

                </Header>

                <View style={this.state.isLoading ? styles.content : styles.flatListContainer}>
                    {content}
                </View>
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
    flatListContainer: {
        padding: 20
    },
    logout:{
        backgroundColor:"white",
        color:"white"
    }
});
