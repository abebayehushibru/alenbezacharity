import Landing from "../components/Landing";
import Blogs from "../components/Blogs";
import Leaders from "../components/Leaders";
import ChooseUs from "../components/ChooseUs";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Partner from "../components/Partner";
import VideoComponent from "../components/Video";
import StartVideoComponent from "../components/srartVideo";

function Home() {
  return (
    <>
      <Landing />

      <div className="relative flex flex-col gap-20 top-10 mb-10  ">
        <StartVideoComponent/>
        <Blogs />
        <ChooseUs />

        <Leaders />
        <Features />
        <VideoComponent/>
       
       
      </div>
      <Partner />
    </>
  );
}

export default Home;
