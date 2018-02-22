import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from 'react-native';

const Container = styled.View`
  flex: 1;
  padding-horizontal: 10;
`;

const FormButton = (props) => {
  const { onPress, title, color } = props;
  return (
    <Container>
      <Button onPress={onPress} title={title} color={color} {...props} />
    </Container>
  );
};

export default FormButton;

FormButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
};

FormButton.defaultProps = {
  color: '#3b5998',
};
