import React, { Component }  from 'react';
import { useState, useEffect } from "react";
import logo from '../logo.svg';
import '../App.css';
import Song from '../components/Song';
import { Link } from "react-router-dom";

function SavedSong() {
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
    return fetch('http://localhost:8000/api/saved-song', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    }).then(data => data.json());
  }

  const LoadSong = () => {
    return songs.map((val, key) => {
      return <Song key={'song-' + key} data={val} handleClick={removeSong} listPage={false}/>
    })
  };

  const removeSong = async (id) => {
    const response = await removeSongs({token, id});
    alert(response.message)

    /* Reload Data */
    loadSong(token)
  }

  async function removeSongs({ token, id }) {
    return fetch('http://localhost:8000/api/saved-song', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({id, id})
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
                  <Link to="/home" className="text-white rounded-md px-3 py-2 text-sm font-medium">List Song</Link>
                  <Link to="/saved-song" className="bg-gray-900 text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Saved Song</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div>
        <br/>
        <center>
          <h1 htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">Your Saved Song</h1>
          <LoadSong/>
        </center>
      </div>
    </>

  );
}

export default SavedSong;