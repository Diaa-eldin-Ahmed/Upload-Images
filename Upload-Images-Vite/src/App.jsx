import { useState } from "react";
import "./App.css";

function App() {
    const [image, setImage] = useState("");
    const [noImageChosen, setNoImageChosen] = useState("");
    const fileChange = (e) => {
        setImage(e.target.files[0]);
        setNoImageChosen("Image chosen successfully");
    };
    const sendImage = () => {
        console.log(image);
        if (!image) {
            setNoImageChosen("You didn't choose any file");
        } else {
            let formData = new FormData();
            formData.append("image", image);
            fetch("http://localhost:4000/upload", {
                method: "POST",
                body: formData,
            })
                .then((res) => res.text())
                .then((data) => console.log(data));
            setNoImageChosen("Uploaded Successfully");
        }
    };
    return (
        <div className="App">
            <div className="form-container">
                <div className="upload-files-container">
                    <div className="second-container">
                        <label htmlFor="files" className="select-image-text">
                            Select Image
                        </label>
                        <span>{image ? image.name : "No image chosen"}</span>
                        <input
                            type="file"
                            id="files"
                            style={{ visibility: "hidden" }}
                            onChange={fileChange}
                        />
                        <div></div>
                        <div className="image-chosen">
                            {noImageChosen ? noImageChosen : ""}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="uploadBtn"
                        onClick={sendImage}
                    >
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
