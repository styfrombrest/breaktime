import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text } from 'react-native';

const FontedText = styled(Text)`
  font-family: 'Lato-Regular';
`;

const TextRegular = ({ children, ...props }) => <FontedText {...props}>{children}</FontedText>;

export default TextRegular;

TextRegular.propTypes = {
  children: PropTypes.node.isRequired,
};
