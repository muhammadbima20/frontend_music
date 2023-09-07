import React from "react";

const Song = ({ data, handleClick, listPage = true }) => {
  const ButtonAction = () => {
    if (data.is_saved) {
      if (listPage) {
        return <button disabled>Saved</button>;
      }else {
        return <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded" onClick={() => handleClick(data.id)}>Remove</button>;
      }
    }else {
      return <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => handleClick(data.id)}>Save</button>;
    }
  }
  return (
    <div>
      <div className="border w-1/2 rounded mt-5 flex p-4 justify-around items-center flex-wrap">
        <img src={data.cover_image} className="w-20" />
        <div className="w-2/3">
          <h3 className="text-lg font-medium">{data.song_name}</h3>
          <h4 className="text-red-700 text-xs font-bold mt-1">{data.artist_name}</h4>
        </div>
        <div>
          <ButtonAction/>
        </div>
      </div>
    </div>
  );
};

export default Song;