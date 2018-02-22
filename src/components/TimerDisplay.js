import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import Text from './TextRegular';

const Container = styled.View`
  align-items: center;
`;

const TimerDisplay = (props) => {
  const duration = moment.duration(props.time, 's');
  const time = moment.utc(duration.asMilliseconds());

  const TimerText = styled(Text)`
    font-size: ${props.portraitMode ? 82 : 64};
  `;

  return (
    <Container>
      <Text style={{ fontSize: 24, color: props.color }}>{props.title}</Text>
      <TimerText style={{ color: props.color }}>{duration.asHours() > 1 ? time.format('kk:mm:ss') : time.format('mm:ss')}</TimerText>
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
