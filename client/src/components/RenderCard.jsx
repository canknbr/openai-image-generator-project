import React from 'react';
import { Card } from './index';
function RenderCard({ data, title }) {
  if (data?.length > 0) {
    return data.map(post => {
      return <Card key={post.id} {...post} />;
    });
  }
  return <h2 className="text-xl mt-3 font-medium text-[#868e96]">{title}</h2>;
}

export default RenderCard;
