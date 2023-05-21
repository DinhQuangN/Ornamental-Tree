import { Button, Form, FormInstance, Input, Modal, Select } from 'antd'
import { useTranslation } from 'react-i18next'

export interface FormData {
  _id?: string
  name: string
  role: string
}

interface CategoryProps {
  form: FormInstance
  open?: boolean
  onOpenChange?: (value: boolean) => void
  onChange?: (value: FormData) => void
}

const FormCategory = ({
  form,
  open,
  onOpenChange,
  onChange,
}: CategoryProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'common.admin.category' })
  console.log('test', form.getFieldsValue())
  return (
    <Modal
      title="Loại sản phẩm"
      forceRender
      open={open}
      width={1000}
      // destroyOnClose={true}
      onCancel={() => onOpenChange?.(false)}
      okButtonProps={{ disabled: true, hidden: true }}
      cancelButtonProps={{ disabled: true, hidden: true }}
      footer={[
        <Button
          form="formCategory"
          key="submit"
          type="primary"
          htmlType="submit"
          style={{ justifyContent: 'flex-end' }}
          // onClick={() => onOpenChange?.(false)}
        >
          Save
        </Button>,
      ]}
    >
      <Form
        form={form}
        id="formCategory"
        autoComplete="off"
        layout="vertical"
        onFinish={(values) => {
          onChange?.(values)
          form.resetFields()
        }}
      >
        <Form.Item name="_id" hidden noStyle>
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label={t('enterCategoryName')}
          className="[&.ant-form-item_label]:text-3xl"
          rules={[
            {
              required: true,
              message: t('pleaseEnterCategory'),
            },
            { whitespace: true },
            { min: 3 },
          ]}
          hasFeedback
        >
          <Input placeholder={t('enterCategoryName')} size="large" />
        </Form.Item>
        <Form.Item
          name="role"
          label={t('selectCategory')}
          className="[&.ant-form-item_label]:text-3xl"
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
            placeholder="Search to Select"
            filterOption={(input, option) =>
              (option?.label ?? '').includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={[
              {
                value: '1',
                label: 'Cây cảnh',
              },
              {
                value: '2',
                label: 'Chậu cảnh',
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default FormCategory
