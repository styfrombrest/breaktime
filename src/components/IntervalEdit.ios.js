import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ModalSelector from 'react-native-modal-selector';
import Text from './TextRegular';
import { getTime } from './../utils';

const Wrapper = styled.View`
  height: 60;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Container = styled.View`
  width: 120;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const formatTime = i => `0${i}`.slice(-2);

const IntervalEdit = (props) => {
  const {
    text, value, onChange, disabled,
  } = props;
  const time = getTime(value, 'm');

  const minutes = [];
  const hours = [];
  for (let i = 0; i < 60; i += 1) {
    if (i < 24) hours.push({ key: formatTime(i), label: formatTime(i) });
    minutes.push({ key: formatTime(i), label: formatTime(i) });
  }

  return (
    <Wrapper>
      <Container>
        <Text style={{ marginTop: 7 }}>{text}</Text>
      </Container>
      <Container>
        <ButtonContainer>
          <ModalSelector
            data={hours}
            initValue={String(time.format('HH'))}
            accessible
            onChange={option => onChange(+time.format('m') + +option.key * 60)} // eslint-disable-line no-mixed-operators
            disabled={disabled}
            touchableStyle={{ backgroundColor: value === 0 ? 'rgba(255, 0, 0, 0.3)' : null }}
          />
          <Text> : </Text>
          <ModalSelector
            data={minutes}
            initValue={String(time.format('mm'))}
            accessible
            onChange={option => onChange(+time.format('H') + +option.key)}
            disabled={disabled}
            touchableStyle={{ backgroundColor: value === 0 ? 'rgba(255, 0, 0, 0.3)' : null }}
          />
        </ButtonContainer>
      </Container>
    </Wrapper>
  );
};

export default IntervalEdit;

IntervalEdit.propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

IntervalEdit.defaultProps = {
  text: '',
  value: 0,
  disabled: false,
};
