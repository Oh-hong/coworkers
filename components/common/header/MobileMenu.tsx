import Image from 'next/image';
import menuIcon from '@/assets/image/icon/gnb-menu.svg';
import { useState } from 'react';
import MobileList from './MobileList';

export default function MobileMenu() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  return (
    <div className="relative flex items-center">
      <button onClick={toggleMenu}>
        <Image
          src={menuIcon}
          alt="메뉴"
          width={24}
          height={24}
          className="md:hidden lg:hidden"
        />
      </button>

      {isMenuVisible && <MobileList />}
    </div>
  );
}
