import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Text from './TextRegular';
import { getTime } from './../utils';

const Container = styled.View`
  align-items: center;
`;

const TimerDisplay = (props) => {
  const time = getTime(props.time, 's');

  const TimerText = styled(Text)`
    font-size: ${props.portraitMode ? 82 : 64};
  `;

  return (
    <Container>
      <Text style={{ fontSize: 24, color: props.color }}>{props.title}</Text>
      <TimerText style={{ color: props.color }}>{time.format('HH') > 0 ? time.format('kk:mm:ss') : time.format('mm:ss')}</TimerText>
    </Container>
  );
};

export default TimerDisplay;

TimerDisplay.propTypes = {
  title: PropTypes.string,
  time: PropTypes.number,
  portraitMode: PropTypes.bool,
  color: PropTypes.string,
};

TimerDisplay.defaultProps = {
  time: 0,
  title: '',
  portraitMode: false,
  color: 'grey',
};
