import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="fixed left-0 top-0 z-10 w-full bg-[#ccc]/20 shadow-sm">
      <div className="mx-auto grid h-[30px] max-w-[1200px] grid-cols-2 items-center justify-between px-[15px] transition-all duration-300 ease-in sm:h-[60px] sm:grid-cols-2 sm:grid-rows-2">
        <Link
          to="#"
          className="text-xl font-light capitalize tracking-[0.8px] sm:row-span-2 sm:text-base md:text-xs lg:text-base"
        >
          <i className="fas fa-phone-alt mr-[5px] text-xl text-red-500 lg:text-base"></i>
          Hotline:{' '}
          <span className="font-medium transition-all duration-300 ease-in hover:text-red-500">
            0384589790
          </span>
        </Link>
        <div className="flex items-center gap-x-10 sm:row-span-2 sm:flex-col-reverse sm:flex-wrap sm:gap-3">
          <div className="flex items-center gap-2">
            <Link
              to="/dang-nhap"
              className="text-lg font-medium uppercase leading-[1.5px] tracking-[0.5px] text-black transition-all duration-300 ease-in first:mr-[10px] hover:text-[#f28902] md:text-xs lg:text-base"
            >
              <i className="fas fa-unlock-alt mr-[5px]"></i>đăng nhập
            </Link>
            <Link
              to="/dang-ki"
              className="text-lg font-medium uppercase leading-[1.5px] tracking-[0.5px] text-black transition-all duration-300 ease-in first:mr-[10px] hover:text-[#f28902] md:text-xs lg:text-base"
            >
              <i className="fas fa-user-plus mr-[5px]"></i>tạo tài khoản
            </Link>
          </div>
          <div className="items-end bg-[#f28902] px-[10px] py-[7.5] lg:col-span-2 lg:text-center ">
            <Link
              to="/gio-hang"
              className="text-lg font-medium uppercase text-white md:text-xs lg:text-base"
            >
              <i className="fas fa-shopping-cart mr-[5px]"></i>Giỏ hàng
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
