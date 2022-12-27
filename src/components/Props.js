import React, { Component } from 'react';
import Sample from './Sample';
import { useState } from 'react';
import { render } from '@testing-library/react';

class Props extends Component{
 constructor(props){
  super(props);
  this.state={
    data:1
  };
 }
 fun(){
  this.setState({data:this.state.data+1})
  
  alert("alert")
 }
render(){
  
  return (
    <div>
     <h1>hello {this.props.name}</h1>
      <h1>{this.state.data}</h1>
      <button onClick={()=>{this.fun()}}>Click me</button>
    
    </div>
  );
}
    
}
export default Props;