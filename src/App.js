import React, { Component } from 'react';
import Section from './components/Section';
import './public/CSS/main.css';
import { FaPlusCircle, FaRegEdit, FaRegWindowClose } from 'react-icons/fa';
import Collapsible from 'react-collapsible';

let root = {
  id: 'root',
  value: "root",
  space: 1,
  // show: true
}


const returnArray = [];

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      root: root
    }
  }

  addSubFolder = (id, value, element = this.state.root) => {
    const tempRoot = element;
    const elementKeys = Object.keys(tempRoot);
    elementKeys.map(key => {
      if (tempRoot[key] === id) {
        tempRoot[value] = {
          id: value,
          value: value,
          space: tempRoot.space + 1,
          // show: true
        }
      } else if (typeof (tempRoot[key]) === "object") {
        this.addSubFolder(id, value, element[key])
      }
    })
    this.setState({
      root: tempRoot
    });
    returnArray.length = 0
  }

  deleteOneFolder(id, obj) {
    var clone = {};
    for (var i in obj) {
      if (id !== i) {
        if (obj[i] != null && typeof (obj[i]) == "object")
          clone[i] = this.deleteOneFolder(id, obj[i]);
        else
          clone[i] = obj[i];
      }
    }
    return clone
  }

  deleteFolder = (id, obj = this.state.root) => {
    const folderAfterDelete = this.deleteOneFolder(id, obj)
    this.setState({
      root: folderAfterDelete
    })
    returnArray.length = 0
  }

  updateOneFolder(id, updatedValue, obj) {
    var clone = {};
    for (var i in obj) {
      if (id !== i) {
        if (obj[i] != null && typeof (obj[i]) == "object")
          clone[i] = this.updateOneFolder(id, updatedValue, obj[i]);
        else
          clone[i] = obj[i];
      } else {
        clone[updatedValue] = Object.assign({}, obj[i], { id: updatedValue, value: updatedValue });
      }
    }
    return clone
  }

  updateFolder = (id, updatedValue, obj = this.state.root) => {
    const folderAfterDelete = this.updateOneFolder(id, updatedValue, obj)
    this.setState({
      root: folderAfterDelete
    })
    returnArray.length = 0
  }

  // toggleDiv = (id, updShow, element = this.state.root) => {
     
  //   this.setState({
  //     root: element
  //   })
  //   returnArray.length = 0
  // }

  renderScreen(element) {
    const elementKeys = Object.keys(element)
    elementKeys.map(key => {
      if (typeof (element[key]) === "string" && key === "id") {
        returnArray.push(<Section space={element['space']} color={elementKeys.length === 3 ? '#DCAE1D' : '#00303F'} addSubFolder={this.addSubFolder} deleteFolder={this.deleteFolder}
          updateFolder={this.updateFolder} id={element.id} value={element.value} />)
      } else if (typeof (element[key]) === "object") {
        this.renderScreen(element[key])
      }
    })
    return returnArray;
  }

  render() {
    
    return (
      <div style={{marginLeft: "50px" }}> <h1>Tree Like Strucutre</h1>
       <div className="section-content-terminology">
        <div style={{backgroundColor: '#DCAE1D'}}><p>Terminal Section</p></div>
        <div style={{backgroundColor: '#00303F', color: '#fff'}}><p>Non-Terminal Section</p></div>
        <div><FaPlusCircle />Add Child Section</div>
        <div><FaRegEdit />Edit Section</div>
        <div><FaRegWindowClose />Delete Section</div>
       </div>
      <div className="main-content" style={{ flex: 1, flexDirection: "column", display: "flex" }}>
        {this.renderScreen(this.state.root)}
      </div>
      </div>
    );
  }
}

export default App;
