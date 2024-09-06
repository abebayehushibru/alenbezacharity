import React from 'react';
import { Link } from 'react-router-dom';

const VideoComponent = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start px-4 sm:px-8 py-6 gap-8">
      {/* YouTube Video Section */}
      <div className="w-full sm:w-1/2">
        <iframe
          className="w-full h-64 sm:h-[350px] rounded-md shadow-lg"
          src="https://www.youtube.com/embed/Zs7yq68rMWY" // Use embed format for iframe
          title="YouTube Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        
        {/* Thumbnail Section */}
        
        </div>

      {/* Header and Description Section */}
      <div className="w-full sm:w-1/2 mt-4 sm:mt-0 space-y-4">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-800 underline text-center">ከአለንበዛ ቻሪቲ ተማሪ እና ቤተሰብ ጋር የተደርገ አጭር ቆይታ </h2>
        <p className="text-gray-600 leading-relaxed text-sm">
          በዚህ ቪዲዮ ውስጥ፣ የአለንበዛ በጎ አድራጎት ማህበር ተማሪ እና ወላጅ የልባቸዉን ሃሳብ ሲያካፍሉ ያዳምጡ።
          የበጎ አድራጎት ማህበሩን ከመቀላቀላቸው በፊት ስላጋጠሟቸው ፈተናዎች ፤ ስለነበሩብት ሁኔታ እና አለንቤዛ በጎ አድራጎት ማህበር ወሳኝ ድጋፍ ለመስጠት እንዴት እንደገባ ይገልጻሉ።
        </p>
        <p className="text-gray-600 leading-relaxed">
          በዚህ ታሪኮቻቸው አማካኝነት የበጎ አድራጎት ማህበሩ ላደረገላቸው የተለያዩ ድጋፎች ማለትም ትምህርታዊ እርዳታን፣ ቁሳዊ ድጋፍን እና ስለሌሎች ይስማሉ። እንዲሁም የማህበሩን ከፍተኛ ተፅእኖ የሚያንፀባርቁ ተስፋቸውን፣ ሌሎች የድጋፍ ፍላጎቶቻቸውን እና ለበጎ አድራጎት ማህበር አባላት ያላቸዉን ልባዊ መልእክቶቻቸውን ይሰማሉ።
        </p>
        <p className="text-gray-600 leading-relaxed">
          የአለንቤዛ በጎ አድራጎት ማህበር በምርዳቸዉ ሰዎች  ያመጣውን እውነተኛ ተጽእኖ እና ተስፋን ለማየት ይህንን ቪዲዮ ይመልከቱ። አብረዉን ይህንን መልካምን ስራ ለመስራትና ቤተሰብ ለመሆን ይህንን <Link to="/sign-up" className="text-blue-500 underline">ቤተሰብ ልሁን</Link> ልንክ ይጫኑ ወይንም ልዩ ድጋፍ ለማድረግ <Link to="/sign-up" className="text-blue-500 underline">ድጋፍ ላድርግ</Link> ልንክ ይጫኑ።
        </p>
      </div>
    </div>
  );
};

export default VideoComponent;
