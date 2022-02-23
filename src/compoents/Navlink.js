import { Link } from "react-router-dom";

const Navlink = ({children,to}) => {
  return (
    <Link to={to} className="px-2 py-4 hover:border-b-2 hover:border-black hover:bg-gray-100">{children}</Link>
  )
}

export default Navlink