import { forwardRef } from 'react';
import { LocationItem } from '../types/location';
import Icons from './Icons';

interface ListRouteProps {
  locations: LocationItem[];
  onClickOptionsRoute: (location: LocationItem) => void;
  show: boolean;
  loading?: boolean;
  error?: string;
}

const ListRoute = forwardRef<HTMLDivElement, ListRouteProps>(
  ({ locations, onClickOptionsRoute, show, loading, error }, ref) => {
    return show ? (
      <div ref={ref}>
        {loading && (
          <div className="h-10 w-full grid place-items-center">
            <Icons.Loader2 className="mr-2 h-6 w-6 animate-spin" color="gray" />
          </div>
        )}
        <ol>
          {locations?.map((location) => (
            <li
              key={location?.osm_id}
              className="last:border-b flex gap-2 items-center w-full py-2 hover:bg-gray-50 cursor-pointer"
              onClick={() => onClickOptionsRoute(location)}
            >
              <div className="w-fit pl-4">
                <Icons.MapPin size={15} />
              </div>
              <div className="flex-1 truncate">
                <p className="text-xs text-gray-800">{location?.display_name}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    ) : null;
  },
);

export default ListRoute;
