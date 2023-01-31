import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { logo } from './assets';
import { Home, CreatePost } from './pages';
function App() {
  return (
    <BrowserRouter>
      <header className=" flex w-full items-center justify-between sm:px-8 px-4 py-4 border-b border-b-[#7a0b27]">
        <Link to="/">
          <img src={logo} className="w-28 object-contain" alt="" />
        </Link>
        <Link
          to="/create-post"
          className="px-4 py-2 rounded font-medium text-white bg-[#7a0b27]"
        >
          Create Post
        </Link>
      </header>
      <main className="w-full min-h-[calc(100vh-75px)] bg-[#f1f3f5] sm:p-8 px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
