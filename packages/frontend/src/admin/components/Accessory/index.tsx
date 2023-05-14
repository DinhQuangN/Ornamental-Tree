import Admin from '@/admin'
import { useState } from 'react'
import FormAccessory, { DataAccessory, Image } from './FormAccessory'
import { Space } from 'antd'
import type { ColumnsType } from 'antd/es/table'

const Accessory = () => {
  const [state, setState] = useState<boolean>(false)
  const columns: ColumnsType<DataAccessory> = [
    {
      title: 'Tên phụ kiện',
      dataIndex: 'title',
      key: 'title',
      render: (title: string) => title.slice(0, 25) + '...',
    },
    {
      title: 'Giá phụ kiện',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Mô tả phụ kiện',
      dataIndex: 'describe',
      key: 'describe',
      render: (describe: string) => describe.slice(0, 25) + '...',
    },
    {
      title: 'Ảnh phụ kiện',
      dataIndex: 'imageArray',
      key: 'imageArray',
      render: (imageArray: Image[]) => <img src={imageArray[0].image} />,
    },
    {
      title: 'Chi tiết phụ kiện',
      dataIndex: 'detail',
      key: 'detail',
      render: (detail: string) => detail.slice(0, 25) + '...',
    },
    {
      title: ' ',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* <button onClick={() => onEdit?.(record._id)}>
            <i className="fas fa-pen-alt"></i>
          </button>
          <button onClick={() => onDelete?.(record._id)}>
            <i className="fas fa-trash-alt"></i>
          </button> */}
        </Space>
      ),
    },
  ]
  return (
    <Admin accessory="isActive">
      <FormAccessory open={true} />
    </Admin>
  )
}

export default Accessory
