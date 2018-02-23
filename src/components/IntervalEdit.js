import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button, TimePickerAndroid } from 'react-native';
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
  width: 100;
`;

const IntervalEdit = (props) => {
  const {
    text, value, onChange, disabled,
  } = props;
  const time = getTime(value, 'm');

  return (
    <Wrapper>
      <Container>
        <Text style={{ marginTop: 7 }}>{text}</Text>
      </Container>
      <Container>
        <ButtonContainer>
          <Button
            title={time.format('HH:mm')}
            onPress={async () => {
              const { action, hour, minute } = await TimePickerAndroid.open({
                hour: +time.format('H'),
                minute: +time.format('m'),
                mode: 'spinner',
                is24Hour: true,
              });
              if (action !== TimePickerAndroid.dismissedAction) {
                // convert to minutes
                onChange(hour * 60 + minute); // eslint-disable-line
              }
            }}
            color={value === 0 ? 'red' : null}
            disabled={disabled}
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
