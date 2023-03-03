import { useDropzone } from "react-dropzone";
import { useForm } from "react-final-form";
import { useState, useMemo } from "react";

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
  console.log(props.meta);
  let [selectedFiles, setSelectedFiles] = useState([]);
  let { change } = useForm();
  // change("pics, selectedFiles");
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
        <h4>Files</h4>
        <ul>{files}</ul>
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
            return (
              <div
                style={{
                  width: "40vh",
                  position: "relative",
                  marginRight: "20px",
                  marginBottom: "20px",
                }}
              >
                <img
                  src={imgUrl}
                  style={{
                    width: "40vh",
                    height: "40vh",
                    border: "1px solid #ddd",
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
                    URL.revokeObjectURL(file.preview);
                    setSelectedFiles(selectedFiles.filter((el, i) => i !== id));
                  }}
                >
                  <i
                    class="bi bi-x-circle-fill"
                    style={{
                      color: "red",
                      fontSize: "xx-large",
                      cursor: "pointer",
                    }}
                  ></i>
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
