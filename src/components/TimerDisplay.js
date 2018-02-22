import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { View } from 'react-native';
import styled from 'styled-components';
import Text from './TextRegular';

const Container = styled(View)`
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
      <Text style={{ fontSize: 24 }}>{props.title}</Text>
      <TimerText>
        {duration.asHours() > 1 ? time.format('kk:mm:ss') : time.format('mm:ss')}
      </TimerText>
    </Container>
  );
};

export default TimerDisplay;

TimerDisplay.propTypes = {
  title: PropTypes.string,
  time: PropTypes.number.isRequired,
  portraitMode: PropTypes.bool,
};

TimerDisplay.defaultProps = {
  title: '',
  portraitMode: false,
};
