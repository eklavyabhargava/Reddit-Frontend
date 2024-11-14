import Posts from "../components/Posts";
import RightSidebar from "../components/RightSidebar";

const Home = () => {
  return (
    <div className="flex flex-row w-full">
      <Posts />
      <div className="desktop:flex hidden w-[30%]">
        <RightSidebar />
      </div>
    </div>
  );
};

export default Home;
