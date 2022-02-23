import {FaCog,FaArrowDown} from 'react-icons/fa'
import {useAuth} from "../context/AuthProvider";
import {Link} from "react-router-dom";

const Home = () => {
  const [user] = useAuth();

  return (
    <header className="mt-6 max-w-5xl m-auto">
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-medium">You Want Test Some Html Css Or Js, Or Look At Some Code ?</h1>
      <p className="mt-6 mb-8 opacity-90 text-xl sm:text-2xl sm:leading-10">You Are In The Right Place, Even Better You Can Do It Real Time With Friends. CodeWithMe Let You Achieve All Of That And More.</p>
      {!user ? <Link className="bg-gray-900 text-white p-4 rounded hover:opacity-80"  to="/register">Sign Up For Free</Link> : <Link className="bg-gray-900 text-white p-4 rounded hover:opacity-80" to="/dashboard">Go To Dashboard</Link>}
      <section className="mt-14 grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-2">
        <article className="bg-gray-900 p-4 rounded h-44 w-full">
          <div className="flex justify-between items-center text-white border-b border-b-gray-700 pb-2 mb-4">
            <div className="flex items-center space-x-2"><FaCog/><span>HTML</span></div>
            <div><FaArrowDown/></div>
          </div>
          <code className="text-white">
          <span className="text-yellow-700">&lt;div</span> <span className="text-orange-800">class</span>=<span className="text-green-700">"m-auto"</span><span className="text-yellow-700">&gt;&lt;/div&gt;</span>
          </code>
        </article>
        <article className="bg-gray-900 p-4 rounded h-44 w-full">
          <div className="flex justify-between items-center text-white border-b border-b-gray-700 pb-2 mb-4">
            <div className="flex items-center space-x-2"><FaCog/><span>CSS</span></div>
            <div><FaArrowDown/></div>
          </div>
          <code className="text-white">
          <span className="text-yellow-700">.center	&#123;</span><br/> <span className="text-purple-400 pl-4">margin:</span><span className="text-yellow-400">auto</span>;<br/><span className="text-yellow-700">&#65373;</span>
          </code>
        </article>
        <article className="bg-gray-900 p-4 rounded h-44 w-full">
          <div className="flex justify-between items-center text-white border-b border-b-gray-700 pb-2 mb-4">
            <div className="flex items-center space-x-2"><FaCog/><span>JS</span></div>
            <div><FaArrowDown/></div>
          </div>
          <code className="text-white">
          <span className="text-yellow-400">const</span> <span className="text-blue-300">body</span> = <span className="text-yellow-100">document.body</span>;
          </code>
        </article>
      </section>
    </header>
  )
}

export default Home