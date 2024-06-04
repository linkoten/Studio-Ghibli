import Films from '@/components/Films';
import Image from 'next/image';


export async function getData() {
    const res = await fetch('https://ghibliapi.vercel.app/films/');
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export default async function Home() {

    return (
      <main className=' py-10 px-10 lg:px-20'>
        <Films  />
        </main>
    );
}
