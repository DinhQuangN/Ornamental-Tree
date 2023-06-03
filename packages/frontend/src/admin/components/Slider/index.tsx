import Admin from '@/admin'
import { useAppSelector } from '@/hook/useTypedSelector'
import { deleteAPI, patchAPI, postAPI } from '@/utils/axios'
import { UseQueryResult, useMutation } from '@tanstack/react-query'
import { Button, Form, Modal, Space } from 'antd'
import Table, { ColumnsType } from 'antd/es/table'
import { AxiosResponse } from 'axios'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import FormSlider, { FormData } from './FormSlider'

interface SliderProps {
  slider: UseQueryResult<AxiosResponse<any, any>, unknown>
}

interface DataEdit {
  id?: string
  request: FormData
}

interface DataType {
  _id?: string
  image: string
}

const Slider = ({ slider }: SliderProps) => {
  const [form] = Form.useForm()
  const [open, setOpen] = useState<boolean>(false)
  const { auth } = useAppSelector((state) => state)

  const { t } = useTranslation('common', {
    keyPrefix: 'common.admin.sliderForm',
  })

  const { mutate: createSlider } = useMutation({
    mutationKey: ['createSlider'],
    mutationFn: (value: FormData) =>
      postAPI('create_slider', { image: value.image }, auth.data?.access_token),
    onSuccess() {
      setOpen(false)
    },
    onSettled() {
      slider.refetch()
    },
  })

  const { mutate: updateSlider } = useMutation({
    mutationKey: ['updateProduct'],
    mutationFn: async ({ id, request }: DataEdit) =>
      await patchAPI(
        `update_slider/${id}`,
        { image: request.image },
        auth.data?.access_token
      ),
    onSuccess() {
      setOpen(false)
    },
    onSettled() {
      slider.refetch()
    },
  })

  const { mutate: deleteSlider } = useMutation({
    mutationKey: ['deleteProduct'],
    mutationFn: async (id: string) =>
      await deleteAPI(`delete_slider/${id}`, auth.data?.access_token),
    onSettled() {
      slider.refetch()
    },
  })

  const handleChange = (value: FormData) => {
    if (form.getFieldsValue()._id) {
      updateSlider({ id: value._id, request: value })
    } else {
      createSlider(value)
    }
  }

  const handleCreate = () => {
    form.resetFields()
    setOpen(true)
  }

  const handleEdit = (value: DataType) => {
    setOpen(true)
    form.setFieldsValue(value)
  }

  const handleDelete = (value: DataType) => {
    Modal.confirm({
      title: t('areYouSureYouWantToDeleteThisProduct'),
      onOk: () => deleteSlider(value._id as string),
    })
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      width: 50,
      render: (id, record, index) => {
        ++index
        return index
      },
      showSorterTooltip: false,
    },
    {
      title: t('image'),
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => <img src={image} />,
    },
    {
      title: ' ',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>
            <i className="fas fa-pen-alt"></i>
          </Button>
          <Button onClick={() => handleDelete(record)}>
            <i className="fas fa-trash-alt"></i>
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <Admin slide="isActive">
      <div className="productAdminNav">
        <button onClick={handleCreate}>{t('createSlider')}</button>
      </div>
      <Table
        columns={columns}
        dataSource={slider.data?.data}
        rowKey={(record) => record.image}
      />
      <FormSlider
        form={form}
        open={open}
        onOpenChange={setOpen}
        onChange={(value) => handleChange(value)}
      />
    </Admin>
  )
}

export default Slider
