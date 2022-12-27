import React, { Component } from 'react'

import img3 from '../images/images/foulOne.webp'

import $ from 'jquery'
import nextId from "react-id-generator"



import img1 from '../images/images/nlfa.jpeg'

import ImageCrop from '../components/ImageCrop'

class DeletRowAndBox extends Component {
    constructor(props) {
        super(props)
        this.inputRef1 = React.createRef()
        this.state = {
            point1: { "x1": 0, "y1": 0 },
            point2: { "x2": 0, "y2": 0 },
            widthRect: 0,
            heightRect: 0,
            widthImg: 0,
            heightImg: 0,
            tempImg: img3,
            rectInCanvas: false,
            isValidRect: false,
            isValidClass: false,
            foucsInputRef: false,
            rectColor: 'rgb(0, 255, 255)',
            rectData: [],
            boxes: [],
            fileName: 'road1.jpg',
            boxClass: null,
            classId: -1,
            rectangle_list: [],
            classType: "",
            croppedImage: [],
            startDraw: false,
            resize: false,
            resizeValue: undefined,
            btn1: false,
            btn2: false,
            btn3: false,
            btn4: false,
            mouseX: undefined,
            mouseY: undefined,
            closeEnough: 10,
            dragTL: false,
            dragBL: false,
            dragTR: false,
            dragBR: false,
            deleteRow: false

        }
        this.init = this.init.bind(this)
        this.mouseDown = this.mouseDown.bind(this)
        this.mouseUp = this.mouseUp.bind(this)
        this.mouseMove = this.mouseMove.bind(this)
        this.draw = this.draw.bind(this)
        this.handleSize = this.handleSize.bind(this)
        this.onImgLoad = this.onImgLoad.bind(this)
        this.drawImage = this.drawImage.bind(this)
        this.addRect = this.addRect.bind(this)
        this.showData = this.showData.bind(this)
        this.resetData = this.resetData.bind(this)
        this.finalSubmitt = this.finalSubmitt.bind(this)
        this.focusClassInput = this.focusClassInput.bind(this)
        this.inputBoxClass = this.inputBoxClass.bind(this)
        this.setBoundingBox = this.setBoundingBox.bind(this)
        this.resizeBox = this.resizeBox.bind(this)
        this.exportData = this.exportData.bind(this)
        this.checkCloseEnough = this.checkCloseEnough.bind(this)
        this.drawCircle = this.drawCircle.bind(this)
        this.drawHandles = this.drawHandles.bind(this)
    }

    init = () => {
        this.canvas.addEventListener('mousedown', this.mouseDown, false)
        this.canvas.addEventListener('mouseup', this.mouseUp, false)
        this.canvas.addEventListener('mousemove', this.mouseMove, false)
     
    }

    componentDidMount() {
        this.canvas = document.getElementById('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.rect = {}
        this.canvasX = this.canvas.offsetLeft
        this.canvasY = this.canvas.offsetTop
        this.drag = false
        this.drawImage(this.state.tempImg)
        this.init()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.isValidRect) {
            $('#classInput').prop('disabled', false)
        }
        else {
            $('#classInput').prop('disabled', true)
        }

        this.focusClassInput()

        if (this.state.isValidClass) {
            $('#addButton').prop('disabled', false)
        }
        else {
            $('#addButton').prop('disabled', true)
        }

        if (this.state.tempImg !== prevState.tempImg) {
            this.drawImage(this.state.tempImg)
        }
    }


    mouseUp = () => {
      

        if (this.state.startDraw) {

            this.drag = false
            if (this.state.widthRect == 0 || this.state.heightRect == 0) {
                this.setState({
                    isValidRect: false
                })
            }
            else {
                this.setState({
                    isValidRect: true,
                    foucsInputRef: true
                })
            }
            var rectangle_list = this.state.rectangle_list
            var new_id = parseInt(nextId().split("id")[1])
            const rect = { "id": new_id, "impactType": this.state.classId, "classType": this.state.classType, "rectx": this.rect.x, "recty": this.rect.y, "rectw": this.rect.w, "recth": this.rect.h }
            this.setState({
                rectangle_list: [...rectangle_list, rect]
            }, () => {
                this.draw()
            })

        }
    }

