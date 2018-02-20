import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { TextInput, View } from 'react-native';
import Text from './TextRegular';

const FormContainer = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-around;
`;

const FormTextInput = styled.TextInput`
  flex: 1;
  border-width: 1;
  border-color: #ccc;
  margin-horizontal: 10;
  padding: 0;
  padding-left: 5;
  height: 30;
  font-size: 18;
`;

export default class FormInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { text, placeholder, value, onChangeHandler, ...props } = this.props;
    return (
      <FormContainer>
        <Text>{text}</Text>
        <FormTextInput
          editable={true}
          autoCorrect={false}
          keyboardType="numeric"
          placeholder="Select"
          value={value + ''}
          underlineColorAndroid="transparent"
          placeholder={placeholder}
          returnKeyType="next"
          blurOnSubmit={false}
          onChangeText={onChangeHandler}
          {...props}
        />
      </FormContainer>
    );
  }
}

FormInput.propTypes = {
  text: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.number,
  onChangeText: PropTypes.func.isRequired,
};
