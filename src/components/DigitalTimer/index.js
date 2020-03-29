import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faStop } from "@fortawesome/free-solid-svg-icons";
import PlayerPreview from "./PlayerPreview";
import TodaySetCounter from "./TodaySetCounter";

export default class TimerPresenter extends React.Component {
  state = {
    isFocus: true,
    intervalTimer: null,
    minute: "00",
    second: "02",
    sets: []
  };
  render() {
    const { minute, second, sets, isFocus } = this.state;
    const { isSettingClick, isToDoClick } = this.props;
    return (
      <Main isMenu={isSettingClick || isToDoClick} isFocus={isFocus}>
        <TimerContainer>
          <TodaySetCounter sets={sets} />
          <DigitalTimer>{minute}</DigitalTimer>
          <DigitalTimer>
            '<DigitalTimerDot>'</DigitalTimerDot>
          </DigitalTimer>
          <DigitalTimer>{second}</DigitalTimer>
          <PlayerPreview />
        </TimerContainer>
        <TimerBtnContainer>
          <TimerBtn onClick={this._handlePlay}>
            <FontAwesomeIcon icon={faPlay} size="5x" color="white" />
          </TimerBtn>
          <TimerBtn onClick={this._handlePause}>
            <FontAwesomeIcon icon={faPause} size="5x" color="white" />
          </TimerBtn>
          <TimerBtn onClick={this._handleStop}>
            <FontAwesomeIcon icon={faStop} size="5x" color="white" />
          </TimerBtn>
        </TimerBtnContainer>
      </Main>
    );
  }

  SetTimer = () => {
    if (this.state.intervalTimer != null) return;

    let time = parseInt(this.state.minute) * 60 + parseInt(this.state.second);
    const timer = setInterval(() => {
      const min =
        time / 60 < 10 ? "0" + Math.floor(time / 60) : Math.floor(time / 60);
      const sec = time % 60 < 10 ? "0" + (time % 60) : time % 60;
      this.setState({ minute: String(min), second: String(sec) });

      time--;

      if (time < 0) {
        clearInterval(timer);
        // timeout event
        this.FinishTimer();
        this.setState({ intervalTimer: null });
      }
    }, 1000);
    this.setState({ intervalTimer: timer });
  };

  RemoveTimer = () => {
    clearInterval(this.state.intervalTimer);
    this.setState({ intervalTimer: null });
  };

  FinishTimer = () => {
    if (this.state.isFocus) {
      // Finish focus
      let newSets = [];
      newSets.push(1);
      this.state.sets.map(set => newSets.push(set));

      const min = this.SetTime(newSets);

      this.setState({
        isFocus: false,
        sets: newSets,
        minute: this.ConvertToTimeFormat(min),
        second: this.ConvertToTimeFormat(1)
      });
    } else {
      // Finish break
      this.setState({
        isFocus: true,
        minute: this.ConvertToTimeFormat(this.props.focusTime),
        second: this.ConvertToTimeFormat(2)
      });
    }
  };

  SetTime = sets => {
    if (this.props.isCustom) {
      if (sets.length % 2 === 0) return this.props.longBreakTime;
      else return this.props.shortBreakTime;
    } else {
      if (sets.length % 4 === 0) return this.props.longBreakTime;
      else return this.props.shortBreakTime;
    }
  };

  ConvertToTimeFormat = number => {
    if (number < 10) return "0" + String(number);
    else return String(number);
  };

  _handlePlay = () => {
    // this.setState({ timerState: true });
    this.SetTimer();
  };
  _handlePause = () => {
    this.RemoveTimer();
  };
  _handleStop = () => {
    this.RemoveTimer();
    this.setState({
      minute: this.ConvertToTimeFormat(this.props.focusTime),
      second: "00"
    });
  };
}

const TimerBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
`;

const TimerBtn = styled.button`
  background-color: rgba(0, 0, 0, 0);
  border: none;
  margin: 0px 15px;
`;

const DigitalTimer = styled.span`
  color: white;
  font-size: 140px;
  font-weight: 300;
  position: relative;
`;

const DigitalTimerDot = styled.span`
  color: white;
  font-size: 140px;
  font-weight: 300;
  position: absolute;
  top: 65px;
  left: 0;
`;

const TimerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: ${props =>
    props.isFocus
      ? "linear-gradient(to right, #ff5f6d, #ffc371)"
      : "linear-gradient(to right, #2193b0, #6dd5ed)"};
  ${props => (props.isMenu ? "filter: blur(3px)" : "")};
  ${props => (props.isMenu ? "-webkit-filter: blur(3px)" : "")};
`;