    checkCloseEnough = (p1, p2) => {
        return Math.abs(p1 - p2) < this.state.closeEnough;
    }

    mouseDown = (e) => {
        // if (this.state.resize) {
        //     this.setState({
        //         mouseX: e.pageX - this.canvasX,
        //         mouseY: e.pageY - this.canvasY
        //     })

        //     // if there isn't a rect yet
        //     if (this.rect.w === undefined) {


        //         this.rect.x = this.state.mouseY
        //         this.rect.y = this.state.mouseX
        //         this.setState({
        //             dragBR: true
        //         })
        //     }
        //     else if (this.checkCloseEnough(this.state.mouseX, this.rect.x) && this.checkCloseEnough(this.state.mouseY, this.rect.y)) {
        //         this.setState({
        //             dragTL: true
        //         })
        //     }
        //     else if (this.checkCloseEnough(this.state.mouseX, this.rect.x + this.rect.w) && this.checkCloseEnough(this.state.mouseY, this.rect.y)) {
        //         this.setState({
        //             dragTR: true
        //         })
        //     }
        //     else if (this.checkCloseEnough(this.state.mouseX, this.rect.x) && this.checkCloseEnough(this.state.mouseY, this.rect.y + this.rect.h)) {
        //         this.setState({
        //             dragBL: true
        //         })

        //     }
        //     else if (this.checkCloseEnough(this.state.mouseX, this.rect.x + this.rect.w) &&
        //         this.checkCloseEnough(this.state.mouseY, this.rect.y + this.rect.h)) {
        //         this.setState({
        //             dragBR: true
        //         })

        //     }

        //     else {
        //         // handle not resizing
        //     }

        //     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //     this.setState({
        //         point1: { "x1": this.rect.x, "y2": this.rect.y },
        //         point2: { "x2": 0, "y2": 0 },
        //         widthRect: 0,
        //         isValidRect: false,
        //         isValidClass: false,
        //         heightRect: 0,
        //         boxClass: ''
        //     })
        //     this.drag = true
        //     this.draw();

        // }
        if (this.state.startDraw) {
            this.rect.x = e.pageX - this.canvasX + 0
            this.rect.y = e.pageY - this.canvasY + 0
            this.rect.w = 0
            this.rect.h = 0
            this.setState({
                point1: { "x1": this.rect.x, "y2": this.rect.y },
                point2: { "x2": 0, "y2": 0 },
                widthRect: 0,
                isValidRect: false,
                isValidClass: false,
                heightRect: 0,
                boxClass: ''
            })
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.drag = true
        }
    }

