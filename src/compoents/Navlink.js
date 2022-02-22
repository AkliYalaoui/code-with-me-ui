import { Link } from "react-router-dom";

const Navlink = ({children,to}) => {
  return (
    <Link to={to} className="p-4 hover:border-b-2 hover:border-black hover:bg-gray-100">{children}</Link>
  )
}

export default Navlink