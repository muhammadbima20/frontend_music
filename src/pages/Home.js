import React, { Component }  from 'react';
import { useState, useEffect } from "react";
import logo from '../logo.svg';
import '../App.css';
import Song from '../components/Song';
import { Link } from "react-router-dom";

function Home() {
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState('');
  const [token, setToken] = useState();
  useEffect(() => {
    let sessionData = JSON.parse(localStorage.getItem('login'));
    loadSong(sessionData.token)
    setToken(sessionData.token)
  }, [search])

  const loadSong = async (token) => {
    const response = await fetchSongs({token});
    setSongs(response.data.songs);
  }

  async function fetchSongs({ token }) {
    return fetch('http://localhost:8000/api/song?search=' + search, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    }).then(data => data.json());
  }

  const LoadSong = () => {
    return songs.map((val, key) => {
      return <Song key={'song-' + key} data={val} handleClick={saveSong}/>
    })
  };

  const saveSong = async (id) => {
    const response = await saveSongs({token, id});
    alert(response.message)

    loadSong(token);
  }

  async function saveSongs({ token, id }) {
    return fetch('http://localhost:8000/api/save-song', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({id: id})
    }).then(data => data.json());
  }

  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <Link to="/home" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">List Song</Link>
                  <Link to="/saved-song" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Saved Song</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <a href="#" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Dashboard</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Team</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Projects</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Calendar</a>
          </div>
        </div>
      </nav>


      <div>
        <br/>
        <center>
          <h1 htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">Songs</h1>
          <div className="relative mt-2 rounded-md">
            <input type="text" name="price" id="price" 
              className="block w-1/4 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => {
                setSearch(e.target.value)
              }}
            />
          </div>

          <LoadSong/>
        </center>
      </div>
    </>

  );
}

export default Home;