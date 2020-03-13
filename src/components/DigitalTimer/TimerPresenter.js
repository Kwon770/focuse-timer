import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faStop,
  faPen,
  faCog
} from "@fortawesome/free-solid-svg-icons";
import Store from "store";

class TimerPresenter extends React.Component {
  state = {
    isFocus: false,
    isMenuClick: false,
    isCustomClick: false
  };
  render() {
    const { isMenuClick, isCustomClick } = this.state;
    return (
      <Container>
        <Main
          onClick={() =>
            isMenuClick ? this.setState({ isMenuClick: false }) : ""
          }
          isMenu={isMenuClick}
        >
          <MenuConatiner>
            <CurrentDoPanel {...this.state}>
              <FontAwesomeIcon icon={faPen} style={{ marginRight: 10 }} />
              Code
            </CurrentDoPanel>
            <CogBtn
              onClick={() => this.setState({ isMenuClick: true })}
              isMenu={isMenuClick}
            >
              <FontAwesomeIcon icon={faCog} />
            </CogBtn>
          </MenuConatiner>
          <TimerContainer>
            <DigitalTimer>25</DigitalTimer>
            <DigitalTimer>
              '<DigitalTimerDot>'</DigitalTimerDot>
            </DigitalTimer>
            <DigitalTimer>00</DigitalTimer>
            <PlayerPreview>Soup Asmr - Tokyo Cafe Asmr</PlayerPreview>
          </TimerContainer>
          <TimerBtnContainer>
            <TimerBtn>
              <FontAwesomeIcon icon={faPlay} size="4x" color="white" />
            </TimerBtn>
            <TimerBtn>
              <FontAwesomeIcon icon={faPause} size="4x" color="white" />
            </TimerBtn>
            <TimerBtn>
              <FontAwesomeIcon icon={faStop} size="4x" color="white" />
            </TimerBtn>
          </TimerBtnContainer>
        </Main>
        {isMenuClick ? (
          <Panel isCustom={isCustomClick}>
            <ButtonColumn>
              <ButtonConatiner>
                <Title>Clock Mode</Title>
                <SettingButton>
                  Time Timer
                  <SettingDescription Left>
                    Intuitive analog clock
                  </SettingDescription>
                </SettingButton>
                <SettingButton>
                  Digital Timer
                  <SettingDescription Left>
                    Accurate digital clock
                  </SettingDescription>
                </SettingButton>
              </ButtonConatiner>
              <ButtonConatiner>
                <Title>Time Mode</Title>
                <SettingButton
                  onClick={() => this.setState({ isCustomClick: false })}
                >
                  Pomodoro
                  <SettingDescription>
                    1 long focus after 4 short focus with break
                  </SettingDescription>
                </SettingButton>
                <SettingButton
                  onClick={() => this.setState({ isCustomClick: true })}
                >
                  Custom
                  <SettingDescription>Custom time set</SettingDescription>
                </SettingButton>
              </ButtonConatiner>
            </ButtonColumn>
            <ButtonColumn>
              <ButtonConatiner>
                <Title>Timer Mode</Title>
                <SettingButton>
                  Timer Auto Start
                  <SettingDescription Left>
                    If focus or break is done, start next timer automatically
                  </SettingDescription>
                </SettingButton>
                <SettingButton>
                  Over Counting
                  <SettingDescription Left>
                    If you don't press next Button, It will count time till you
                    press
                  </SettingDescription>
                </SettingButton>
              </ButtonConatiner>
              <ButtonConatiner>
                <Title>Time Setting</Title>
                <SettingButton>
                  Focus Time
                  <TimeInput />
                  <SettingDescription>
                    Time to focus on what you do (minute)
                  </SettingDescription>
                </SettingButton>
                <SettingButton>
                  Short break Time
                  <TimeInput />
                  <SettingDescription>
                    Short break time after repeated focus (minute)
                  </SettingDescription>
                </SettingButton>
                <SettingButton>
                  Long Break Time
                  <TimeInput />
                  <SettingDescription>
                    Long break time after 2 repeated focus (4 repeated with
                    Pomodoro) (minute)
                  </SettingDescription>
                </SettingButton>
              </ButtonConatiner>
            </ButtonColumn>
            <ApplyButton>Apply</ApplyButton>
          </Panel>
        ) : (
          ""
        )}
      </Container>
    );
  }
}

const ApplyButton = styled.div`
  position: absolute;
  bottom: 15px;
  left: 50%;
  margin-left: -100px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 50px;
  border-radius: 25px;
  background-color: #ff8f70;
  color: white;
`;

const SettingDescription = styled.div`
  display: none;
  position: absolute;
  top: 0;
  ${props => (props.Left ? "right: 155px;" : "left: 155px;")}
  width: 200px;
  padding: 10px 20px;
  border-radius: 25px;
  background-color: white;
  word-break: break-all;
`;

const TimeInput = styled.input.attrs(props => ({ type: `number` }))`
  width: 35px;
  padding: 3px 0px;
  border: none;
  border-bottom: 1px solid #bdc3c7;
  text-align: center;
  font-weight: 300;
  font-size: 15px;
  color: black;
  &:focus {
    outline: none;
  }
`;

const SettingButton = styled.h4`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 118px;
  font-weight: 300;

  &:hover > ${SettingDescription} {
    display: block;
  }
`;

const Title = styled.h3`
  font-weight: 400;
`;

const ButtonConatiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const ButtonColumn = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Panel = styled.div`
  padding: 20px;
  position: absolute;
  top: 50%;
  margin-top: -200px;
  left: 50%;
  margin-left: -150px;
  width: 300px;
  height: 450px;
  border-radius: 25px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.27) 0 10px 20px;
`;

const CogBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  color: ${props => (props.isMenu ? "#ff8f70" : "#bdc3c7")};
  font-size: 20px;
  background-color: white;
  border-radius: 25px;
  box-shadow: rgba(0, 0, 0, 0.27) 0 10px 20px;
`;

const CurrentDoPanel = styled.div`
  width: 120px;
  height: 50px;
  margin-right: 15px;
  background-color: white;
  border-radius: 25px;
  box-shadow: rgba(0, 0, 0, 0.27) 0 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  color: ${props => (props.isFocus ? "#ff8f70" : "#bdc3c7")};
`;

const MenuConatiner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 20px;
  left: 50%;
  margin-left: -95px;
`;

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

const PlayerPreview = styled.div`
  position: absolute;
  top: 185px;
  width: 290px;
  margin-top: 0;
  border-top: 2px solid white;
  border-bottom: 2px solid white;
  text-align: center;
  color: white;
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
  ${props => (props.isMenu ? "filter: blur(3px);" : "")}
  ${props => (props.isMenu ? "-webkit-filter: blur(3px);" : "")}
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #ff5f6d, #ffc371);
`;

export default TimerPresenter;
