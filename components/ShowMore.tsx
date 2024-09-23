"use client";

import { ShowMoreProps } from '@/types/index';
import { updateSearchParams } from '@/utils/index';
import { useRouter } from 'next/navigation';
import CustomButton from './CustomButton';

const ShowMore = ({ pageNumber, isNext, setLimit }: ShowMoreProps) => {
  const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * 10;
    
    setLimit(newLimit);
  }

  return (
    <div className="w-full flex-center gap-5 mt-10">
        {!isNext && (
            <CustomButton 
                title="ShowMore"
                btnType="button"
                containerStyles="bg-primary-blue rounded-full 
                text-white"
                handleClick={handleNavigation}
            />
        )}
    </div>
  )
}

export default ShowMore