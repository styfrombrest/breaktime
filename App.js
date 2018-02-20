import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Button,
  Platform,
  StyleSheet,
  View,
  Vibration,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import Toolbar from './src/components/Toolbar';
import Text from './src/components/TextRegular';
import FormInput from './src/components/FormInput';

const PageContainer = styled.View`
  flex: 1;
  background-color: white;
`;

const ContentWrapper = styled.View`
  flex: 1;
`;

const ContentContainer = styled.View`
  flex: 1;
  flex-direction: column;
  padding-horizontal: 15;
  padding-vertical: 5;
`;

const isPortrait = () => {
  const { width, height } = Dimensions.get('window');
  return width > height;
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workInterval: 55,
      relaxInterval: 5,
      isPortrait: isPortrait(),
    };

    Dimensions.addEventListener('change', () => {
      this.setState({
        isPortrait: isPortrait(),
      });
    });
  }

  onPressVibrate = () => {
    Vibration.vibrate(25);
  };

  render() {
    const { isPortrait, workInterval, relaxInterval } = this.state;
    return (
      <PageContainer>
        <Toolbar />
        <ContentWrapper
          style={{ flexDirection: isPortrait ? 'row' : 'column' }}
        >
          <ContentContainer>
            <FormInput
              text="Working time, minutes:"
              placeholder="Enter working time..."
              value={workInterval}
              onChangeText={result => {
                this.setState({ workInterval: parseInt(result) });
              }}
            />

            <FormInput
              text="Relax time, minutes:"
              placeholder="Enter relax time..."
              onChangeText={result => {
                this.setState({ relaxInterval: parseInt(result) });
              }}
              value={relaxInterval}
            />

            <Button
              onPress={this.onPressVibrate}
              title="Start!"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
          </ContentContainer>
          <ContentContainer>
            <Text>{this.state.isPortrait ? 'landscape' : 'portrait'}</Text>
          </ContentContainer>
        </ContentWrapper>
      </PageContainer>
    );
  }
}
