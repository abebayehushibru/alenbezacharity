import React from 'react';
import img1 from "../asserts/images/Abc.PNG";
function About() {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          
          {/* Text Section */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">About Alenbeza Charity</h2>
            <span className="text-xl text-gray-600">Welcome to Alenbeza Charity</span>

            <p className="mt-4 text-gray-700 leading-relaxed">
            አለንቤዛቻርቲ በ2011 ዓ/ም በ 10 ታዳግ ወጣቶች መልካምን ማድረግ በመፈለግ የተጀመረ
ስሆን በአሁኑ ሰዓት 80 አባላት በማድረስ መማር ላልቻሉ ልጆች የትምህርት ቁሳቁስ
በራሳቸው በማቅርብ ወደ ትምህርት ቤት እንድገቡ ማድረግ ችሎዋል፡፡ በመቀጠል ቁሳቁስ
ከማቅረብ ያለፈ 10 ልጆችን በግል ትምህርት ቤት እንድማሩ በማድርግ የተማርዎችን
የትምህርት ወጪ በመክፈል ላይ እንገኛለን፡፡በዚህ መሰረት ሁላቀፍ ሥራዎችን ለመስራት
ፍላጎትና ዓላማ ያለን ስሆን ዕቅዳችን በአጭርና በረጅም ጊዜ በማከፋፈል እየሰራን
እንገኛለን፡፡ የእዉቅና ሥራ ከተጠናቀቀ ደግሞ መንግስታዊና መንግስታዊ ካልሆኑ
ድርጅቶች ጋር በመሆን በከተማና ከከተማ ዉጭ በስፋት በመንቅሳቀስ ለሀገራችን
የምጠቅም ሥራ ለመስራት እንድንችል የሁሉም እገዛ ያስፈልገናል፡፡   </p>

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800">Our Mission</h3>
              <p className="mt-2 text-gray-700 leading-relaxed">
              በማንኛውም ሁኔታ ውስጥ ላሉና ድጋፍ ለሚያስፈልጋቸው ወገኖቻችን
              በተገቢው ሰዓትና ጊዜ መድረስ</p>
            </div>

           
          </div>
          
          {/* Image Section */}
          <div className="lg:w-1/2">
            <img
              src={img1}
              alt="Alenbeza Charity"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
