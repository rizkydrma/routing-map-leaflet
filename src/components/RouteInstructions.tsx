import { FC } from 'react';
import { RouteDirections } from '../types/route';
import { convertDistance, convertTime } from '../utils/utility';
import Icons from './Icons';

interface RouteInstructionsProps {
  route: RouteDirections | null;
  setDetailRoute: React.Dispatch<React.SetStateAction<boolean>>;
}

const RouteInstructions: FC<RouteInstructionsProps> = ({ route, setDetailRoute }) => {
  if (!route) return;

  return (
    <div className="py-4">
      <h1 className="text-sm font-medium pl-4">Rute</h1>
      <div className="border-l-4 border-l-blue-600 pt-4 pl-4 flex gap-2 items-start">
        <div className="w-fit">
          <Icons.CarIcon size={18} fontWeight={900} />
        </div>
        <div className="w-9/12">
          <h5 className="text-xs font-medium truncate">{route?.name}</h5>
          <p className="mt-2 text-xs text-gray-600">Rute tercepat untuk saat ini sesuai kondisi lalu lintas.</p>

          <button
            type="button"
            className="text-xs font-medium text-blue-700 hover:bg-blue-100 transition duration-300 py-2 px-4 rounded -translate-x-4"
            onClick={() => setDetailRoute(true)}
          >
            Detail
          </button>
        </div>
        <div className="w-fit">
          <h5 className="text-ss font-medium text-orange-700">{convertTime(route?.summary?.totalTime)}</h5>
          <p className="text-ss font-medium text-gray-600 mt-3">
            {convertDistance({ distance: route?.summary?.totalDistance, type: 'km' })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RouteInstructions;
