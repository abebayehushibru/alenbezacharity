import React from 'react';

const VideoComponent = () => {
  return (
    <div className="flex items-center justify-center">
      {/* YouTube Video Section */}
      <div className="w-full sm:w-1/2">
        <iframe
          className="w-full h-64 sm:h-[350px] rounded-md shadow-lg"
          src="https://www.youtube.com/embed/pBq5fyUskxk" // Use 
          title="YouTube Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        
        {/* Thumbnail Section */}
        
        </div>
     
    </div>
  );
};

export default VideoComponent;