    mouseMove = (e) => {
        // if (this.state.resize) {
        //     this.setState({
        //         mouseX: e.pageX - this.canvasX,
        //         mouseY: e.pageY - this.canvasY
        //     })
        //     if (this.state.dragTL) {
        //         this.rect.w += this.rect.x - this.state.mouseX;
        //         this.rect.h += this.rect.y - this.state.mouseY;
        //         this.rect.x = this.state.mouseX;
        //         this.rect.y = this.state.mouseY;
        //     } else if (this.state.dragTR) {
        //         this.rect.w = Math.abs(this.rect.x - this.state.mouseX);
        //         this.rect.h += this.rect.y - this.state.mouseY;
        //         this.rect.y = this.state.mouseY;
        //     } else if (this.state.dragBL) {
        //         this.rect.w += this.rect.x - this.state.mouseX;
        //         this.rect.h = Math.abs(this.rect.y - this.state.mouseY);
        //         this.rect.x = this.state.mouseX;
        //     } else if (this.state.dragBR) {
        //         this.rect.w = Math.abs(this.rect.x - this.state.mouseX);
        //         this.rect.h = Math.abs(this.rect.y - this.state.mouseY);
        //     }
        //     if (this.drag) {
        //         this.setState({
        //             point2: {
        //                 "x2": this.rect.x > (this.rect.x + this.rect.w) ?
        //                     this.rect.x : (this.rect.x + this.rect.w),
        //                 "y2": this.rect.y > (this.rect.y + this.rect.h) ?
        //                     this.rect.y : (this.rect.y + this.rect.h)
        //             },
        //             point1: {
        //                 "x1": this.rect.x < (this.rect.x + this.rect.w) ?
        //                     this.rect.x : (this.rect.x + this.rect.w),
        //                 "y1": this.rect.y < (this.rect.y + this.rect.h) ?
        //                     this.rect.y : (this.rect.y + this.rect.h)
        //             },
        //             widthRect: Math.abs(this.rect.w),
        //             heightRect: Math.abs(this.rect.h)
        //         })
        //     }
        //     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //     this.draw();
        // }

        if (this.state.startDraw) {
            if (this.drag) {
                this.rect.w = (e.pageX - this.canvasX) - this.rect.x
                this.rect.h = (e.pageY - this.canvasY) - this.rect.y
                this.setState({
                    point2: {
                        "x2": this.rect.x > (this.rect.x + this.rect.w) ?
                            this.rect.x : (this.rect.x + this.rect.w),
                        "y2": this.rect.y > (this.rect.y + this.rect.h) ?
                            this.rect.y : (this.rect.y + this.rect.h)
                    },
                    point1: {
                        "x1": this.rect.x < (this.rect.x + this.rect.w) ?
                            this.rect.x : (this.rect.x + this.rect.w),
                        "y1": this.rect.y < (this.rect.y + this.rect.h) ?
                            this.rect.y : (this.rect.y + this.rect.h)
                    },
                    widthRect: Math.abs(this.rect.w),
                    heightRect: Math.abs(this.rect.h)
                })
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                this.draw()
            }
        }
    }

