import Editor from '@/admin/components/CheckEditor'
import {
  Button,
  Form,
  FormInstance,
  Input,
  Modal,
  Upload,
  notification,
} from 'antd'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export type CustomRequestOptions<T = any> = Parameters<
  Exclude<UploadProps<T>['customRequest'], undefined>
>[0]

export interface ImageList {
  uid?: string
  image: string
}

export interface FormData {
  _id: string
  title: string
  price: string
  describe: string
  imageArray: ImageList[]
  detail: string
}

interface AccessoryProps {
  form: FormInstance
  open?: boolean
  onOpenChange?: (value: boolean) => void
  onChange?: (value: FormData) => void
}

const FormAccessory = ({
  form,
  open,
  onOpenChange,
  onChange,
}: AccessoryProps) => {
  const [fileList, setFileList] = useState<UploadFile<File>[]>([])
  const [image, setImage] = useState<ImageList[]>([])
  const { t } = useTranslation('common', {
    keyPrefix: 'common.admin.accessoryForm',
  })

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'done') {
      notification.success({
        message: t('notification'),
        description: info.file.name + t('fileUploadSuccess'),
      })
    } else if (info.file.status === 'error') {
      notification.error({
        message: t('notification'),
        description: info.file.name + t('fileUploadFaile'),
      })
    }
    setFileList(info.fileList)
  }
  const serveUpLoad = async (option: CustomRequestOptions) => {
    const { onSuccess, file, onError } = option
    try {
      for (let i = 0; i < fileList.length; i++) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET)
        formData.append('cloud_name', import.meta.env.VITE_CLOUD_NAME)
        const res = await fetch(
          'https://api.cloudinary.com/v1_1/dinhquang/image/upload',
          {
            method: 'POST',
            body: formData,
          }
        )
        const data = await res.json()
        setImage([
          ...image,
          { uid: (file as RcFile).uid, image: data.secure_url },
        ])
      }
      onSuccess?.('ok')
    } catch (err: any) {
      onError?.(err)
    }
  }
  const handleRemove = (file: UploadFile) => {
    setImage(image.filter((x) => x.uid !== (file as RcFile).uid))
  }
  return (
    <Modal
      title={t('accessory')}
      forceRender
      open={open}
      width={1000}
      onCancel={() => onOpenChange?.(false)}
      okButtonProps={{ disabled: true, hidden: true }}
      cancelButtonProps={{ disabled: true, hidden: true }}
      footer={[
        <Button
          form="formAccessory"
          key="submit"
          type="primary"
          htmlType="submit"
          style={{ justifyContent: 'flex-end' }}
        >
          Save
        </Button>,
      ]}
    >
      <Form
        form={form}
        id="formAccessory"
        autoComplete="off"
        layout="vertical"
        onFinish={(values) => {
          onChange?.({ ...values, imageArray: image })
        }}
      >
        <Form.Item name="_id" hidden noStyle>
          <Input />
        </Form.Item>
        <Form.Item
          name="title"
          label={t('enterName')}
          rules={[
            {
              required: true,
              message: t('pleaseEnterName'),
            },
            { whitespace: true },
            { min: 3 },
          ]}
          hasFeedback
        >
          <Input placeholder={t('enterName')} size="large" />
        </Form.Item>
        <Form.Item
          name="price"
          label={t('enterPrice')}
          rules={[
            {
              required: true,
              message: t('pleaseEnterPrice'),
            },
            { whitespace: true },
            { min: 3 },
          ]}
          hasFeedback
        >
          <Input placeholder={t('enterPrice')} size="large" />
        </Form.Item>
        <Form.Item
          name="describe"
          label={t('enterDescribe')}
          rules={[
            {
              required: true,
              message: t('pleaseEnterDescribe'),
            },
            { whitespace: true },
            { min: 3 },
          ]}
          hasFeedback
        >
          <Editor />
        </Form.Item>
        <Form.Item
          name="upload"
          label={t('enterImage')}
          rules={[
            {
              required: true,
              message: t('pleaseEnterImage'),
            },
          ]}
        >
          <Upload
            multiple
            accept=".png,.jpg,.jpeg"
            listType="picture-card"
            fileList={fileList}
            onChange={handleChange}
            customRequest={serveUpLoad}
            onRemove={handleRemove}
          >
            <p
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <i className="fas fa-plus"></i>
              <span>Upload</span>
            </p>
          </Upload>
        </Form.Item>
        <Form.Item
          name="detail"
          label={t('enterDetail')}
          rules={[
            {
              required: true,
              message: t('pleaseEnterDetail'),
            },
            { whitespace: true },
            { min: 3 },
          ]}
          hasFeedback
        >
          <Editor />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default FormAccessory
