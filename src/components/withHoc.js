import React, { Component } from 'react'
import img1 from '../testImages/download.jpeg'
import img2 from '../testImages/foul1.jpeg'
import img3 from '../testImages/foul1.jpeg'

const withHoc = WrappedComponet => {
    class WithHOC extends Component {
        constructor(props) {
            super(props)

            this.state = {
                arr: [
                    {
                        id: 0,
                        img: img1
                    },
                    {
                        id: 1,
                        img: img2
                    },
                    {
                        id: 2,
                        img: img3
                    }
                ]
            }
        }

        render() {
            return (
                <div>
                    <WrappedComponet arr={this.state.arr} />
                </div>
            )
        }
    }
    return WithHOC
}

export default withHoc
