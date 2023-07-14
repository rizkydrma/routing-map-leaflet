import { FC } from 'react';
import Icons from './Icons';
import { GuideType } from '../types/route';

interface IconsGuideProps {
  type: GuideType;
}

const IconsGuide: FC<IconsGuideProps> = ({ type }) => {
  switch (type) {
    case 'Head':
      return <Icons.MapPin size={14} />;
    case 'Continue':
    case 'Straight':
      return <Icons.MoveUpIcon size={14} />;
    case 'Left':
      return <Icons.CornerUpLeftIcon size={14} />;
    case 'Right':
      return <Icons.CornerUpRightIcon size={14} />;
    case 'Fork':
      return <Icons.SplitIcon size={14} />;
    case 'DestinationReached':
      return <Icons.HomeIcon size={14} />;
    default:
      return <Icons.CarIcon size={14} />;
  }
};

export default IconsGuide;
