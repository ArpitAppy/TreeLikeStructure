/* Section component to show the section. It contains all the html and css properties of the Section div
and funtion to perform onclick events*/

import React, { Component } from 'react';
import '../public/CSS/main.css';
import { FaArrowsAlt, FaPlusCircle, FaRegEdit, FaRegWindowClose } from 'react-icons/fa';


class Section extends Component {
    addSubFolder = () => {
        this.props.addSubFolder()
    }

    // addNewElement to add new child Section component
    addNewElement = () => {
        const newElement = prompt("Enter a Value to Create a New Child Section");
        this.props.addSubFolder(this.props.id, newElement)
    }

    //updateElement to update Section component value
    updateElement = () => {
        const updElement = prompt("Enter a New Value for the Section");
        this.props.updateFolder(this.props.id, updElement)
    }

    // toggleDiv = () => {
    //     const updShow = false;
    //     this.props.toggleDiv(this.props.id, updShow)
    // }

    render() {
        return (
            <div className="section-icon-content">
            <div className="section-content-line" style={{width: 28 * this.props.space}}></div>
                <div style={{ backgroundColor: this.props.color, marginLeft: 30 * this.props.space }} className="section-content">
                    <p><span className="content-main"> {this.props.value} </span>
                    <span className="content-main-arrow"> <FaArrowsAlt /> </span>
                     </p>
                </div>
                <div className="section-icons">
                    <FaPlusCircle onClick={this.addNewElement} /> <FaRegEdit onClick={this.updateElement} /> <FaRegWindowClose onClick={() => this.props.deleteFolder(this.props.id)} />
                </div>
            </div >
        );
    }
}

export default Section;