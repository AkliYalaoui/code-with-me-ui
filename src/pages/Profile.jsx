import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const { profile } = useSelector((state) => state.user);
  const projects = [
    {
      _id: 1,
      title: "aaaaa",
      thumbnail: "https://unsplash.it/200/200",
      description: "azer tyuu io qdf hjj cndkolf;fpdr",
    },
    {
      _id: 2,
      title: "bbbbb",
      thumbnail: "https://unsplash.it/200/200",
      description: "azer tyuu io qdf hjj cndkolf;fpdr",
    },
    {
      _id: 3,
      title: "ccccc",
      thumbnail: "https://unsplash.it/200/200",
      description: "azer tyuu io qdf hjj cndkolf;fpdr",
    },
    {
      _id: 4,
      title: "ddddd",
      thumbnail: "https://unsplash.it/200/200",
      description: "azer tyuu io qdf hjj cndkolf;fpdr",
    },
  ];

  return (
    <div className="mt-16">
      <header className="flex justify-center items-center flex-col">
        <img
          className="h-52 w-52 p-1 rounded-full bg-black"
          src={profile.imageUrl}
          alt=""
        />
        <h2 className="text-xl font-bold mt-4">{profile.name}</h2>
      </header>
      <div className="max-w-xl h-1 bg-gray-400 m-auto rounded-full my-4"></div>
      <section className="grid gap-2 grid-cols-1 md:grid-cols-3 max-w-4xl place-items-center m-auto mt-12 p-4">
        {projects.map((project) => (
          <Link key={project._id} to={`/dashboard/${project.title}`}>
            <article className="bg-gray-900 rounded shadow">
              <img
                className="w-72 h-52 object-cover"
                src={project.thumbnail}
                loading="lazy"
                alt=""
              />
              <div className="p-3 space-y-3 text-center border-t-2">
                <h3 className="font-bold">{project.title}</h3>
                <p className="opacity-75">{project.description}</p>
              </div>
            </article>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Profile;
