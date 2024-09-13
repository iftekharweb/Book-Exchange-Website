import * as actions from "@/actions";

import shakib from "@/public/shakib.jpg";
import shishir from "@/public/shishir.jpg";
import Image from "next/image";

const Developers = () => {
  return (
    <div className="flex justify-around items-center px-20 mx-10 py-10 my-5 rounded-lg bg-slate-100">
      <div href="#" className="group relative block bg-black mx-10 rounded-md w-[50%] h-full">
        <Image
          alt=""
          src={shishir}
          className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50 rounded-md"
        />

        <div className="relative p-4 sm:p-6 lg:p-8">
          <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
            Developer
          </p>

          <p className="text-xl font-bold text-white sm:text-2xl">Iftekhar Md Shishir</p>

          <div className="mt-32 sm:mt-48 lg:mt-64">
            <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              <p className="text-sm text-white">
                Competitive Programmer at C++, Specialist in Codeforces, ICPC regional finalist, Code Samurai finalist, Full stack web developer with Django(python) and Next(React JS)
              </p>
            </div>
          </div>
        </div>
      </div>
      <div href="#" className="group relative block bg-black mx-10 rounded-md w-[50%] h-full">
        <Image
          alt=""
          src={shakib}
          className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50 rounded-md"
        />

        <div className="relative p-4 sm:p-6 lg:p-8">
          <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
            Developer
          </p>

          <p className="text-xl font-bold text-white sm:text-2xl">Shakib Hasan</p>

          <div className="mt-32 sm:mt-48 lg:mt-64">
            <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              <p className="text-sm text-white">
              Competitive Programmer at JAVA, Pupil in Codeforces, Java Fest finalist, Backend web developer with SpringBoot(java)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developers;
