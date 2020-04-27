import React, { Component } from "react";
import styled, { ThemeProvider } from "styled-components";
import { breakDark, focusDark, breakLight, focusLight } from "./theme";
import Timer from "./Components/Timer";
import Player from "./Components/Player/Player";
import PlayerButton from "./Components/Player/PlayerButton";
import PlayerPanel from "./Components/Player/PlayerPanel";
import SettingButton from "./Components/Setting/SettingButton";
import SettingPanel from "./Components/Setting/SettingPanel";
import ToDosButton from "./Components/ToDos/ToDosButton";
import ToDosPanel from "./Components/ToDos";

const OPTIONS_LS = "optionsLocalStorage";
const TODOS_LS = "todosLocalStorage";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.Timer = React.createRef();
    // load saved data and apply time setting
    this.loadToDos();
    this.loadOption();
  }

  componentDidMount() {
    this.checkLastDate();
  }

  state = {
    theme: focusLight,
    isFocus: true,
    isStudy: false,
    // Player
    isPlayerClick: true,
    isPlay: true,
    // ToDos
    isToDoClick: false,
    curDo: null,
    curDoId: null,
    toDos: [],
    // Settings
    isSettingClick: false,
    isDarkMode: false,
    isCustom: false,
    isAutoStart: false,
    isOverCount: false,
    focusTime: 25,
    shortBreakTime: 5,
    longBreakTime: 30,
  };

  togglePlayerButton = () => {
    this.setState({ isPlayerClick: !this.state.isPlayerClick });
  };

  togglePlay = () => {
    this.setState({ isPlay: !this.state.isPlay });
  };

  checkLastDate = () => {
    const lastDate = localStorage.getItem("LastDate");
    const date = new Date();
    const todayDate = date.getMonth() + "." + date.getDate();
    if (lastDate !== todayDate) {
      let newToDos = [];
      this.state.toDos.map((toDo) => {
        toDo.todayTime = 0;
        toDo.isDone = false;
        newToDos.push(toDo);
      });
      this.reallocateToDos(newToDos);
      this.Timer.current.ClearSets();
      localStorage.setItem("LocalDate", todayDate);
    }
  };

  saveToDos = () => {
    let savingToDos = [];
    this.state.toDos.map((toDo) => {
      if (toDo.isButton === false) savingToDos.push(toDo);
    });
    localStorage.setItem(TODOS_LS, JSON.stringify(savingToDos));
  };

  loadToDos = () => {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
      this.state.toDos = JSON.parse(loadedToDos);
    }
  };

  setCurDo = (curDo, curDoId) => {
    this.setState({ curDo, curDoId });
  };

  reallocateToDos = (newToDos) => {
    this.setState({ toDos: newToDos }, () => this.saveToDos());
  };

  addFocusedTime = (time) => {
    let newToDos = [];
    this.state.toDos.map((toDo) => {
      if (toDo.id === this.state.curDoId) {
        toDo.todayTime += time;
        toDo.totalTime += time;
      }
      newToDos.push(toDo);
    });
    this.reallocateToDos(newToDos);
  };

  saveOption = () => {
    const optionValue = {};
    optionValue["isDarkMode"] = this.state.isDarkMode;
    optionValue["isCustom"] = this.state.isCustom;
    optionValue["isAutoStart"] = this.state.isAutoStart;
    optionValue["isOverCount"] = this.state.isOverCount;
    optionValue["focusTime"] = this.state.focusTime;
    optionValue["shortBreakTime"] = this.state.shortBreakTime;
    optionValue["longBreakTime"] = this.state.longBreakTime;
    localStorage.setItem(OPTIONS_LS, JSON.stringify(optionValue));
  };

  loadOption = () => {
    const loadedOptions = localStorage.getItem(OPTIONS_LS);
    if (loadedOptions !== null) {
      const parsedOptions = JSON.parse(loadedOptions);
      this.state.isDarkMode = parsedOptions["isDarkMode"];
      this.state.isCustom = parsedOptions["isCustom"];
      this.state.isAutoStart = parsedOptions["isAutoStart"];
      this.state.isOverCount = parsedOptions["isOverCount"];
      this.state.focusTime = parsedOptions["focusTime"];
      this.state.shortBreakTime = parsedOptions["shortBreakTime"];
      this.state.longBreakTime = parsedOptions["longBreakTime"];
    }
  };
  applyTheme = () => {
    this.setState({
      theme: this.state.isDarkMode
        ? this.state.isFocus
          ? focusDark
          : breakDark
        : this.state.isFocus
        ? focusLight
        : breakLight,
    });
  };

  _toggleToDo = () => {
    this.setState({ isToDoClick: !this.state.isToDoClick });
  };
  _toggleSetting = () => {
    // When panel is closing
    if (this.state.isSettingClick) {
      if (this.state.isFocus) {
        this.Timer.current.SetTimer(this.state.focusTime, 0);
      } else {
        this.Timer.current.SetTimer(this.Timer.current.GetBreakTime(), 0);
      }
      this.saveOption();
    }
    this.setState({ isSettingClick: !this.state.isSettingClick });
  };
  _applyTimeSetting = (focus, shortBreak, longBreak) => {
    this.setState({
      focusTime: focus,
      shortBreakTime: shortBreak,
      longBreakTime: longBreak,
    });
  };
  _toggleIsFocus = () => {
    this.setState({ isFocus: !this.state.isFocus });
  };
  changeIsStudy = (bool) => {
    this.setState({ isStudy: bool });
  };
  _toggleDarkMode = () => {
    this.setState({ isDarkMode: !this.state.isDarkMode }, () =>
      this.applyTheme()
    );
  };
  _pressPomo = () => {
    this.setState({
      isCustom: false,
      focusTime: 25,
      shortBreakTime: 5,
      longBreakTime: 30,
    });
  };
  _pressCustom = () => {
    this.setState({
      isCustom: true,
      focusTime: 50,
      shortBreakTime: 10,
      longBreakTime: 30,
    });
  };
  _toggleAutoStart = () => {
    this.setState({ isAutoStart: !this.state.isAutoStart });
  };
  _toggleOverCount = () => {
    this.setState({ isOverCount: !this.state.isOverCount });
  };
  render() {
    const {
      curDo,
      theme,
      isSettingClick,
      isToDoClick,
      isDarkMode,
      isAutoStart,
      isOverCount,
      isStudy,
      isCustom,
      focusTime,
      shortBreakTime,
      longBreakTime,
      isFocus,
      isPlay,
      isPlayerClick,
    } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Timer
          ref={this.Timer}
          isSettingClick={isSettingClick}
          isToDoClick={isToDoClick}
          isPlayerClick={isPlayerClick}
          isDarkMode={isDarkMode}
          isCustom={isCustom}
          isAutoStart={isAutoStart}
          isOverCount={isOverCount}
          isFocus={isFocus}
          focusTime={focusTime}
          shortBreakTime={shortBreakTime}
          longBreakTime={longBreakTime}
          toggleIsFocus={this._toggleIsFocus}
          changeIsStudy={this.changeIsStudy}
          applyTheme={this.applyTheme}
          addFocusedTime={this.addFocusedTime}
        />
        {isSettingClick ? (
          <SettingPanel
            applyTimeSetting={this._applyTimeSetting}
            toggleSetting={this._toggleSetting}
            toggleDarkMode={this._toggleDarkMode}
            pressPomo={this._pressPomo}
            pressCustom={this._pressCustom}
            toggleAutoStart={this._toggleAutoStart}
            toggleOverCount={this._toggleOverCount}
            focusTime={focusTime}
            shortBreakTime={shortBreakTime}
            longBreakTime={longBreakTime}
            {...this.state}
          />
        ) : (
          ""
        )}
        {isToDoClick ? (
          <ToDosPanel
            setCurDo={this.setCurDo}
            reallocateToDos={this.reallocateToDos}
            toDos={this.state.toDos}
          />
        ) : (
          ""
        )}
        {isPlayerClick ? <PlayerPanel isPlay={isPlay} /> : ""}
        <Player />
        <ButtonConatiner>
          <PlayerButton
            isPlay={isPlay}
            togglePlayerButton={this.togglePlayerButton}
          />
          <ToDosButton
            curDo={curDo}
            toggleToDo={this._toggleToDo}
            isToDoClick={isToDoClick}
            isStudy={isStudy}
          />
          <SettingButton
            isSettingClick={isSettingClick}
            toggleSetting={this._toggleSetting}
            isStudy={isStudy}
          />
        </ButtonConatiner>
      </ThemeProvider>
    );
  }
}

const ButtonConatiner = styled.div`
  position: absolute;
  left: 20px;
  top: 15px;
  height: 50px;
  width: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
