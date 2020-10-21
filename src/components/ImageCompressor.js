import React from 'react'
import imageCompression from "browser-image-compression";

export class ImageCompressor extends React.Component {
    constructor() {
        super();
        this.state = {     //state variable (json format)
            compressedLink : 
            "",
            uploadImage_detail : "",
            uploadImage_Link : "",
            Isclicked : false,
            IsuploadImage : false
        };
    }

    handle = (e) => {
        const imageFile = e.target.files[0];
        //console.log(imageFile);
        //const url = URL.createObjectURL(imageFile);
        //console.log(url);
        this.setState({
            uploadImage_Link : URL.createObjectURL(imageFile),
            uploadImage : imageFile,
            outputFileName : imageFile.name,
            IsuploadImage : true
        });
        //console.log(this.state);
    };

    click = (e) => {
        e.preventDefault(); // prevent default selection

        const option = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker : true // optional
        };

        if (option.maxSizeMB >= this.state.uploadImage.size / 1024) {
            alert("Image is too small");
            return 0;
        }

        let outputFile;
        imageCompression(this.state.uploadImage, option).then(x => {
            outputFile = x; // output : compressed image (json format)
            //console.log(output);
            //console.log(output.size / 1024 / 1024,"MB");
            const downloadLink = URL.createObjectURL(outputFile);
            this.setState({
                compressedLink : downloadLink
            });
        });

        this.setState({
            Isclicked : true
        });
        return 1;
    };

    
    render() {
        return (
            <div>
                <h3>1. Upload Image</h3>
                <h3>2. Click on Compress</h3>
                <h3>3. Download Compressed Image</h3>
                <div>
                    {this.state.uploadImage ? (
                        <div src = {this.state.uploadImage_Link} />
                    ) : (
                        <></>
                    )}
                </div>
                <div>
                    <input type = "file" accept = "image/*" onChange = {e => this.handle(e)}></input> 
                </div>
                <div>
                    {this.state.outputFileName ? (
                        <button type = "button" onClick = {e => this.click(e)} >Compress</button>
                    ) : (
                        <></>
                    )}
                </div>
                <div>
                    <div src = {this.state.compressedLink} />
                    {this.state.Isclicked ? (
                        <a href = {this.state.compressedLink}
                        download = {this.state.outputFileName} >
                            Download
                        </a>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        )
    }
}

export default ImageCompressor
