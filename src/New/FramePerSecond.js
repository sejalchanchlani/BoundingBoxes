
import VideoFrame from './VideoFrame';
import { getInitialCropFromCroppedAreaPixels } from 'react-easy-crop';
import React, { Component } from 'react';

export default class FramePerSecond extends Component {
    getFPS(){
        let currentFrame = document.getElementById("currentFrame");
        var video = new VideoFrame({
            id : 'video',
            frameRate: 25,
            callback : function(frame) {
                currentFrame.innerHTML = frame ;
            }
        });
          if (video.video.paused) {
            video.video.play();
            video.listen('frame');
            
            this.innerHTML = 'Play';
          //  this.innerHTML = 'Pause';
    
          } 
          else {
            video.video.pause();
            video.stopListen();
            this.innerHTML = 'Play';
          }
    } 
  render() {
    
    return (
        <div>
            <div class="frame">  
      <span id="currentFrame">0</span>
      </div>
    
    <video height="180" width="100%" id="video"> 
      <source src="http://www.w3schools.com/html/mov_bbb.mp4"></source>
    </video>
    
    <div id="controls">
      <button id="play-pause" onClick={()=>{this.getFPS()}}>Play</button>
    </div>
        </div>
      );
  }
}
