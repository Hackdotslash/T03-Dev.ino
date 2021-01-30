import React from "react";
import {
  TextField,
  InputAdornment,
  IconButton,

} from "@material-ui/core";
import FileCopy from "@material-ui/icons/FileCopy";

export default function UploadDocs(props) {
  const [urlCount, setUrlCount] = React.useState(props.value.imageFiles.length);

  // const handleUpload = () => {
  //   setLoading(true);
  //   uploadDocuments(
  //     imageFiles,
  //     props.patId,
  //     props.value,
  //     props.setValue,
  //     setLoading
  //   );
  // };

  return (
    <>
      <TextField
        id="upload"
        name="upload"
        label="Upload documents"
        onChange={props.getValue}
        value={urlCount !== 0 ? urlCount + " documents selected" : ""}
        color="secondary"
        fullWidth
        autoComplete="Doc Links"
        error={props.value.isError.imgURL}
        helperText={props.value.isError.imgURL && "Select your profile picture"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <input
                accept="image/*"
                style={{
                  display: "none",
                }}
                type="file"
                id="icon-button-file"
                onChange={(event) => {
                  props.setValue({
                    ...props.value,
                    imageFiles: props.value.imageFiles.concat(
                      Array.from(event.target.files)
                    ),
                  });

                  setUrlCount(
                    event.target.files.length + props.value.imageFiles.length
                  );
                  
                }}
                multiple
              />

              <label htmlFor="icon-button-file">
                <IconButton component="span">
                  <FileCopy />
                </IconButton>
              </label>
            </InputAdornment>
          ),
        }}
      />
      <div></div>
    </>
  );
}
