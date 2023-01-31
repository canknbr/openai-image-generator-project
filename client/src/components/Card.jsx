import React from 'react';
import { download } from '../assets';
import { downloadFile } from '../utils';
function Card({ name, prompt, photo, _id }) {
  return (
    <div className="rounded-xl shadow-card group relative hover:shadow-cardhover card">
      <img
        className="w-full h-auto object-cover rounded-xl"
        src={photo}
        alt={prompt}
      />
      <div className="group-hover:flex flex-col absolute bottom-0 max-h-[94.5%] hidden left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <p className="text-white text-md overflow-y-auto prompt">{prompt}</p>
        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center rounded-full object-cover text-white text-xs font-bold">
              {name[0]}
            </div>
            <p className="text-white text-sm">{name}</p>
          </div>{' '}
          <button
            type="button"
            onClick={() => downloadFile(_id, photo)}
            className="outline-none bg-transparent border-none"
          >
            <img
              src={download}
              alt="download"
              className="w-6 h-6 mt-3 invert"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
