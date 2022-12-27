import React, { Component } from 'react'
import { Helmet } from "react-helmet";
import $ from 'jquery';

// var $ = require( "jquery" );

class ImgZoom extends Component {
    constructor(props) {
        super(props)

        this.state = {
            script: null,
            point1: [2, 3],
            point2: [4, 2]
        }
        this.clickMe = this.clickMe.bind(this)
    }

    componentDidMount() {


    }

    clickMe() {
        console.log(this.state.point < 3 ? true : false)


    }

    render() {
        return (
            <div>
                <div id='colorPicker'></div>
                <button id='btn2' onClick={this.clickMe}> ASASAS </button>
                <p id='test'>as as as</p>
            </div>
        )
    }
}

export default ImgZoom



