import Films from '@/components/Films';
import Image from 'next/image';




export default async function Home() {

    return (
      <main className=' py-10 px-10 lg:px-20'>
        <Films  />
        </main>
    );
}
