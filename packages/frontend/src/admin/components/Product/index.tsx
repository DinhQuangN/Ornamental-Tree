import Admin from '@/admin'
import { DataType as DataCategory } from '@/admin/components/Category'
import { useAppSelector } from '@/hook/useTypedSelector'
import { deleteAPI, getAPI, patchAPI, postAPI } from '@/utils/axios'
import { UseQueryResult, useMutation, useQuery } from '@tanstack/react-query'
import { Button, Form, Modal, Space } from 'antd'
import Table, { ColumnsType } from 'antd/es/table'
import { AxiosResponse } from 'axios'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import FormProduct, { FormData, ImageList } from './FormProduct'

export interface DataType {
  _id?: string
  title: string
  describe: string
  price: string
  imageArray: ImageList[]
  detail: string
  category: string | DataCategory
}

interface DataEdit {
  id?: string
  request: FormData
}

interface ProductProps {
  category: UseQueryResult<AxiosResponse<any, any>, unknown>
}

const Product = ({ category }: ProductProps) => {
  const [form] = Form.useForm()
  const [open, setOpen] = useState<boolean>(false)
  const { t } = useTranslation('common', {
    keyPrefix: 'common.admin.productForm',
  })
  const { auth } = useAppSelector((state) => state)

  const { data: product, refetch } = useQuery({
    queryKey: ['fetchProduct'],
    queryFn: async () => await getAPI('get_products'),
  })

  const { mutate: createProduct } = useMutation({
    mutationKey: ['createProduct'],
    mutationFn: async (request: FormData) =>
      await postAPI('create_product', request, auth.data?.access_token),
    onSuccess() {
      setOpen(false)
    },
    onSettled() {
      refetch()
    },
  })
  const { mutate: updateProduct } = useMutation({
    mutationKey: ['updateProduct'],
    mutationFn: async ({ id, request }: DataEdit) =>
      await patchAPI(`update_product/${id}`, request, auth.data?.access_token),
    onSuccess() {
      setOpen(false)
    },

    onSettled() {
      refetch()
    },
  })
  const { mutate: deleteProduct } = useMutation({
    mutationKey: ['deleteProduct'],
    mutationFn: async (id: string) =>
      await deleteAPI(`delete_product/${id}`, auth.data?.access_token),
    onSettled() {
      refetch()
    },
  })
  const handleChange = (value: FormData) => {
    if (form.getFieldsValue()._id) {
      updateProduct({ id: value._id, request: value })
    } else {
      createProduct(value)
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
      title: t('category'),
      dataIndex: 'category',
      key: 'category',
      render: (x: DataCategory) => x.name,
      filters: category.data?.data.map((x: DataCategory) => ({
        text: x.name,
        value: x._id,
      })),
      onFilter: (value: string | number | boolean, record) =>
        typeof record.category !== 'string' &&
        record.category?._id.indexOf(value as string) === 0,
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
      title: t('areYouSureYouWantToDeleteThisProduct'),
      onOk: () => deleteProduct(value._id as string),
    })
  }
  return (
    <Admin product="isActive">
      <div className="productAdminNav">
        <button onClick={handleCreate}>{t('createProduct')}</button>
      </div>
      <Table
        columns={columns}
        dataSource={product?.data.products}
        rowKey={(record) => record.title}
        scroll={{ y: 500 }}
      />
      <FormProduct
        form={form}
        open={open}
        onOpenChange={setOpen}
        onChange={(value) => handleChange(value)}
      />
    </Admin>
  )
}

export default Product
