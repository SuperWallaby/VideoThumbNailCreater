import React, { useState } from "react";
import { DoubleRangeSlider } from "../rangeSlider/DoubleRangeSlider";
import { RangeSlider } from "../rangeSlider/RangeSlider";
import { IEditData } from "../videoThumbNailGenderator/helpers/eidtVidoe";

interface IProp {
 open?: boolean;
 setOpen?: any;
 defaultInfo: IEditData;
 onChange: any;
}

export const Configer: React.FC<IProp> = ({
 setOpen,
 defaultInfo,
 onChange,
 open,
}) => {
 const [info, setInfo] = useState(defaultInfo || {});
 const { selectSkip, output, quality, selectOf, setpts, width, start, end } =
  info;
 const onSubmit = () => {
  setOpen(false);
  onChange({ ...info });
 };

 const dispaly = open ? "" : "hidden";

 return (
  <div
   className={`${dispaly} bg-purple-600 bg-opacity-75  bottom-0 flex items-center justify-center right-0 left-0 top-0 z-50 fixed`}
  >
   <div className=" mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
    <h1 className="text-2xl font-bold mb-8">설정변경하기</h1>

    <div className="relative z-0 w-full mb-5">
     <input
      type="text"
      name="duration"
      placeholder=" "
      value={start}
      onChange={(e) => {
       info.start = parseInt(e.currentTarget.value);
       setInfo({ ...info });
      }}
      className="pt-3 pb-2 pr-12 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
     />
     <label
      htmlFor="duration"
      className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
     >
      시작시간
     </label>
     <div className="absolute top-0 right-0 mt-3 mr-4 text-gray-400">초</div>
    </div>

    <div className="relative z-0 w-full mb-5">
     <input
      type="text"
      name="duration"
      value={end}
      onChange={(e) => {
       info.end = parseInt(e.currentTarget.value);
       setInfo({ ...info });
      }}
      placeholder=" "
      className="pt-3 pb-2 pr-12 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
     />
     <label
      htmlFor="duration"
      className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
     >
      끝시간
     </label>
     <div className="absolute top-0 right-0 mt-3 mr-4 text-gray-400">초</div>
    </div>

    <div className="relative z-0 w-full mb-5">
     <input
      value={width}
      onChange={(e) => {
       info.width = parseInt(e.currentTarget.value);
       setInfo({ ...info });
      }}
      type="text"
      name="duration"
      placeholder=" "
      className="pt-3 pb-2 pr-12 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
     />
     <label
      htmlFor="duration"
      className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
     >
      가로크기
     </label>
     <div className="absolute top-0 right-0 mt-3 mr-4 text-gray-400">PX</div>
    </div>

    <div className="flex flex-row space-x-4">
     <div className="relative z-0 w-full mb-5">
      <input
       value={selectSkip}
       onChange={(e) => {
        info.selectSkip = parseInt(e.currentTarget.value);
        setInfo({ ...info });
       }}
       type="text"
       name="date"
       placeholder=" "
       className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
      />
      <label
       htmlFor="date"
       className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
      >
       간격으로
      </label>
      <div className="absolute top-0 right-0 mt-3 mr-4 text-gray-400">초</div>
     </div>
     <div className="relative z-0 w-full">
      <input
       value={selectOf}
       onChange={(e) => {
        info.selectOf = parseInt(e.currentTarget.value);
        setInfo({ ...info });
       }}
       type="text"
       name="time"
       placeholder=" "
       className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
      />
      <label
       htmlFor="time"
       className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
      >
       씩모음
      </label>
      <div className="absolute top-0 right-0 mt-3 mr-4 text-gray-400">초</div>
     </div>
    </div>

    <label className="text-gray-500">퀄리티</label>
    <RangeSlider
     step={1}
     setValue={(v) => {
      info.quality = v;
      setInfo({ ...info });
     }}
     value={quality || 35}
     MAX={50}
     MIN={20}
    />

    <label className="inline-flex items-center mt-3">
     <input
      type="checkbox"
      onChange={() => {
       info.skipAudio = !info.skipAudio;
       setInfo({ ...info });
      }}
      className="form-checkbox h-5 w-5 text-yellow-600"
      checked
     ></input>{" "}
     <span className="ml-2 text-gray-700">오디오 제거</span>
    </label>

    <button
     onClick={onSubmit}
     id="button"
     type="button"
     className="w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink-500 hover:bg-pink-600 hover:shadow-lg focus:outline-none"
    >
     제출하기
    </button>
   </div>
  </div>
 );
};

export default Configer;
