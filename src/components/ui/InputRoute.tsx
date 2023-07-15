import { ChangeEvent, FC } from 'react';
import Icons from '../Icons';

interface InputRouteProps {
  geolocation: Coordinates[];
  addRoute: () => void;
  removeRoute: (id?: string) => void;
  searchRoute: (event: ChangeEvent<HTMLInputElement>, id: string) => void;
  onFocusRoute: (id?: string) => void;
  swapLocation: () => void;
  wrapperRef: React.LegacyRef<HTMLDivElement>;
}

const InputRoute: FC<InputRouteProps> = ({
  geolocation,
  addRoute,
  removeRoute,
  searchRoute,
  onFocusRoute,
  swapLocation,
  wrapperRef,
}) => {
  return (
    <div className="p-4 border-b" ref={wrapperRef}>
      {geolocation?.map((input, index: number) => {
        if (index !== geolocation?.length - 1) {
          return (
            <div className="flex gap-2 items-center w-full" key={input?.id}>
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
                  onFocus={() => onFocusRoute(input?.id)}
                  value={input?.value}
                />
              </div>
              <div className="w-fit min-w-[16px]">
                {geolocation?.length > 2 ? (
                  <button type="button" onClick={() => removeRoute(input?.id!)}>
                    <Icons.XCircleIcon size={16} className="-mt-[10px]" />
                  </button>
                ) : (
                  <button type="button" onClick={swapLocation}>
                    <Icons.ArrowDownUpIcon size={16} className="translate-y-4" />
                  </button>
                )}
              </div>
            </div>
          );
        }

        return (
          <div className="flex gap-2 items-center w-full" key={input?.id}>
            <div className="w-fit -mt-3">
              <Icons.MapPin size={15} color="red" />
            </div>
            <div className="flex-1">
              <input
                type="text"
                className="mb-3 border border-gray-500 outline-none w-full rounded bg-white focus:border-blue-600 px-4 text-xs py-2 [&:not(:last-child)]:bg-red-600"
                placeholder="Pilih titik"
                onChange={(e) => searchRoute(e, input?.id)}
                onFocus={() => onFocusRoute(input?.id)}
                value={input?.value}
              />
            </div>
            <div className="w-fit min-w-[16px]">
              {geolocation?.length > 2 && (
                <button type="button" onClick={() => removeRoute(input?.id!)}>
                  <Icons.XCircleIcon size={16} className="-mt-[10px]" />
                </button>
              )}
            </div>
          </div>
        );
      })}

      <div className="w-full flex gap-2 items-center">
        <button onClick={addRoute}>
          <Icons.PlusCircleIcon size={15} />
        </button>
        <span className="text-xs">Tambahkan Tujuan</span>
      </div>
    </div>
  );
};

export default InputRoute;
