import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';
import Icons from './Icons';

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
  collapse: boolean;
  setCollapse: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

const Sidebar: FC<SidebarProps> = ({ collapse, setCollapse, children }) => {
  return (
    <>
      <div
        className={`fixed top-0 bottom-0 bg-white z-20 transition duration-600 ${
          collapse ? 'translate-x-0' : '-translate-x-80 lg:-translate-x-96'
        }`}
      >
        <div className={`z-20 h-full max-h-[100vh] w-80 lg:w-96 overflow-y-scroll`}>{children}</div>
      </div>

      {/* BUTTON COLLAPSE */}
      <button
        onClick={() => setCollapse(!collapse)}
        className={clsx(
          'h-20 w-8 bg-white rounded-tr-md rounded-br-md absolute top-0 bottom-0 translate-y-[calc(50vh)] border-l z-20 shadow-md items-center flex justify-center transition duration-200',
          collapse ? 'translate-x-80 lg:translate-x-96' : 'translate-x-0',
        )}
      >
        <Icons.ChevronRight
          size="22"
          className={clsx('transition duration-1000', collapse ? 'rotate-180' : 'rotate-0')}
        />
      </button>
    </>
  );
};

export default Sidebar;
