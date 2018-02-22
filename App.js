import React, { Component } from 'react';
import styled from 'styled-components';
import { View, Vibration, Switch, Dimensions } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

import Toolbar from './src/components/Toolbar';
import Text from './src/components/TextRegular';
import FormInput from './src/components/FormInput';
import FormButton from './src/components/FormButton';
import ModalConfirmRepeat from './src/components/ModalConfirm';
import TimerDisplay from './src/components/TimerDisplay';
import { isInt, isPortrait, getSecondsFromMinutes } from './src/utils';

const defaults = {
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
  justify-content: center;
  flex: 1.7;
`;

const ButtonsContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  flex: 1.5;
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
      tickerWork: 0,
      tickerRelax: 0,
      workInterval: defaults.workTime,
      relaxInterval: defaults.relaxTime,
    };

    // Orientation changing listener
    Dimensions.addEventListener('change', () => {
      this.setState({
        portraitMode: isPortrait(),
      });
    });
  }

  setDefaultTimers = () =>
    this.setState({ relaxInterval: defaults.relaxTime, workInterval: defaults.workTime });

  // TODO: refactoring this.state...
  Timer = () => {
    if (!this.state.ticker) {
      // start timer
      const ticker = BackgroundTimer.setInterval(() => {
        if (this.state.tickerWork > 0) {
          // ticking
          this.setState({ tickerWork: this.state.tickerWork - 1 });
        } else {
          // end
          if (this.state.silentMode) {
            this.vibrate([100, 200, 100, 200, 100, 200]);
          }
          BackgroundTimer.clearInterval(this.state.ticker);

          this.RelaxTimer();
          this.setState({ ticker: 'relax' });
        }
      }, 1000);

      this.setState({
        tickerWork: getSecondsFromMinutes(this.state.workInterval),
        tickerRelax: getSecondsFromMinutes(this.state.relaxInterval),
        ticker,
      });
    } else {
      // stopping timer
      BackgroundTimer.clearInterval(this.state.ticker);
      this.setState({
        ticker: null,
        tickerWork: getSecondsFromMinutes(this.state.workInterval),
        tickerRelax: getSecondsFromMinutes(this.state.relaxInterval),
      });
    }
  };

  // TODO: refactoring
  RelaxTimer = () => {
    // start timer
    const ticker = BackgroundTimer.setInterval(() => {
      if (this.state.tickerRelax > 0) {
        // ticking
        this.setState({ tickerRelax: this.state.tickerRelax - 1 });
      } else {
        // end
        if (this.state.silentMode) {
          this.vibrate([100, 200, 100, 200, 100, 200]);
        }
        BackgroundTimer.clearInterval(this.state.ticker);

        this.setState({ ticker: null, modalVisible: true });
      }
    }, 1000);

    this.setState({
      tickerWork: getSecondsFromMinutes(this.state.workInterval),
      tickerRelax: getSecondsFromMinutes(this.state.relaxInterval),
      ticker,
    });
  };

  closeModal = () => this.setState({ modalVisible: false });

  /**
   * Runs vibration
   * @param {Number|Number[]} [Timeout = 25] Timeout or sequence of timeouts and delays(v,p,v...)
   */
  vibrate = (timeout = 25) => {
    Vibration.vibrate(timeout);
    return true;
  };

  silentSwitchHandler = (value) => {
    if (value) {
      this.vibrate(300);
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

  render() {
    const {
      portraitMode,
      workInterval,
      relaxInterval,
      silentMode,
      ticker,
      tickerWork,
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
              editable={!ticker}
            />

            <FormInput
              text="Relax time, minutes:"
              value={relaxInterval}
              onChange={(result) => {
                this.setState({ relaxInterval: result });
              }}
              editable={!ticker}
            />

            <SwitchContainer>
              <Text>Silent Mode: </Text>
              <Switch onValueChange={this.silentSwitchHandler} value={silentMode} />
            </SwitchContainer>

            <ButtonsContainer>
              <FormButton
                onPress={this.Timer}
                title={ticker ? 'Stop' : 'Start'}
                disabled={!isInt(workInterval) || !isInt(relaxInterval)}
              />

              <FormButton
                onPress={this.setDefaultTimers}
                title="Reset"
                color="#841584"
                disabled={!!ticker}
              />
            </ButtonsContainer>
          </ContentContainer>
          <TimerContainer>
            {ticker ? (
              <TimerDisplay
                title="Working time remaining:"
                time={tickerWork}
                portraitMode={portraitMode}
              />
            ) : (
              <Text>Some help text</Text>
            )}

            <Text>
              Work: {workInterval}, Relax: {relaxInterval}
            </Text>
            <Text>TickerWork: {this.state.tickerWork}</Text>
            <Text>TickerRelax: {this.state.tickerRelax}</Text>
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
