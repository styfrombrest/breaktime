import React, { Component } from 'react';
import styled from 'styled-components';
import { View, Vibration, Switch, Dimensions } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

import { setPushNotification, clearPushNotifications } from './src/components/PushNotification';
import Toolbar from './src/components/Toolbar';
import Text from './src/components/TextRegular';
import FormInput from './src/components/FormInput';
import FormButton from './src/components/FormButton';
import ModalConfirmRepeat from './src/components/ModalConfirm';
import TimerDisplay from './src/components/TimerDisplay';
import { isInt, isPortrait, getSecondsFromMinutes } from './src/utils';

const DEFAULTS = {
  workTime: 1,
  relaxTime: 1,
};

const PageContainer = styled(View)`
  flex: 1;
  background-color: white;
`;

const ContentWrapper = styled(View)`
  flex: 1;
`;

const ContentContainer = styled(View)`
  flex: 2;
  flex-direction: column;
  justify-content: flex-start;
  padding-horizontal: 15;
  padding-vertical: 5;
`;

const TimerContainer = styled(ContentContainer)`
  align-items: center;
  justify-content: flex-start;
  flex: 1.4;
`;

const ButtonsContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  height: 80;
`;

const SwitchContainer = styled(View)`
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

      ticker: null,
      tickerFunc: null,
      workInterval: DEFAULTS.workTime,
      relaxInterval: DEFAULTS.relaxTime,
      pushNotificationId: String(Date.now()).substring(6),
    };

    // Orientation changing listener
    Dimensions.addEventListener('change', () => {
      this.setState({
        portraitMode: isPortrait(),
      });
    });
  }

  setDefaultTimers = () => {
    this.setState({
      relaxInterval: DEFAULTS.relaxTime,
      workInterval: DEFAULTS.workTime,
    });
  };

  Timer = () => {
    const { workInterval, relaxInterval, pushNotificationId } = this.state;
    if (!this.state.tickerFunc) {
      // start timer
      const tickerFunc = BackgroundTimer.setInterval(() => {
        if (this.state.ticker.length > 0) {
          const { ticker } = this.state;

          // ticking
          ticker[0] -= 1;
          if (ticker[0] < 0) {
            // period ended, notify & switching to next
            ticker.shift();

            if (ticker.length) {
              // relax time notification
              this.vibrate(500); // fix for A 7.0
              setPushNotification(pushNotificationId, 'Working time is over, but relax time is started!', this.state.silentMode);
            }
          }
          this.setState({ ticker });
        } else {
          // periods are over, notify & clearing
          this.vibrate(1000); // fix for A 7.0
          setPushNotification(pushNotificationId, 'Relax time is over.', this.state.silentMode);
          BackgroundTimer.clearInterval(this.state.tickerFunc);
          this.setState({ ticker: null, tickerFunc: null, modalVisible: true });
        }
      }, 1000);

      this.setState({
        ticker: [getSecondsFromMinutes(workInterval), getSecondsFromMinutes(relaxInterval)],
        tickerFunc,
      });
    } else {
      // User stopped timer, clearing
      clearPushNotifications();
      BackgroundTimer.clearInterval(this.state.tickerFunc);
      this.setState({
        ticker: null,
        tickerFunc: null,
      });
    }
  };

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
    this.Timer();
    this.setState({ modalVisible: false });
  };

  closeModal = () => this.setState({ modalVisible: false });

  render() {
    const {
      portraitMode, workInterval, relaxInterval, silentMode, tickerFunc, ticker,
    } = this.state;

    return (
      <PageContainer>
        <Toolbar />
        <ContentWrapper style={{ flexDirection: portraitMode ? 'column' : 'row' }}>
          <ContentContainer>
            <FormInput
              text="Working time, minutes:"
              value={workInterval}
              onChange={(result) => {
                this.setState({ workInterval: result });
              }}
              editable={!tickerFunc}
            />

            <FormInput
              text="Relax time, minutes:"
              value={relaxInterval}
              onChange={(result) => {
                this.setState({ relaxInterval: result });
              }}
              editable={!tickerFunc}
            />

            <SwitchContainer>
              <Text>Silent Mode: </Text>
              <Switch onValueChange={this.silentSwitchHandler} value={silentMode} />
            </SwitchContainer>

            <ButtonsContainer>
              <FormButton
                onPress={this.Timer}
                title={tickerFunc ? 'Stop' : 'Start'}
                disabled={!isInt(workInterval) || !isInt(relaxInterval)}
              />

              <FormButton onPress={this.setDefaultTimers} title="Reset" color="#841584" disabled={!!tickerFunc} />
            </ButtonsContainer>
          </ContentContainer>
          <TimerContainer>
            {tickerFunc ? (
              <TimerDisplay
                title={ticker.length > 1 ? 'Working time remaining:' : 'Relax time remaining...'}
                time={ticker[0]}
                portraitMode={portraitMode}
                color={ticker.length > 1 ? null : 'green'}
              />
            ) : (
              <Text style={{ textAlign: 'center' }}>&nbsp;</Text>
            )}
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
