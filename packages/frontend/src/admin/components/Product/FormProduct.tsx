import { getAPI } from '@/utils/axios'
import { useQuery } from '@tanstack/react-query'
import {
  Button,
  Form,
  FormInstance,
  Input,
  Modal,
  Select,
  UploadFile,
  UploadProps,
  notification,
} from 'antd'
import Upload, { RcFile } from 'antd/es/upload'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DataType } from '../Category'
import Editor from '../CheckEditor'

export type CustomRequestOptions<T = any> = Parameters<
  Exclude<UploadProps<T>['customRequest'], undefined>
>[0]

export interface ImageList {
  uid?: string
  image: string
}

export interface FormData {
  _id?: string
  title: string
  describe: string
  price: string
  imageArray: string[]
  detail: string
  category: string
}

interface ProductProps {
  form: FormInstance
  open?: boolean
  onOpenChange?: (value: boolean) => void
  onChange?: (value: FormData) => void
}

const FormProduct = ({ form, open, onOpenChange, onChange }: ProductProps) => {
  const [fileList, setFileList] = useState<UploadFile<File>[]>([])
  const [image, setImage] = useState<ImageList[]>([])
  const { t } = useTranslation('common', {
    keyPrefix: 'common.admin.productForm',
  })

  const { data: category } = useQuery({
    queryKey: ['fetchCategory'],
    queryFn: async () => await getAPI('get_category'),
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
      title={t('product')}
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
        <Form.Item
          name="category"
          label={t('selectCategory')}
          rules={[
            {
              required: true,
              message: t('pleaseEnterSelectCategory'),
            },
          ]}
          hasFeedback
        >
          <Select
            showSearch
            placeholder={t('searchToSelect')}
            filterOption={(input, option) =>
              (option?.name ?? '').includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.name ?? '')
                .toLowerCase()
                .localeCompare((optionB?.name ?? '').toLowerCase())
            }
          >
            {category?.data.map((x: DataType) => (
              <Select.Option value={x._id} key={x._id}>
                {x.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default FormProduct