    draw = () => {
        // if (this.state.resize) {
        //     this.ctx.lineWidth = 3
        //     this.ctx.strokeStyle = this.state.rectColor
        //     this.ctx.strokeRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h)
        //     this.drawHandles()
        // }

        if (this.state.deleteRow) {
            this.ctx.lineWidth = 3
            this.state.rectangle_list.map(
                ({ id, impactType, rectx, recty, rectw, recth }) => {
                    if (impactType == 1) {
                        this.ctx.strokeStyle = "rgb(255,0,0)"
                        // this.state.classType = "head to head"
                    }
                    else if (impactType == 2) {
                        this.ctx.strokeStyle = "rgb(0,255,0)"
                        // this.state.classType="head to shoulder"
                    }
                    else if (impactType == 3) {

                        this.ctx.strokeStyle = "rgb(255,255,0)"
                        // this.state.classType = "shoulder to shoulder"
                    }
                    else {

                        this.ctx.strokeStyle = "rgb(0,0,255)"
                    }

                    this.ctx.strokeRect(rectx, recty, rectw, recth)
                })
        } else {



            this.ctx.lineWidth = 3
            this.ctx.strokeStyle = this.state.rectColor
            this.ctx.strokeRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h)

            // this.ctx.strokeRect(this.state.rectx, this.state.recty, this.state.rectw, this.state.recth)
            console.log(this.state.rectangle_list.length)
            this.state.rectangle_list.map(
                ({ id, impactType, rectx, recty, rectw, recth }) => {
                    if (impactType == 1) {
                        this.ctx.strokeStyle = "rgb(255,0,0)"
                        // this.state.classType = "head to head"
                    }
                    else if (impactType == 2) {
                        this.ctx.strokeStyle = "rgb(0,255,0)"
                        // this.state.classType="head to shoulder"
                    }
                    else if (impactType == 3) {

                        this.ctx.strokeStyle = "rgb(255,255,0)"
                        // this.state.classType = "shoulder to shoulder"
                    }
                    else {

                        this.ctx.strokeStyle = "rgb(0,0,255)"
                    }

                    this.ctx.strokeRect(rectx, recty, rectw, recth)
                })
        }

    }

    drawCircle = (x, y, radius) => {
        this.ctx.fillStyle = "#FF0000";
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    drawHandles = () => {
        this.drawCircle(this.rect.x, this.rect.y, this.state.closeEnough);
        this.drawCircle(this.rect.x + this.rect.w, this.rect.y, this.state.closeEnough);
        this.drawCircle(this.rect.x + this.rect.w, this.rect.y + this.rect.h, this.state.closeEnough);
        this.drawCircle(this.rect.x, this.rect.y + this.rect.h, this.state.closeEnough);
    }

    exportData = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(this.state.rectangle_list)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "data.json";
        link.click();
    };

    onImgLoad({ target: img }) {
    }

    drawImage = (image) => {
        var x = new Image()
        x.src = image
        x.onload = () => {
            this.setState({
                widthImg: x.width,
                heightImg: x.height
            })
        }
    }

    handleSize(e) {
        this.setState({

            tempImg: e.target.value,
        })
    }

    handleFile = (event) => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.setState({
            point1: { "x1": 0, "y1": 0 },
            point2: { "x2": 0, "y2": 0 },
            widthRect: 0,
            heightRect: 0,
            boxes: [],
            foucsInputRef: false,
            isValidRect: false,
            isValidClass: false,
            boxClass: '',
            fileName: event.target.files[0].name,
            tempImg: URL.createObjectURL(event.target.files[0])
        })
    }

    addRect = () => {
        if (!this.state.isValidRect) {
            alert('invalid BoundingBox')
        }
        else if (this.state.boxClass == '') {
            $('#classInput').css('border', '1px solid red')

        }
        else {
            $('#classInput').css('border', '1px solid black')
            this.setState({
                boxes: [...this.state.boxes, { "id": this.state.fileName, "class": this.state.boxClass, "topLeft": this.state.point1, "bottomRight": this.state.point2 }],
                boxClass: ''
            })
        }
        document.getElementById('classInput').value = ''
    }

    finalSubmitt = () => {
        this.setState({
            rectData: [...this.state.rectData, [...this.state.boxes]]
        })
        const x = JSON.stringify(this.state.rectData)

    }

    showData() {
        const x = JSON.stringify(this.state.rectData)

        this.exportData()
    }

    resetData() {
        this.setState({
            rectData: [],
            boxes: [],
            rectangle_list: []
        })
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.draw()
    }

    disableButtons() {
        (async () => {

            // await writeJsonFile('user.json', this.state.rectData);
        })();
    }

    focusClassInput = () => {
        if (this.state.foucsInputRef && this.state.isValidRect)
            this.inputRef1.current.focus()
    }

    inputBoxClass = (e) => {
        this.setState({
            boxClass: e.target.value
        })
        this.setState({
            isValidClass: (this.state.boxClass == '') ? false : true
        })
    }

    setBoundingBox = (classIdFromButton) => {
        this.setState({
            startDraw: true
        })

        if (classIdFromButton == 1) {
            // this.ctx.strokeStyle = "rgb(255,0,0)"
            this.setState({
                rectColor: "rgb(255,0,0)",
                classType: "head-to-head",
                btn1: true,
                btn2: false,
                btn3: false,
                btn4: false

            })
        }
        else if (classIdFromButton == 2) {
            // this.ctx.strokeStyle = "rgb(0,255,0)"
            this.setState({
                rectColor: "rgb(0,255,0)",
                classType: "head-to-shoulder",
                btn1: false,
                btn2: true,
                btn3: false,
                btn4: false

            })
        }
        else if (classIdFromButton == 3) {
            // this.ctx.strokeStyle = "rgb(255,255,0)"
            this.setState({
                rectColor: "rgb(255,255,0)",
                classType: "shoulder-to-shoulder",
                btn1: false,
                btn2: false,
                btn3: true,
                btn4: false,
            })
        }
        else if (classIdFromButton == 4) {
            // this.ctx.strokeStyle = "rgb(0,0,255)"
            this.setState({
                rectColor: "rgb(0,0,255)",
                classType: "on Ground",
                btn1: false,
                btn2: false,
                btn3: false,
                btn4: true
            })
        }
        this.setState({
            classId: classIdFromButton,
            // classType:"shoulder-to-shoulder"
        })
    }

    deleteRowAndBox(number) {
        console.log("delete");
        const arrayCopy = this.state.rectangle_list.filter(row => { return row.id !== number });
        this.setState({ rectangle_list: arrayCopy, deleteRow: true },
            () => {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                this.draw()
                this.setState({
                    deleteRow: false
                })
            });

    }

    resizeBox = (number) => {
        let value = this.state.rectangle_list.filter((e) => (e.id == number))
        this.rect = value;
        this.rect = {
            x: value[0].rectx,
            y: value[0].recty,
            w: value[0].rectw,
            h: value[0].recth
        }

        console.log(this.rect)
        console.log("rect objec")
        // console.log("resize")
        // this.setState({
        //     resize: true,
        //     resizeValue: value,
        //     startDraw: false
        // })
    }



    render() {
        var mystyle = {

            backgroundImage: `url(${this.state.tempImg})`,
            margin: '20px 50px',
            border: '2px solid black'
        };

        return (

            <div>
                <div><button>+</button></div>
                <div className='mainContainer'>
                    <div className='leftContainer'>
                        <div style={{ width: "100%" }}>

                            <canvas id="canvas" style={mystyle} width={this.state.widthImg} height={this.state.heightImg}></canvas>
                        </div>
                        <div className='buttonDiv'>
                            <input type='text' ref={this.inputRef1} id='classInput' placeholder='className' onChange={this.inputBoxClass} style={{ height: '16px' }}></input>
                            <button type='submitt' id='addButton' title="add rectangle to dataset" onClick={this.addRect}> AddRect </button>
                            <button onClick={this.finalSubmitt}> FinalSubmitt </button>
                            <button onClick={this.showData}>Show Data</button>
                            <button onClick={this.resetData}>Reset Data</button>
                            <button onClick={this.disableButtons}>Disable Buttons</button>
                        </div>
                    </div>
                    <div className='rightContainer'>
                        <p><strong>(X1, Y1): </strong> ({this.state.point1.x1}, {this.state.point1.y1})</p>
                        <p><strong>(X2, Y2): </strong> ({this.state.point2.x2}, {this.state.point2.y2})</p>
                        <p><strong>Size: </strong> ({this.state.widthRect}X{this.state.heightRect})</p>
                        <form >
                            <label for="file-input"></label>
                            <input id="file-input" type="file" onChange={this.handleFile} />
                        </form>
                        <p id='demo'></p>

                    </div>
                </div >
                <div className='foulbuttondiv'>

                    <button disabled={this.state.btn1}
                        onClick={() => {
                            this.setBoundingBox(1)

                        }} class="head-to-head">Head to Head</button>
                    <button disabled={this.state.btn2}
                        onClick={() => {
                            this.setBoundingBox(2)

                        }} class="head-to-shoulder">Head to Shoulder</button>
                    <button disabled={this.state.btn3}
                        onClick={() => { this.setBoundingBox(3) }} class="shoulder-to-shoulder">Shoulder to Shoulder</button>
                    <button disabled={this.state.btn4}
                        onClick={() => { this.setBoundingBox(4) }} class="on-ground">On Ground</button>
                </div>
                <table>

                    <tr>
                        <th>id</th>
                        <th>ThumbNail</th>
                        <th>impactType</th>
                        <th>classType</th>
                        <th>recth</th>
                        <th>rectw</th>
                        <th>rectx</th>
                        <th>recty</th>

                    </tr>

                    {this.state.rectangle_list.map((val, key) => {
                        
                        if(val.recth!=0 && val.rectw!=0)
                        {
                                return(
                                <tr key={key}>
                                <td>{val.id}</td>
                                <td>{val.impactType}</td>
                                <td>{val.classType}</td>
                                <td>{val.recth}</td>
                                <td>{val.rectw}</td>
                                <td>{val.rectx}</td>
                                <td>{val.recty}</td>
                                <td><button onClick={() => { this.deleteRowAndBox(val.id) }}>Delete</button></td>
                                <td><button onClick={() => { this.resizeBox(val.id) }}>Resize</button></td>
                               
                               </tr>                                  )
                        }
                    
                        
                        
                    })}
                </table>
                            
             

            
            </div>
        )
    }
}

export default DeletRowAndBox