import React, { useState, useEffect } from 'react';
import { FormField, Loader, RenderCard } from '../components';
function Home() {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredPost, setFilteredPost] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://image-generator-f6fo.onrender.com/api/v1/post',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setPost(data.data.reverse());
        }
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);
  const handleSearch = e => {
    clearTimeout(searchTimeout);
    setSearch(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const filteredPost = post.filter(post => {
          return (
            post.name.toLowerCase().includes(search.toLowerCase()) ||
            post.prompt.toLowerCase().includes(search.toLowerCase())
          );
        });
        setFilteredPost(filteredPost);
      }, 500)
    );
  };
  return (
    <section
      className="
  max-w-7xl mx-auto
  "
    >
      <div>
        <h1 className="font-extrabold text-[32px] text-[#495057]">
          The Showcase Results
        </h1>
        <p className="text-[#868e96] text-[18] max-w-[500px] mt-2">
          Browse through the collection of imaginative and visually stunning
          images generating by DALL-E AI.
        </p>
      </div>
      <div className="mt-16">
        <FormField
          label="Search"
          name="search"
          type="text"
          placeholder="Search by name or prompt"
          value={search}
          handleChange={handleSearch}
        />
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex- items-center justify-center">
            <Loader />
          </div>
        ) : (
          <>
            {search && (
              <h2 className="text-xl mb-3 font-medium text-[#868e96]">
                Showing results for "
                <span className="text-[#495057]">{search}</span>"
              </h2>
            )}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  gap-3">
              {search ? (
                <RenderCard data={filteredPost} title="no search results" />
              ) : (
                <RenderCard data={post} title="no post founds" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Home;
