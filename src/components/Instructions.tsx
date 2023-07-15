import clsx from 'clsx';
import { FC } from 'react';
import { RouteDirections } from '../types/route';
import Icons from './Icons';
import { convertDistance, convertTime } from '../utils/utility';
import Guide from './Guide';

interface InstructionsProps {
  collapse: boolean;
  route: RouteDirections | null;
  geolocation: Coordinates[];
  setDetailRoute: React.Dispatch<React.SetStateAction<boolean>>;
}

const Instructions: FC<InstructionsProps> = ({ collapse, route, geolocation, setDetailRoute }) => {
  if (!route) return null;

  const startLocation = geolocation?.[0]?.value;
  const finishLocation = geolocation?.[geolocation?.length - 1].value;

  return (
    <div
      className={clsx(
        'fixed top-0 bottom-0 bg-white z-40 transition duration-500 w-80 lg:w-[28rem] h-full max-h-[100vh] overflow-y-scroll',
        collapse ? 'translate-x-0' : '-translate-x-80 lg:-translate-x-[28rem]',
      )}
    >
      <div className="grid grid-cols-12 p-4 border-b">
        <div className="col-span-1">
          <button
            type="button"
            className="p-1 hover:bg-gray-100 transition duration-200 rounded-full"
            onClick={() => setDetailRoute(false)}
          >
            <Icons.ArrowLeftIcon size={22} />
          </button>
        </div>
        <div className="col-span-11 ml-4 space-y-1">
          <div className="flex gap-2 truncate">
            <div className="w-6 flex-none">
              <p className="text-xs text-gray-600 font-light">dari</p>
            </div>
            <div className="grow truncate">
              <p className="text-xs text-gray-800 truncate">{startLocation}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="w-6 flex-none">
              <p className="text-xs text-gray-600 font-light">ke</p>
            </div>
            <div className="grow truncate">
              <p className="text-xs text-gray-800 truncate">{finishLocation}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-b">
        <p>
          <span className="text-orange-700">{convertTime(route?.summary?.totalTime)}</span>
          <span className="ml-2 text-gray-500">
            ({convertDistance({ distance: route?.summary?.totalDistance, type: 'km' })})
          </span>
        </p>
        <div className="flex gap-2">
          <div className="w-10">
            <p className="text-gray-500 text-xs mt-2 truncate">melalui</p>
          </div>
          <p className="text-gray-800 text-xs mt-2 text-left">{route?.name}</p>
        </div>
        <p className="text-gray-500 text-xs mt-1">Rute tercepat saat ini sesuai kondisi lalu lintas</p>
      </div>

      <div className="p-4 border-b ">
        <div className="py-4 flex gap-2">
          <Icons.MapPin size={16} />
          <h1 className="text-sm font-medium text-gray-900">{startLocation.split(',')[0]}</h1>
        </div>

        <div className="max-h-[24rem] overflow-y-scroll">
          <Guide instructions={route?.instructions} />
        </div>

        <div className="py-4 flex gap-2">
          <Icons.HomeIcon size={16} />{' '}
          <h1 className="text-sm font-medium text-gray-900">{finishLocation.split(',')[0]}</h1>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
