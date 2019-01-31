// import * as React from 'react'
// import { Upload, Icon, Modal } from 'antd'
// import { FieldProps } from "formik"


// export const AntDropzoneField: React.SFC<FieldProps<any>> = ({
//     field: { name, value },
//     form: { setFieldValue, values, setValues },
//     ...props
//     }) => {
//     //   state = {
//     //     previewVisible: false,
//     //     previewImage: '',
//     //     fileList: [{
//     //       uid: '-1',
//     //       name: 'xxx.png',
//     //       status: 'done',
//     //       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     //     }],
//     //   };
//     const fileList = []
//     if (values.imageURL) {
//         fileList.push({status: 'done', url: values.imageURL})
//     }

//     const handleCancel = () => this.setState({ previewVisible: false })

//     const handlePreview = (file: any) => {
//         this.setState({
//         previewImage: file.url || file.thumbUrl,
//         previewVisible: true,
//         });
//     }

//     // handleChange = ({ fileList }) => this.setState({ fileList })


//     const { setFieldValue, values } = this.props.form
//     const { name, value } = this.props.field
//     // const { previewVisible, previewImage, fileList } = this.state

//     const uploadButton = (
//       <div>
//         <Icon type="plus" />
//         <div className="ant-upload-text">Upload</div>
//       </div>
//     )
//     return (
//       <div className="clearfix">
//         <Upload
//             accept={}
//             // action="//jsonplaceholder.typicode.com/posts/"
//             listType="picture-card"
//             // fileList={fileList}
//             onPreview={handlePreview}
//             onChange={(info) => { console.log('Changed: ', info) }}
//         >
//           {fileList.length >= 1 ? null : uploadButton}
//         </Upload>
//         <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
//           <img alt="example" style={{ width: '100%' }} src={previewImage} />
//         </Modal>
//       </div>
//     );
  
// }
