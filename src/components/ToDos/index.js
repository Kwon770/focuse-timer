import React from "react";
import Panel from "./ToDosPanel";

export default class ToDosPresenter extends React.Component {
  state = {
    isEditMode: false,
  };

  addToDo = (name) => {
    let newToDos = [];
    this.props.toDos.map((toDo) => {
      toDo.isSelected = false;
      newToDos.push(toDo);
    });
    newToDos.splice(1, 0, {
      id: Date.now(),
      isButton: false,
      isSelected: false,
      name: name,
      totalTime: 0,
      todayTime: 0,
      isDone: false,
    });
    this.props.reallocateToDos(newToDos);
  };

  deleteToDo = (id) => {
    let newToDos = [];
    this.props.toDos.map((toDo) => {
      if (toDo.id !== id) newToDos.push(toDo);
    });
    this.props.reallocateToDos(newToDos);
  };

  editToDo = (id) => {
    let newToDos = [];
    this.props.toDos.map((toDo) => {
      if (toDo.id === id) {
        toDo.isEdit = true;
      } else if (toDo.isEdit) {
        toDo.isEdit = false;
      }
      newToDos.push(toDo);
    });
    this.props.reallocateToDos(newToDos);
  };

  changeToDo = (id, name) => {
    let newToDos = [];
    this.props.toDos.map((toDo) => {
      if (toDo.id === id) {
        toDo.name = name;
        toDo.isEdit = false;
      }
      newToDos.push(toDo);
    });
    this.props.reallocateToDos(newToDos);
  };

  selectToDo = (id) => {
    let newToDos = [];
    this.props.toDos.map((toDo) => {
      if (toDo.id === id) {
        this.props.setCurDo(toDo.name, toDo.id);
        toDo.isSelected = true;
        newToDos.splice(0, 0, toDo);
      } else {
        toDo.isSelected = false;
        newToDos.push(toDo);
      }
    });

    this.props.reallocateToDos(newToDos);
  };

  toggleToDoProgress = (id) => {
    let newToDos = [];
    this.props.toDos.map((toDo) => {
      if (toDo.id === id) {
        toDo.isDone = !toDo.isDone;
      }
      newToDos.push(toDo);
    });
    this.props.reallocateToDos(newToDos);
  };

  toggleEditMode = () => {
    let newToDos = [];
    if (this.state.isEditMode) {
      this.props.toDos.map((toDo) => newToDos.push(toDo));
      newToDos.splice(0, 1);
    } else {
      newToDos.push({
        id: 123456789,
        isButton: true,
      });
      this.props.toDos.map((toDo) => {
        toDo.isEdit = false;
        newToDos.push(toDo);
      });
    }
    this.props.reallocateToDos(newToDos);
    this.setState({ isEditMode: !this.state.isEditMode });
  };

  render() {
    return (
      <Panel
        toDos={this.props.toDos}
        addToDo={this.addToDo}
        deleteToDo={this.deleteToDo}
        isEditMode={this.state.isEditMode}
        editToDo={this.editToDo}
        changeToDo={this.changeToDo}
        selectToDo={this.selectToDo}
        toggleToDoProgress={this.toggleToDoProgress}
        toggleEditMode={this.toggleEditMode}
      />
    );
  }
}
