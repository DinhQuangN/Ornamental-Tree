import Admin from '@/admin'
import { useAppSelector } from '@/hook/useTypedSelector'
import { deleteAPI, patchAPI, postAPI } from '@/utils/axios'
import { UseQueryResult, useMutation } from '@tanstack/react-query'
import { Button, Form, Modal, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { AxiosResponse } from 'axios'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import FormCategory, { FormData } from './FormCategory'

export interface DataType {
  _id?: string
  name: string
  role: string | number
}

interface DataEdit {
  id?: string
  request: FormData
}

interface DataCategory {
  category: UseQueryResult<AxiosResponse<any, any>, unknown>
}

const Category = ({ category }: DataCategory) => {
  const [form] = Form.useForm()
  const [open, setOpen] = useState<boolean>(false)
  const { t } = useTranslation('common', { keyPrefix: 'common.admin.category' })
  const { auth } = useAppSelector((state) => state)

  const { mutate: CreateCategory } = useMutation({
    mutationKey: ['createCategory'],
    mutationFn: async (request: FormData) =>
      await postAPI('create_category', request, auth.data?.access_token),
    onSuccess() {
      setOpen(false)
    },
    onSettled() {
      category.refetch()
    },
  })
  const { mutate: UpdateCategory } = useMutation({
    mutationKey: ['updateCategory'],
    mutationFn: async ({ id, request }: DataEdit) =>
      await patchAPI(`update_category/${id}`, request, auth.data?.access_token),
    onSuccess() {
      setOpen(false)
    },
    onSettled() {
      category.refetch()
    },
  })
  const { mutate: DeleteCategory } = useMutation({
    mutationKey: ['deleteCategory'],
    mutationFn: async (id: string) =>
      await deleteAPI(`delete_category/${id}`, auth.data?.access_token),
    onSettled() {
      category.refetch()
    },
  })
  const handleChange = (value: FormData) => {
    if (form.getFieldsValue()._id) {
      UpdateCategory({ id: value._id, request: value })
    } else {
      CreateCategory(value)
    }
  }
  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên loại sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Loại sản phẩm',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: '',
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
      title: 'Bạn có chắc chắn muốn xóa loại sản phẩm này không',
      onOk: () => DeleteCategory(value._id as string),
    })
  }

  return (
    <Admin category="isActive">
      <div className="productAdminNav">
        <button onClick={handleCreate}>{t('createCategory')}</button>
      </div>
      <Table
        columns={columns}
        dataSource={category.data?.data}
        rowKey={(record) => record.name}
        scroll={{ y: 500 }}
      />
      <FormCategory
        form={form}
        open={open}
        onOpenChange={setOpen}
        onChange={(value) => handleChange(value)}
      />
    </Admin>
  )
}

export default Category
