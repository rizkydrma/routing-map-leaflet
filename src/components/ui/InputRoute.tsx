import { ChangeEvent, FC } from 'react';
import Icons from '../Icons';
import Button from './Button';

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
                  <Button type="button" onClick={() => removeRoute(input?.id!)} className="-mt-[10px]">
                    <Icons.XCircleIcon size={16} />
                  </Button>
                ) : (
                  <Button type="button" onClick={swapLocation} className="translate-y-4">
                    <Icons.ArrowDownUpIcon size={16} />
                  </Button>
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
                placeholder="Pilih Tujuan"
                onChange={(e) => searchRoute(e, input?.id)}
                onFocus={() => onFocusRoute(input?.id)}
                value={input?.value}
              />
            </div>
            <div className="w-fit min-w-[24px]">
              {geolocation?.length > 2 && (
                <Button type="button" onClick={() => removeRoute(input?.id!)} className="-mt-[10px]">
                  <Icons.XCircleIcon size={16} />
                </Button>
              )}
            </div>
          </div>
        );
      })}

      <div className="w-full flex gap-2 items-center">
        <Button type="button" onClick={addRoute}>
          <Icons.PlusCircleIcon size={15} />
        </Button>
        <button type="button" onClick={addRoute}>
          <span className="text-xs">Tambahkan Tujuan</span>
        </button>
      </div>
    </div>
  );
};

export default InputRoute;
