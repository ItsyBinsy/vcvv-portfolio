import BentoCard from './BentoCard';
import { MdDownload } from 'react-icons/md';

const StatusCard = () => {
  return (
    <BentoCard size="small" hover={true} className="h-full flex flex-col justify-between">
      {/* Status Badge */}
      <div className="flex items-center justify-center gap-1.5 mb-3">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-500"></span>
        </span>
        <span className="font-semibold text-xs text-gray-900 dark:text-white">Available for OJT</span>
      </div>

      {/* Download CV Button */}
      <button className="w-full py-1.5 px-3 rounded-lg bg-yellow-500 text-white text-xs font-semibold hover:bg-yellow-600 transition-all duration-300 flex items-center justify-center gap-1.5">
        <MdDownload className="text-base" />
        Download CV
      </button>
    </BentoCard>
  );
};

export default StatusCard;
