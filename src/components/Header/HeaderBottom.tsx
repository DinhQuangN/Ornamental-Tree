import { Input } from 'antd'
import { Link } from 'react-router-dom'

export interface HeaderBottomProps {
  onSearch?: (value: string) => void
}

const HeaderBottom = ({ onSearch }: HeaderBottomProps) => {
  return (
    <div className="mt-[30px] w-full">
      <div className="mx-auto grid h-[100px] max-w-[1200px] grid-cols-2 px-[15px]">
        <div className="mt-[10px] flex items-center justify-end">
          <div className="w-[110px]">
            <Link to="/" className="w-full py-[10px] pr-[10px]">
              <img
                src="https://vuoncayviet.com/img/logo.png"
                alt=""
                className="h-[80px]"
              />
            </Link>
          </div>
          <div className="text-[2rem] capitalize tracking-[0.5px] text-[#090]">
            Vườn cây Việt <br />
            <span className="mt-[5px] font-medium capitalize text-[#ff8000]">
              Không chỉ là cây cảnh
            </span>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <Input.Search size="large" className="w-[70%]" onSearch={onSearch} />
        </div>
      </div>
    </div>
  )
}

export default HeaderBottom
