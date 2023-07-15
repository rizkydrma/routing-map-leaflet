import { FC } from 'react';
import { ModifierType } from '../types/route';
import Icons from './Icons';

interface IconsGuideProps {
  type: ModifierType;
}

const IconsGuide: FC<IconsGuideProps> = ({ type }) => {
  switch (type) {
    case 'Head':
      return <Icons.MapPin size={14} />;
    case 'Continue':
    case 'Straight':
      return <Icons.MoveUpIcon size={14} />;
    case 'Left':
    case 'SharpLeft':
      return <Icons.CornerUpLeftIcon size={14} />;
    case 'SlightLeft':
      return <Icons.MoveUpLeft size={14} />;
    case 'Right':
    case 'SharpRight':
      return <Icons.CornerUpRightIcon size={14} />;
    case 'SlightRight':
      return <Icons.MoveUpRight size={14} />;
    case 'Fork':
      return <Icons.SplitIcon size={14} />;
    case 'DestinationReached':
      return <Icons.HomeIcon size={14} />;
    case 'Uturn':
      return <Icons.Undo2Icon size={14} className="rotate-90" />;
    default:
      return <Icons.CarIcon size={14} />;
  }
};

export default IconsGuide;
