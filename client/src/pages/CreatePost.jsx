import React, { useState, useEffect } from 'react';
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader, RenderCard } from '../components';
import { useNavigate } from 'react-router-dom';
function CreatePost() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    photo: '',
    prompt: '',
  });
  const [generatingImage, setGeneratingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async e => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(
          'https://image-generator-f6fo.onrender.com/api/v1/post',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...form,
            }),
          }
        );
        await response.json();

        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    }
  };
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImage(true);
        const response = await fetch(
          'https://image-generator-f6fo.onrender.com/api/v1/dalle',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              prompt: form.prompt,
            }),
          }
        );

        const data = await response.json();
        console.log(data);
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImage(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  };
  const handleChange = e => {
    setForm(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSurprise = () => {
    setForm(prev => {
      return {
        ...prev,
        prompt: getRandomPrompt(),
      };
    });
  };
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[32px] text-[#495057]">Create</h1>
        <p className="text-[#868e96] text-[18] max-w-[500px] mt-2">
          Create imaginative and visually stunning images through by DALL-E AI
          and share with them with the world.
        </p>
      </div>
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            label="Name"
            type="text"
            placeholder="Enter your name"
            value={form.name}
            name="name"
            handleChange={handleChange}
          />
          <FormField
            label="Prompt"
            type="text"
            placeholder="A photo of Michelangelo's sculpture of David wearing headphones djing"
            value={form.prompt}
            name="prompt"
            handleChange={handleChange}
            isSurprise
            handleSurprise={handleSurprise}
          />
          <div className="relative flex items-center justify-center bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 w-64 h-64 focus:border-blue-500">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
            {generatingImage && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,.2)]">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-10 flex gap-5">
          <button
            onClick={generateImage}
            type="submit"
            className="bg-green-600 text-white text-center font-medium py-2 px-4 rounded-lg w-full sm:w-auto"
          >
            {generatingImage ? 'Generating Image' : 'Generate Image and Share'}
          </button>
        </div>
        <div className="mt-10">
          <p className="mt-2 text-[#868e96] text-[14px]">
            Once you generate the image, you can share it with the world.
          </p>
          <button className="text-white bg-[#7a0b27] text-[14px] font-medium py-2 px-4 rounded-lg w-full text-center sm:w-auto mt-2">
            {loading ? 'Sharing...' : 'Share with the world'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreatePost;
