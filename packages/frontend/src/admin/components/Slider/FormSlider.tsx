import {
  Button,
  Form,
  FormInstance,
  Modal,
  Upload,
  UploadFile,
  UploadProps,
  notification,
} from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export type CustomRequestOptions<T = any> = Parameters<
  Exclude<UploadProps<T>['customRequest'], undefined>
>[0]

export interface FormData {
  _id?: string
  image: string
}

interface SliderProps {
  form: FormInstance
  open?: boolean
  onOpenChange?: (value: boolean) => void
  onChange?: (value: FormData) => void
}

const FormSlider = ({ form, open, onOpenChange, onChange }: SliderProps) => {
  const [fileList, setFileList] = useState<UploadFile<File>[]>([])
  const [image, setImage] = useState<string>('')
  const { t } = useTranslation('common', {
    keyPrefix: 'common.admin.sliderForm',
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
        setImage(data.secure_url)
      }
      onSuccess?.('ok')
    } catch (err: any) {
      onError?.(err)
    }
  }

  return (
    <Modal
      title={t('slider')}
      forceRender
      open={open}
      width={1000}
      onCancel={() => onOpenChange?.(false)}
      okButtonProps={{ disabled: true, hidden: true }}
      cancelButtonProps={{ disabled: true, hidden: true }}
      footer={[
        <Button
          form="formProduct"
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
        id="formProduct"
        autoComplete="off"
        layout="vertical"
        onFinish={(values) => {
          onChange?.({ ...values, image })
        }}
      >
        <Form.Item
          name="upload"
          label={t('chooseImage')}
          rules={[
            {
              required: true,
              message: t('pleaseChooseImage'),
            },
          ]}
        >
          <Upload
            accept=".png,.jpg,.jpeg"
            listType="picture-card"
            fileList={fileList}
            onChange={handleChange}
            customRequest={serveUpLoad}
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
      </Form>
    </Modal>
  )
}

export default FormSlider
