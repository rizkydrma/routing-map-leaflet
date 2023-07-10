import { MapPin, PlusCircleIcon, XCircleIcon } from 'lucide-react';
import { ChangeEvent, FC } from 'react';

interface InputRouteProps {
  geolocation: Coordinates[];
  addRoute: () => void;
  removeRoute: (id?: string) => void;
  searchRoute: (event: ChangeEvent<HTMLInputElement>, id?: string) => void;
}

const InputRoute: FC<InputRouteProps> = ({ geolocation, addRoute, removeRoute, searchRoute }) => {
  return (
    <div className="p-4 border-b">
      {geolocation?.map((input, index: number) => {
        if (index !== geolocation?.length - 1) {
          return (
            <div className="flex gap-2 items-center w-full" key={index}>
              <div className="w-fit">
                <div className="location">
                  <span></span>
                </div>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  className="mb-3 border border-gray-500 outline-none w-full rounded bg-white focus:border-blue-600 px-4 text-xs py-2 [&:not(:last-child)]:bg-red-600"
                  placeholder="Pilih titik"
                  onChange={(e) => searchRoute(e, input?.id)}
                />
              </div>
              <div className="w-fit min-w-[16px]">
                {geolocation?.length > 2 && (
                  <button type="button" onClick={() => removeRoute(input?.id!)}>
                    <XCircleIcon size={16} className="-mt-[10px]" />
                  </button>
                )}
              </div>
            </div>
          );
        }

        return (
          <div className="flex gap-2 items-center w-full">
            <div className="w-fit">
              <MapPin size={15} color="red" />
            </div>
            <div className="flex-1">
              <input
                type="text"
                className="mb-3 border border-gray-500 outline-none w-full rounded bg-white focus:border-blue-600 px-4 text-xs py-2 [&:not(:last-child)]:bg-red-600"
                placeholder="Pilih titik"
                onChange={(e) => searchRoute(e, input?.id)}
              />
            </div>
            <div className="w-fit min-w-[16px]">
              {geolocation?.length > 2 && (
                <button type="button" onClick={() => removeRoute(input?.id!)}>
                  <XCircleIcon size={16} className="-mt-[10px]" />
                </button>
              )}
            </div>
          </div>
        );
      })}

      <div className="w-full">
        <button onClick={addRoute} className="text-xs inline-flex gap-2">
          <PlusCircleIcon size={15} />
          Tambahkan Tujuan
        </button>
      </div>
    </div>
  );
};

export default InputRoute;
