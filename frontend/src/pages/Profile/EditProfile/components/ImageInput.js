import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Icon } from '@material-ui/core';

import { profileActions } from  'modules/profile/profileActions';


class ImageInput extends Component {
  handleImageChange(e){
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.props.handleImageChange(file, reader.result);
    };

    if(file) {
      reader.readAsDataURL(file);

      const data = new FormData()
      data.append('file', file);

      for (var pair of data.entries()) {
          console.log(pair[0]);
          console.log(pair[1])
      }
    }
  }

  render() {
    let {image, currentImage} = this.props;
    let iconClass;

    if(image || currentImage) { //exists
      iconClass = "has-image";
    }

    if(currentImage && !image) {
      image = `/profile-images/${currentImage}?${Date.now()}`;
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
        <label className="image-label center" htmlFor="raised-button-file">
          <div className="image-container" style={{backgroundImage: `url("${image}")` }}>
            <div className="image-plus"><Icon className={iconClass} style={{color: image ? "#ffffff90" : "#00000080"}}>add_circle_outline</Icon></div>
          </div>
        </label>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let { file, data } = state.profile.changes.image;
  let { image_path } = state.user.data;

  return {
    file,
    image: data,
    currentImage: image_path,
  };
}

const mapDispatchToProps = {
  handleImageChange: profileActions.handleImageChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageInput);
