import { FC } from 'react';
import { Instruction } from '../types/route';
import IconsGuide from './IconsGuide';
import { convertDistance, convertTime } from '../utils/utility';

interface GuideProps {
  instructions: Instruction[];
}

const Guide: FC<GuideProps> = ({ instructions }) => {
  return instructions?.map((instruction) => (
    <div className="grid grid-cols-12 p-2 items-start" key={instruction?.index}>
      <div className="col-span-1">
        <IconsGuide type={instruction?.modifier} />
      </div>
      <div className="col-span-11 ml-2 space-y-1">
        <p className="text-sm text-gray-900">{instruction?.text}</p>
        <div className="flex items-center gap-2">
          <span className="text-ss text-gray-500 grow whitespace-nowrap">
            {convertTime(instruction?.time)} ({convertDistance({ distance: instruction?.distance, type: 'm' })})
          </span>
          <div className="w-full h-[0.07rem] bg-gray-200"></div>
        </div>
      </div>
    </div>
  ));
};

export default Guide;
