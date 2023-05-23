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
  _id: string
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

  const { mutate: createCategory } = useMutation({
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
  const { mutate: updateCategory } = useMutation({
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
  const { mutate: deleteCategory } = useMutation({
    mutationKey: ['deleteCategory'],
    mutationFn: async (id: string) =>
      await deleteAPI(`delete_category/${id}`, auth.data?.access_token),
    onSettled() {
      category.refetch()
    },
  })
  const handleChange = (value: FormData) => {
    if (form.getFieldsValue()._id) {
      updateCategory({ id: value._id, request: value })
    } else {
      createCategory(value)
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
      title: t('categoryName'),
      dataIndex: 'name',
      key: 'name',
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
      title: t('areYouSureYouWantToDeleteThisCategory'),
      onOk: () => deleteCategory(value._id as string),
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
        rowKey={(record) => record._id}
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
