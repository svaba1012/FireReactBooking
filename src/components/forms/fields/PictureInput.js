import { useDropzone } from "react-dropzone";
import { useForm } from "react-final-form";
import { useState, useMemo } from "react";

function renderMainPicDiv() {
  return (
    <div
      style={{
        backgroundColor: "blue",
        borderBottomRightRadius: "10px",
        padding: "5px",
        position: "absolute",
        zIndex: 10,
      }}
    >
      Glavna slika
    </div>
  );
}

function PictureInput(props) {
  function renderErrorMsg(fileNum) {
    if (props.meta.submitFailed) {
      if (fileNum < 3) {
        return <div className="text-danger h4">*Minimalan broj slika je 3</div>;
      } else if (fileNum > 10) {
        return (
          <div className="text-danger h4">*Maksimalan broj slika je 10</div>
        );
      }
    }
  }
  let [selectedFiles, setSelectedFiles] = useState([]);
  let [selectedImage, setSelectedImage] = useState(0);
  let { change } = useForm();
  const dropZone = useDropzone({
    accept: { "image/png": [".png"] },
    onDropAccepted: async (acceptedFiles) => {
      change("pics", [...selectedFiles, ...acceptedFiles]);
      await setSelectedFiles([...selectedFiles, ...acceptedFiles]);
    },
  });
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragAccept,
    isFocused,
    isDragReject,
  } = dropZone;

  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20vh",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const focusedStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };

  if (
    props.meta.submitFailed &&
    (selectedFiles.length < 3 || selectedFiles.length > 10)
  ) {
    baseStyle.borderColor = "#ff1744";
    focusedStyle.borderColor = "#ff1744";
    acceptStyle.borderColor = "#ff1744";
  }

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const files = selectedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Prevuci ili klikni za ubacivanje slika {props.meta.error}</p>
      </div>
      <aside>
        {renderErrorMsg(selectedFiles.length)}
        {/* <h4>Files</h4>
        <ul>{files}</ul> */}
        <div
          style={{
            display: "flex",
            marginBottom: "20px",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          {selectedFiles.map((file, id) => {
            let imgUrl = URL.createObjectURL(file);
            let imageBorder = "1px solid #ddd";
            if (id === selectedImage) {
              imageBorder = "3px solid blue";
            }
            return (
              <div
                key={id}
                style={{
                  width: "40vh",
                  position: "relative",
                  marginRight: "20px",
                  marginBottom: "20px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSelectedImage(id);
                  change("mainPicId", id);
                }}
              >
                {id === selectedImage ? renderMainPicDiv() : ""}
                <div style={{ position: "relative" }}>
                  <img
                    src={imgUrl}
                    style={{
                      width: "40vh",
                      height: "40vh",
                      border: imageBorder,
                      borderRadius: "4px",
                      padding: "5px",
                      objectFit: "cover",
                    }}
                    key={id}
                    alt="Slika"
                  ></img>
                  <div
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "5px",
                      zIndex: 3,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      URL.revokeObjectURL(file.preview);
                      change(
                        "pics",
                        selectedFiles.filter((el, i) => i !== id)
                      );
                      setSelectedFiles(
                        selectedFiles.filter((el, i) => i !== id)
                      );
                      if (id < selectedImage) {
                        change("mainPicId", selectedImage - 1);
                        setSelectedImage(selectedImage - 1);
                      } else if (id === selectedImage) {
                        change("mainPicId", 0);
                        setSelectedImage(0);
                      }
                    }}
                  >
                    <i
                      className="bi bi-x-circle-fill"
                      style={{
                        color: "red",
                        fontSize: "xx-large",
                        cursor: "pointer",
                      }}
                    ></i>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </aside>
    </section>
  );
}

export default PictureInput;
