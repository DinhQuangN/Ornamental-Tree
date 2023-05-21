// import Editor from '@/admin/components/CheckEditor'
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/lib/Dialog'
// import { Form, Input, Upload, notification } from 'antd'
// import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload'
// import { useState } from 'react'

// export type CustomRequestOptions<T = any> = Parameters<
//   Exclude<UploadProps<T>['customRequest'], undefined>
// >[0]

// export interface ImageList {
//   uid?: string
//   image: string
// }

// export interface DataAccessory {
//   _id: string
//   title: string
//   price: string
//   describe: string
//   imageArray: ImageList[]
//   detail: string
// }

// interface AccessoryProps {
//   open?: boolean
//   onOpenChange?: (value: boolean) => void
// }

// const FormAccessory = ({ open, onOpenChange }: AccessoryProps) => {
//   const [fileList, setFileList] = useState<UploadFile<File>[]>([])
//   const [image, setImage] = useState<ImageList[]>([])
//   const handleChange: UploadProps['onChange'] = (info) => {
//     if (info.file.status === 'done') {
//       notification.success({
//         message: 'Thong bao',
//         description: info.file.name + 'file uploaded successfully',
//       })
//     } else if (info.file.status === 'error') {
//       notification.error({
//         message: 'Thong bao',
//         description: info.file.name + 'file upload failed.',
//       })
//     }
//     setFileList(info.fileList)
//   }
//   const serveUpLoad = async (option: CustomRequestOptions) => {
//     const { onSuccess, file, onError } = option
//     try {
//       for (let i = 0; i < fileList.length; i++) {
//         const formData = new FormData()
//         formData.append('file', file)
//         formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET)
//         formData.append('cloud_name', import.meta.env.VITE_CLOUD_NAME)
//         const res = await fetch(
//           'https://api.cloudinary.com/v1_1/dinhquang/image/upload',
//           {
//             method: 'POST',
//             body: formData,
//           }
//         )
//         const data = await res.json()
//         setImage([
//           ...image,
//           { uid: (file as RcFile).uid, image: data.secure_url },
//         ])
//       }
//       onSuccess?.('ok')
//     } catch (err: any) {
//       onError?.(err)
//     }
//   }
//   const handleRemove = (file: UploadFile) => {
//     setImage(image.filter((x) => x.uid !== (file as RcFile).uid))
//   }
//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="top-[10%] w-2/3 bg-white">
//         <DialogHeader>
//           <DialogTitle className="text-6xl">Form Phu kien</DialogTitle>
//           {/* <Table columns={columns} dataSource={data} /> */}
//           <Form
//             autoComplete="off"
//             layout="vertical"
//             onFinish={(values) => {
//               console.log({ values })
//             }}
//           >
//             <Form.Item
//               name="title"
//               label="Nhập tên sản phẩm"
//               className="[&.ant-form-item_label]:text-3xl"
//               rules={[
//                 {
//                   required: true,
//                   message: 'Vui lòng nhập tên sản phẩm',
//                 },
//                 { whitespace: true },
//                 { min: 3 },
//               ]}
//               hasFeedback
//             >
//               <Input placeholder="Nhập tên sản phẩm" size="large" />
//             </Form.Item>
//             <Form.Item
//               name="describe"
//               label="Nhập mô tả sản phẩm"
//               className="[&.ant-form-item_label]:text-3xl"
//               rules={[
//                 {
//                   required: true,
//                   message: 'Vui lòng nhập mô tả sản phẩm',
//                 },
//                 { whitespace: true },
//                 { min: 3 },
//               ]}
//               hasFeedback
//             >
//               <Editor />
//             </Form.Item>
//             <Form.Item
//               name="upload"
//               label="Nhập mô tả sản phẩm"
//               className="[&.ant-form-item_label]:text-3xl"
//               rules={[
//                 {
//                   required: true,
//                   message: 'Vui lòng nhập mô tả sản phẩm',
//                 },
//               ]}
//             >
//               <Upload
//                 multiple
//                 accept=".png,.jpg,.jpeg"
//                 listType="picture-card"
//                 fileList={fileList}
//                 onChange={handleChange}
//                 customRequest={serveUpLoad}
//                 // onPreview={handlePreview}
//                 onRemove={handleRemove}
//               >
//                 <p className="flex flex-col items-center justify-center gap-4">
//                   <i className="fas fa-plus"></i>
//                   <span>Upload</span>
//                 </p>
//               </Upload>
//             </Form.Item>
//             <Form.Item
//               name="detail"
//               label="Nhập chi tiet sản phẩm"
//               className="[&.ant-form-item_label]:text-3xl"
//               rules={[
//                 {
//                   required: true,
//                   message: 'Vui lòng nhập mô tả sản phẩm',
//                 },
//                 { whitespace: true },
//                 { min: 3 },
//               ]}
//               hasFeedback
//             >
//               <Editor />
//             </Form.Item>
//             <Form.Item>
//               <button type="submit">Save</button>
//             </Form.Item>
//           </Form>
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default FormAccessory

const FormAccessory = () => {
  return <div>FormAccessory</div>
}

export default FormAccessory
