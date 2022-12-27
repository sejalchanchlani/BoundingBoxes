import React,{useState} from 'react'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'
import ReactEasyCrop from 'react-easy-crop';
// const ImageCrop=()=>{
//     const [src,selectFile]=useState(null)
//    const handleFileChange =e=>{
//     selectFile(URL.createObjectURL(e.target.files[0]))
//    }
//    const [image,setImage]=useState(null);
//    const [crop,setCrop]=useState({aspect:16/9})
   
//    return(
//     <div className='container'>
//         <div className='row'>
//             <div className='col-6'>
//                 <input type='file' accept='image/*' onChange={handleFileChange}/>

//             </div>
//             <div className='col-6'>
//                 {src &&(
//                     <ReactCrop src={src} onImageLoaded={setImage} crop={crop} onChange={setCrop}/>
                   
              
//                 )}
//             </div>
//         </div>
//     </div>
// )
// }
// export default ImageCrop;

const ImageCrop = () => {
    const [crop, setCrop] = React.useState({ x: 0, y: 0 })
    
    const onCropComplete = React.useCallback((croppedArea, croppedAreaPixels) => {
      console.log(croppedArea, croppedAreaPixels)
    }, [])
    return (
      <div >
        <div >
         <ReactEasyCrop image="https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
            crop={crop}
           
            aspect={4 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
           
          />
        </div>
      </div>
    )
  }
  export default ImageCrop;