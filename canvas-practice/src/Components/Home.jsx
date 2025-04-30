import React from "react";
import HomeImage from "../../public/HomeImage.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="fixed w-full h-full flex justify-between items-center px-1">
      <div>
        <div className="fixed top-35 left-6 font-inknut text-4xl font-sans flex flex-col items-center justify-center">
          <h2>Low Code</h2>
          <h2>No Code</h2>
        </div>
        <p className="fixed top-71 left-5 text-lg line-clamp-6 max-w-2xl">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat
          libero totam dolor quos eum molestiae assumenda exercitationem.
          Voluptates expedita ipsam numquam harum error alias voluptate
          cupiditate, nobis perspiciatis, voluptas non? Similique error ullam
          expedita? Explicabo, amet hic optio quaerat rem neque velit eum
          quisquam dignissimos doloribus animi. Corrupti delectus facere debitis
          eaque? Mollitia, hic quae aspernatur modi rem neque libero! Eaque
          magni doloremque ab, neque dolorum sed optio libero doloribus aliquam
          adipisci illo officiis eos minus odit, aperiam blanditiis quaerat
          dolor cumque iusto reprehenderit. Iste dolores quos dolorem repellat
          iure? Quod, cupiditate impedit aliquid earum hic sit praesentium et
          unde dolores delectus obcaecati ratione minus accusantium soluta
          adipisci recusandae sunt, quae ullam ipsa! Impedit eaque numquam
          perferendis, perspiciatis laborum harum? Maiores dignissimos sequi
          veritatis maxime sunt minus facere adipisci? Suscipit inventore
          placeat nihil ipsa, distinctio mollitia odit pariatur iure fugit
          molestias perspiciatis veritatis at, dicta non sed, quibusdam nemo
          maiores. Aliquam similique, quam incidunt consequatur distinctio
          dolorum odit facilis nemo cumque quibusdam saepe beatae officiis non
          omnis ad eius tenetur! Enim est omnis, ipsa aspernatur alias aperiam
          libero. Quasi, dolorum!
        </p>
        <div className="fixed bottom-40 left-10 w-36 h-12 rounded-[8px] overflow-hidden bg-gray-200">
          <button className="bg-[#632379] w-full h-full text-white px-4 py-2">
            <Link
              to={"/works/all-projects"}
              className="text-white"
              style={{ textDecoration: "none" }}
            >
              Get started
            </Link>
          </button>
        </div>
      </div>

      <div>
        <img src={HomeImage} alt="Home Image" className="w-3xl" />
      </div>
    </div>
  );
};

export default Home;
