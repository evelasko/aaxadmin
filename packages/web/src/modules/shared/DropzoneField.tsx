import * as React from "react"
import { FieldProps } from "formik"
import Dropzone from "react-dropzone"
import { Button } from "antd"

const baseStyle = { width: '100%', height: 100, padding: 15, borderWidth: 2, borderColor: '#666', borderStyle: 'dashed', borderRadius: 5 }
const disabledStyle = { display: 'none' }

export const DropzoneField: React.SFC<FieldProps<any>> = 
  ({ field: { name, value }, form: { setFieldValue, values, setValues }, ...props }) => {
  const { imageURL } = values
  return (
    <div>
      <Dropzone
        accept="image/*"
        disabled={!!value || !!imageURL}
        style={(!!value || !!imageURL) ? disabledStyle : baseStyle }
        multiple={false}
        onDrop={ ([file]) => { setFieldValue(name, file) } }
        {...props}
      >
        <p style={{margin: 10}}>Image: drop or click to select</p>
      </Dropzone>
      { 
        !value && imageURL ?  
          <img src={imageURL} style={{ maxHeight: 200, width: '100%', objectFit: 'cover' }} /> 
          : 
          value && ( <img src={value.preview} style={{ maxHeight: 200, width: '100%', objectFit: 'cover' }} /> ) 
      }
      {
      (!!value || !!imageURL) && <Button style={{marginTop: '15'}} onClick={() => { setFieldValue(value ? name : 'imageURL', null) } }>eliminar</Button>
      }
    </div>
  )
}