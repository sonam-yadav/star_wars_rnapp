import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import { Content, Card, Text } from "native-base";
import Loader from './loader'
import BaseComponent from './BaseComponent';
import DetailsCardItem from './DetailsCardItem/DetailsCardItem';


export default class DetailScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      data: {
        planet: this.props.navigation.state.params.item,
        residents: [],
      }
    }
  }

  componentDidMount() {
    this.fetchRelevantData();
  }

  fetchRelevantData = () => {
    const promiseArray = [];
    const residents = this.state.data.planet.residents;
    const urls = residents
      urls.map(url => {
      promiseArray.push(this.fetchData(url));
    });

    Promise.all(promiseArray).then((data) => {
      this.updateDataState(data);
      this.toggleIsLoadingState();
    }).catch(error => console.log('Error:', error));
  }

  fetchData = (url) => {
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
        ...previousState,
        isLoading: !previousState.isLoading
      }
    });
  }

  updateDataState = (data) => {
    const residents = data.filter((item) => {
      return item.url.includes('people');
    });
    this.setState(previousState => {
      return {
        data: {
          ...previousState.data,
          residents: residents
        }
      }
    });
  }
    goBack=()=>{
        this.props.navigation.navigate('SearchScreen')
    }

  render() {
      let content = null;

      if (this.state.isLoading) {
          content = (
              <Loader />
          );
      } else {
          content = (
              <Card>
                <DetailsCardItem
                    cardItemContentType='planet'
                    cardItemHeaderText='Planet Details'
                    cardItemContent={this.state.data.planet}
                    goBack={this.goBack}
                />
                <DetailsCardItem
                    cardItemContentType='person'
                    cardItemHeaderText={`Residents(${this.state.data.residents.length})`}
                    cardItemContent={this.state.data.residents}
                />
              </Card>
          );
      }


    return (
      <BaseComponent>
        <Content  padder contentContainerStyle={this.state.isLoading ? styles.content : {}}>
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
    justifyContent: 'center',
    paddingTop: 90
  }
});
