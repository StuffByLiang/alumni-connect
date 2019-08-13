import React, { Component } from 'react';

import { Icon } from '@material-ui/core';


export default class ImageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
  }

  handleImageChange(e){
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    if(file) //exists
      reader.readAsDataURL(file);
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let iconClass;

    if(imagePreviewUrl) { //exists
      iconClass = "has-image";
    }

    return (
      <div id="image-input">
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          onChange={(e)=>this.handleImageChange(e)}
        />
        <label className="image-label" htmlFor="raised-button-file">
          <div className="image-container" style={{backgroundImage: `url("${imagePreviewUrl}")` }}>
            <div className="image-plus"><Icon className={iconClass} style={{color: imagePreviewUrl ? "#ffffff90" : "#00000080"}}>add_circle_outline</Icon></div>
          </div>
        </label>
      </div>
    );
  }
}
