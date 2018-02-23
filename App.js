import React, { Component } from 'react';
import styled from 'styled-components';
import { Vibration, Switch, Dimensions } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

import moment from 'moment';

import { clearPushNotifications, setSchedulePushNotification } from './src/components/PushNotification';
import Toolbar from './src/components/Toolbar';
import Text from './src/components/TextRegular';
import IntervalEdit from './src/components/IntervalEdit';
import FormButton from './src/components/FormButton';
import ModalConfirmRepeat from './src/components/ModalConfirm';
import TimerDisplay from './src/components/TimerDisplay';
import { isPortrait, getDiffNow } from './src/utils';

const DEFAULTS = {
  workTime: 55,
  relaxTime: 5,
};

const PageContainer = styled.View`
  flex: 1;
  background-color: white;
`;

const ContentWrapper = styled.View`
  flex: 1;
`;

const ContentContainer = styled.View`
  flex: 2;
  flex-direction: column;
  justify-content: flex-start;
  padding-horizontal: 15;
  padding-vertical: 5;
`;

const TimerContainer = styled(ContentContainer)`
  align-items: center;
  flex: 1.7;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: 80;
`;

const SwitchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: 30;
  padding-bottom: 10;
`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portraitMode: isPortrait(),
      silentMode: false,
      modalVisible: false,

      scheduleDates: null,
      tickerFunc: null,
      workInterval: DEFAULTS.workTime,
      relaxInterval: DEFAULTS.relaxTime,
    };

    // Orientation changing listener
    Dimensions.addEventListener('change', () => {
      this.setState({
        portraitMode: isPortrait(),
      });
    });

    // stop previous timers
    BackgroundTimer.stopBackgroundTimer();
  }

  setDefaultTimers = () => {
    this.setState({
      relaxInterval: DEFAULTS.relaxTime,
      workInterval: DEFAULTS.workTime,
    });
  };

  Timer = () => {
    clearPushNotifications();

    const { workInterval, relaxInterval } = this.state;
    // set schedule
    const scheduleDates = [moment().add(workInterval, 'minutes'), moment().add(workInterval + relaxInterval, 'minutes')];

    if (!this.state.tickerFunc) {
      // start timer
      const tickerFunc = BackgroundTimer.setInterval(() => {
        if (scheduleDates.length > 0) {
          const timeLeft = getDiffNow(scheduleDates[0]);

          if (timeLeft < 0) {
            // period ended, notify & switching to next
            scheduleDates.shift();
            if (scheduleDates.length) {
              // relax time notification
              this.vibrate(500); // fix for A 7.0
            }
          }
          this.setState({ scheduleDates });
        } else {
          // periods are over, notify & clearing
          this.vibrate(1000); // fix for A 7.0
          BackgroundTimer.clearInterval(this.state.tickerFunc);
          this.setState({ scheduleDates: null, tickerFunc: null, modalVisible: true });
        }
      }, 500);

      setSchedulePushNotification(scheduleDates[0].toDate(), 'Working time is over, but relax time is started!', this.state.silentMode);
      setSchedulePushNotification(scheduleDates[1].toDate(), 'Relax time is over.', this.state.silentMode);

      this.setState({
        scheduleDates,
        tickerFunc,
      });
    } else {
      // User stopped timer, clearing
      clearPushNotifications();
      BackgroundTimer.clearInterval(this.state.tickerFunc);
      this.setState({
        scheduleDates: null,
        tickerFunc: null,
      });
    }
  };

  // check what timer is active(0: work, 1: relax)
  isRelaxTicker = () => this.state.scheduleDates && this.state.scheduleDates.length > 1;

  /**
   * Runs vibration according to silentMode
   * @param {Number|Number[]} [Timeout = 25] Timeout or sequence of timeouts and delays(v,p,v...)
   */
  vibrate = (timeout = 25) => {
    if (this.state.silentMode) {
      Vibration.vibrate(timeout);
    }
    return true;
  };

  silentSwitchHandler = (value) => {
    if (value) {
      Vibration.vibrate(100);
    }
    this.setState({
      silentMode: value,
    });
    return true;
  };

  confirmModal = () => {
    // restart timer
    this.Timer();
    this.setState({ modalVisible: false });
  };

  closeModal = () => this.setState({ modalVisible: false });

  render() {
    const {
      portraitMode, workInterval, relaxInterval, silentMode, tickerFunc, scheduleDates,
    } = this.state;

    return (
      <PageContainer>
        <Toolbar />
        <ContentWrapper style={{ flexDirection: portraitMode ? 'column' : 'row' }}>
          <ContentContainer>
            <IntervalEdit
              text="Working time:"
              value={workInterval}
              onChange={(result) => {
                this.setState({ workInterval: result });
              }}
              disabled={!!tickerFunc}
            />

            <IntervalEdit
              text="Relax time:"
              value={relaxInterval}
              onChange={(result) => {
                this.setState({ relaxInterval: result });
              }}
              disabled={!!tickerFunc}
            />

            <SwitchContainer>
              <Text>Silent Mode: </Text>
              <Switch onValueChange={this.silentSwitchHandler} value={silentMode} disabled={!!tickerFunc} />
            </SwitchContainer>

            <ButtonsContainer>
              <FormButton onPress={this.Timer} title={tickerFunc ? 'Stop' : 'Start'} disabled={!workInterval || !relaxInterval} />
              <FormButton onPress={this.setDefaultTimers} title="Reset" color="#841584" disabled={!!tickerFunc} />
            </ButtonsContainer>
          </ContentContainer>

          <TimerContainer style={{ justifyContent: portraitMode ? 'flex-start' : 'center' }}>
            {tickerFunc ? (
              <TimerDisplay
                title={this.isRelaxTicker() ? 'Working time remaining:' : 'Relax time remaining...'}
                time={scheduleDates.length ? getDiffNow(scheduleDates[0]) : 0}
                portraitMode={portraitMode}
                color={this.isRelaxTicker() ? null : 'green'}
              />
            ) : null}
          </TimerContainer>
        </ContentWrapper>

        <ModalConfirmRepeat
          visible={this.state.modalVisible}
          confirmModal={this.confirmModal}
          closeModal={this.closeModal}
          onRequestClose={this.closeModal}
        />
      </PageContainer>
    );
  }
}
