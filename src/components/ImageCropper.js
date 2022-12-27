import React, { useCallback, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import $ from 'jquery'


// import demoImage from "./download.jpg";


function ImageCropper(props) {
    const [imageRef, setImageRef] = useState();
    let { imageToCrop, onImageCropped, crop } = props;



    async function cropImage(crop) {
        if (imageRef && crop.width && crop.height) {
            const croppedImage = await getCroppedImage(
                imageRef,
                crop,
                "croppedImage.jpeg"
            );
            console.log(croppedImage)
            onImageCropped(croppedImage);
        }
    }

    function getCroppedImage(sourceImage, cropConfig, fileName) {
        const canvas = document.createElement("canvas");

        const scaleX = sourceImage.naturalWidth / sourceImage.width;
        const scaleY = sourceImage.naturalHeight / sourceImage.height;
        canvas.width = cropConfig.width;
        canvas.height = cropConfig.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
            sourceImage,
            cropConfig.x * scaleX,
            cropConfig.y * scaleY,
            cropConfig.width * scaleX,
            cropConfig.height * scaleY,
            0,
            0,
            cropConfig.width,
            cropConfig.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                // returning an error
                if (!blob) {
                    reject(new Error("Canvas is empty"));
                    return;
                }

                blob.name = fileName;
                // creating a Object URL representing the Blob object given
                const croppedImageUrl = window.URL.createObjectURL(blob);

                resolve(croppedImageUrl);
            }, "image/jpeg");
        });
    }
    const handleChange = (e) => {
        setImageRef(e);
        cropImage({
            unit: 'px', // default, can be 'px' or '%'
            x: 130,
            y: 50,
            width: 200,
            height: 200
        })
    }
    const onLoad = useCallback(img => {
        imageRef.current = img

        const aspect = 16 / 9
        const width = img.width / aspect < img.height * aspect ? 100 : ((img.height * aspect) / img.width) * 100
        const height = img.width / aspect > img.height * aspect ? 100 : (img.width / aspect / img.height) * 100
        const y = (100 - height) / 2
        const x = (100 - width) / 2

        cropImage({
            unit: 'px', // default, can be 'px' or '%'
            x: 130,
            y: 50,
            width: 200,
            height: 200,
            aspect: 16 / 9,
        })

        return false // Return false if you set crop state in here.
    }, [])

    return (
        <>
        
            <ReactCrop
                src={imageToCrop}
                // style={{
                //     display: "none"
                // }}
                crop={{
                    unit: 'px',
                    x: crop.x,
                    y: crop.y,
                    width: crop.w,
                    height: crop.h
                }}
                ruleOfThirds
                onImageLoaded={(e) => {
                    console.log(e)
                    // cropImage(e)
                    handleChange(e)
                }}
                // onChange={
                //     (e) => {

                //     }
                // }
                onComplete={(e) => {
                    cropImage(e)
                }}
                crossorigin="anonymous"
            />

        </>
    );
}

ImageCropper.defaultProps = {
    onImageCropped: () => { }
};

export default ImageCropper;
