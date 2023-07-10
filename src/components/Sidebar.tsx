import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';
import { FC, HTMLAttributes } from 'react';

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
  collapse: boolean;
  setCollapse: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

const Sidebar: FC<SidebarProps> = ({ collapse, setCollapse, children }) => {
  return (
    <div
      className={`bg-white border-r absolute shadow-lg shadow-black/50 z-20 h-full  transition duration-600 w-96 ${
        collapse ? 'translate-x-0' : '-translate-x-96'
      }`}
    >
      {children}

      {/* <div className="h-[6px] w-[6px] rounded-full bg-gray-700 before:h-[6px] before:w-[6px] before:rounded-full before:bg-gray-700 before:-mt-3 before:absolute after:h-[6px] after:w-[6px] after:rounded-full after:bg-gray-700 after:mt-3 after:absolute"></div> */}

      {/* BUTTON COLLAPSE */}
      <button
        onClick={() => setCollapse(!collapse)}
        className="h-20 w-8 bg-white rounded-tr-md rounded-br-md absolute translate-x-96 top-0 bottom-0 translate-y-[calc(50vh)] border-l z-0 shadow-md items-center flex justify-center"
      >
        <ChevronRight size="22" className={clsx('transition duration-1000', collapse ? 'rotate-180' : 'rotate-0')} />
      </button>
    </div>
  );
};

export default Sidebar;
