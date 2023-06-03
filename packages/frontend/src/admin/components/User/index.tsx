import Admin from '@/admin'
import { useAppSelector } from '@/hook/useTypedSelector'
import { getAPI, postAPI } from '@/utils/axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'

interface IUser {
  _id: string
  account: string
  password: string
  name: string
  avatar: string
  role: string
  createdAt: string
  updatedAt: string
}

interface UpdateRole {
  role: string
  id: string
}

const User = () => {
  const { t } = useTranslation('common', {
    keyPrefix: 'common.admin.userForm',
  })
  const { auth } = useAppSelector((state) => state)
  const { data, refetch } = useQuery({
    queryKey: ['getUser'],
    queryFn: () => getAPI('get_user', auth.data?.access_token),
    enabled: !!auth.data?.access_token,
  })
  const { mutate } = useMutation({
    mutationKey: ['updateRole'],
    mutationFn: (request: UpdateRole) =>
      postAPI(
        'update_role_user',
        { role: request.role, id: request.id },
        auth.data?.access_token
      ),
    onSettled() {
      refetch()
    },
  })
  const handleRole = (role: string, id: string) => {
    const data = role === 'admin' ? 'user' : 'admin'
    mutate({ id: id, role: data })
  }

  useLayoutEffect(() => {
    if (auth.data?.user?.role !== 'admin') window.location.href = '/'
  }, [])

  return (
    <Admin user="isActive">
      <div className="productAdminTable">
        <div style={{ width: '100%' }}>
          <div className="productTable">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>{t('accountName')}</th>
                  <th>{t('account')}</th>
                  <th>{t('avatar')}</th>
                  <th>{t('accountType')}</th>
                  <th>{t('createAt')}</th>
                </tr>
              </thead>
              <tbody>
                {data?.data.map((item: IUser, index: number) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{item.name}</td>
                    <td>{item.account}</td>
                    <td>
                      <img
                        src={item.avatar}
                        alt=""
                        style={{ borderRadius: '50%' }}
                      />
                    </td>
                    <td>
                      <button
                        style={{
                          border: 'none',
                          backgroundColor: 'rgba(0,19,252,0.1)',
                          padding: '10px 15px',
                          boxShadow: '0 -2px -5px 1px rgba(0,0,0,0.2)',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          textTransform: 'capitalize',
                        }}
                        onClick={() => handleRole(item.role, item._id)}
                      >
                        {item.role}
                      </button>
                    </td>
                    <td>
                      {new Date(item.createdAt as string).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* {accessory.data?.total && accessory.data.total > 1 ? (
        <Pagination
          totalPage={accessory.data.total}
          callback={handlePagination}
        />
      ) : null} */}
          {/* <CreateUpdateCategory
        products={currentId}
        isActive={open}
        setClose={setOpen}
      /> */}
        </div>
      </div>
    </Admin>
  )
}

export default User
