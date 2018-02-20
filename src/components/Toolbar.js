import React, { Component } from 'react';
import styled from 'styled-components';
import { Image, View } from 'react-native';
import Text from './TextRegular';

const clockIcon = require('./../../public/clock_icon.png');

const ToolbarWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: black;
  padding-horizontal: 5;
  height: 56;
`;

const TextContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
`;

const LogoText = styled.Text`
  color: white;
  font-size: 24;
  padding-left: 10;
`;

const Logo = styled.Image`
  width: 48;
  height: 48;
`;

export default class Toolbar extends Component {
  render() {
    return (
      <ToolbarWrapper>
        <View>
          <Logo source={clockIcon} />
        </View>
        <TextContainer>
          <LogoText>Break Time App</LogoText>
        </TextContainer>
      </ToolbarWrapper>
    );
  }
}
