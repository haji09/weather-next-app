import Image from 'next/image';
import CurrentLocation from '@/components/CurrentLocation';

export default function Home() {
  return (
    <>
      <main className="w-[100%] h-[100vh]">
        <div className="w-full h-full flex justify-center items-center ">
          <div className="w-[80%] h-[90%] mdl:h-auto rounded-[50px] p-1 shadow-inner bg-white/20 backdrop-blur-lg drop-shadow-[100px] shadow-slate-400 ">
            <CurrentLocation />
          </div>
        </div>
      </main>
    </>
  );
}
