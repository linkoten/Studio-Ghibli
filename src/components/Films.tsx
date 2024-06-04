'use client';

import { getData } from '@/components/fetchData';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    MagicCard,
    MagicContainer,
} from '@/components/magicui/magic-card';
import ShineBorder from '@/components/magicui/shine-border';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const Films = () => {
    const [films, setFilms] = useState<any[]>([]); // Use state to manage the films data
    const [selectedProducer, setSelectedProducer] = useState(''); // State for selected producer
    const [selectedReleaseDate, setSelectedReleaseDate] =
        useState(''); // New state variable

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData(); // Fetch the data using getData()
            if (data && Array.isArray(data)) {
                setFilms(data);
            }
        };

        fetchData(); // Call the fetchData function on component mount
    }, []); // Empty dependency array to prevent infinite loop

    const handleProducerChange = (event: any) => {
        setSelectedProducer(event.target.value);
    };

    const handleReleaseDateChange = (event: any) => {
        setSelectedReleaseDate(event.target.value);
    };

    // Filter films based on selected producer
    const filteredFilms = films.filter((film) => {
        const releaseDateMatch =
            !selectedReleaseDate || // Filter by all dates if no option selected
            new Date(film.release_date).getFullYear().toString() ===
                selectedReleaseDate;
        return (
            releaseDateMatch &&
            (!film.producer ||
                film.producer === selectedProducer ||
                selectedProducer === '')
        );
    });

    return films.length === 0 ? (
        <p>Loading films...</p>
    ) : (
        <>
            <div className='flex w-full justify-center space-x-4'>
                <select
                    value={selectedProducer}
                    onChange={handleProducerChange}
                    className='w-20'
                >
                    <option value='' className='w-20'>
                        Tous les producteurs
                    </option>
                    {/* Get unique producers using Set */}
                    {Array.from(
                        new Set(films.map((film) => film.producer))
                    ).map((producer) => (
                        <option
                            key={producer}
                            value={producer}
                            className='w-20'
                        >
                            {producer}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedReleaseDate}
                    onChange={handleReleaseDateChange}
                >
                    <option value=''>Toutes les années</option>

                    {Array.from(
                        new Set(
                            films.map((film) => film.release_date)
                        )
                    ).map((release_date) => (
                        <option
                            key={release_date}
                            value={release_date}
                        >
                            {release_date}
                        </option>
                    ))}
                </select>
            </div>
            <MagicContainer className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 pt-10'>
                {filteredFilms.map((film: any) => (
                    <ul
                        key={film.id}
                        className='  flex flex-col  bg-white rounded-xl shadow-xl hover:brightness-110 hover:-translate-y-1 hover:shadow-xl'
                    >
                        <div className='grid grid-cols-2  '>
                            <div className=' flex justify-center place-items-center h-full rounded-xl'>
                                <img
                                    alt={film.title}
                                    src={film.image}
                                    className='h-full rounded-xl'
                                />
                            </div>
                            <MagicCard className='relative  bg-[radial-gradient(var(--mask-size)_circle_at_var(--mouse-x)_var(--mouse-y),#ffaa40_0,#9c40ff_50%,transparent_100%)] shadow-2xl'>
                                
                                <CardHeader>
                                    <CardTitle>
                                        {film.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className='pb-16'>
                                    <div className='grid w-full items-center gap-4'>
                                        <div className='flex flex-col space-y-1.5 text-xs'>
                                            {film.description}
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className='absolute inset-x-0 bottom-0 flex justify-between place-items-end text-xs '>
                                    <div>{film.release_date}</div>
                                    <div>{film.director}</div>
                                    <div>{film.producer}</div>
                                </CardFooter>
                            </MagicCard>
                        </div>
                    </ul>
                ))}
            </MagicContainer>
        </>
    );
};

export default Films;
