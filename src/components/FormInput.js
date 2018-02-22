import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { isStringInt } from './../utils';
import Text from './TextRegular';

const colors = { error: 'red', normal: '#ccc', fontRegular: '#000' };

const InputWrapper = styled.View`
  height: 60;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;
`;

const FormTextInput = styled.TextInput`
  width: 60;
  border-width: 1;
  border-color: ${colors.normal};
  margin-horizontal: 10;
  padding: 0;
  padding-left: 5;
  height: 30;
  font-size: 16;
`;

const Container = styled.View`
  flex: 1;
`;

const ErrorText = styled.Text`
  font-size: 10;
  color: ${colors.error};
`;

const inLimit = value => value > 0 && value <= 1440;

export default class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = { currentValue: props.value, error: false };
  }

  componentWillReceiveProps(nextProps) {
    const { value: nextValue } = nextProps;
    const { value: currentValue } = this.props;

    if (nextValue !== currentValue) {
      const error = !isStringInt(String(nextValue)) || !inLimit(+nextValue);
      this.setState({ currentValue: nextValue, error });
    }
  }

  onChangeTextHandler = (result) => {
    const error = !isStringInt(result) || !inLimit(+result);
    this.props.onChange(error ? null : +result);
    this.setState({ currentValue: result, error });
  };

  render() {
    const {
      text, placeholder, value, onChange, containerStyle, ...props
    } = this.props;
    const { currentValue, error } = this.state;

    return (
      <InputWrapper style={containerStyle}>
        <Container>
          <Text style={{ marginTop: 5 }}>{text}</Text>
        </Container>
        <Container>
          <FormTextInput
            autoCorrect={false}
            keyboardType="numeric"
            underlineColorAndroid="transparent"
            value={`${currentValue === null ? '' : currentValue}`}
            placeholder={placeholder}
            returnKeyType="done"
            blurOnSubmit
            onChangeText={this.onChangeTextHandler}
            style={{
              borderColor: error ? colors.error : colors.normal,
              color: error ? colors.error : colors.fontRegular,
            }}
            placeholderTextColor="silver"
            disableFullscreenUI
            {...props}
          />
          <ErrorText>{error ? 'Please enter correct time from 1 to 1440 minutes' : ''}</ErrorText>
        </Container>
      </InputWrapper>
    );
  }
}

FormInput.propTypes = {
  text: PropTypes.string,
  placeholder: PropTypes.string,
  containerStyle: PropTypes.object, // eslint-disable-line
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  onChange: PropTypes.func.isRequired,
};

FormInput.defaultProps = {
  text: '',
  placeholder: '',
  value: null,
  containerStyle: {},
};
