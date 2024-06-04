import React from 'react';

const filters = () => {
    return (
        <div className='absolute left-0 h-full w-40 '>
            <div className='flex flex-col justify-around place-items-center h-full px-8 fixed border-r-2 border-r-black text-xs'>
                <div>
                    Filters
                </div>
                <div>
                    Producers
                </div>
                <div>
                    Realisators
                </div>
                <div>
                    Date
                </div>
            </div>
        </div>
    );
};

export default filters;