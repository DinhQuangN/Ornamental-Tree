import Admin from '@/admin'
import { useAppSelector } from '@/hook/useTypedSelector'
import { deleteAPI, getAPI, patchAPI, postAPI } from '@/utils/axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Form, Modal, Space } from 'antd'
import Table, { ColumnsType } from 'antd/es/table'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import FormAccessory, { FormData, ImageList } from './FormAccessory'

interface DataType {
  _id: string
  title: string
  price: string
  describe: string
  detail: string
  imageArray: string[]
}
interface DataEdit {
  id?: string
  request: FormData
}

const Accessory = () => {
  const [form] = Form.useForm()
  const [open, setOpen] = useState<boolean>(false)
  const { t } = useTranslation('common', {
    keyPrefix: 'common.admin.accessoryForm',
  })
  const { auth } = useAppSelector((state) => state)

  const { data: accessory, refetch } = useQuery({
    queryKey: ['getAccessory'],
    queryFn: async () => await getAPI('accessory', auth.data?.access_token),
  })
  const { mutate: createAccessory } = useMutation({
    mutationKey: ['createAccessory'],
    mutationFn: async (request: FormData) =>
      await postAPI('create_accessory', request, auth.data?.access_token),
    onSuccess() {
      setOpen(false)
    },
    onSettled() {
      refetch()
    },
  })
  const { mutate: updateAccessory } = useMutation({
    mutationKey: ['updateAccessory'],
    mutationFn: async ({ id, request }: DataEdit) =>
      await patchAPI(
        `update_accessory/${id}`,
        request,
        auth.data?.access_token
      ),
    onSuccess() {
      setOpen(false)
    },
    onSettled() {
      refetch()
    },
  })
  const { mutate: deleteAccessory } = useMutation({
    mutationKey: ['deleteAccessory'],
    mutationFn: async (id: string) =>
      await deleteAPI(`delete_accessory/${id}`, auth.data?.access_token),
    onSettled() {
      refetch()
    },
  })
  const handleChange = (value: FormData) => {
    if (form.getFieldsValue()._id) {
      updateAccessory({ id: value._id, request: value })
    } else {
      createAccessory(value)
    }
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
      title: t('name'),
      dataIndex: 'title',
      key: 'title',
      render: (title: string) => title.slice(0, 25) + '...',
    },
    {
      title: t('price'),
      dataIndex: 'price',
      key: 'price',
      defaultSortOrder: 'descend',
      sorter: (a, b) => Number(a.price) - Number(b.price),
    },
    {
      title: t('describe'),
      dataIndex: 'describe',
      key: 'describe',
      render: (describe: string) => describe.slice(0, 25) + '...',
    },
    {
      title: t('image'),
      dataIndex: 'imageArray',
      key: 'imageArray',
      render: (imageArray: ImageList[]) => <img src={imageArray[0].image} />,
    },
    {
      title: t('detail'),
      dataIndex: 'detail',
      key: 'detail',
      render: (detail: string) => detail.slice(0, 25) + '...',
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
      title: t('areYouSureYouWantToDeleteThisAccessory'),
      onOk: () => deleteAccessory(value._id as string),
    })
  }
  return (
    <Admin accessory="isActive">
      <div className="productAdminNav">
        <button onClick={handleCreate}>{t('createAccessory')}</button>
      </div>
      <Table
        columns={columns}
        dataSource={accessory?.data.products}
        rowKey={(record) => record._id}
        scroll={{ y: 500 }}
      />
      <FormAccessory
        form={form}
        open={open}
        onOpenChange={setOpen}
        onChange={(value) => handleChange(value)}
      />
    </Admin>
  )
}

export default Accessory
