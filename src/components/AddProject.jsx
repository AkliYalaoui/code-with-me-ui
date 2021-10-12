import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgb(17, 24, 39)",
    color: "white",
  },
};
Modal.setAppElement("#root");

const AddProject = ({modalIsOpen,closeModal}) => {

  const addNewProject = (e) => {
    e.preventDefault();
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Add new project"
    >
      <button className="block ml-auto mb-4" onClick={closeModal}>
        <FaTimes />
      </button>
      <form onSubmit={addNewProject} className="space-y-4">
        <div className="flex flex-col space-y-2 capitalize text-lg">
          <label htmlFor="title">title</label>
          <input
            className="p-2 bg-gray-800 text-gray-200"
            type="text"
            required
            id="title"
          />
        </div>
        <div className="flex flex-col space-y-2 capitalize text-lg">
          <label htmlFor="thumbnail">thumbnail</label>
          <input
            className="p-2 bg-gray-800 text-gray-200"
            type="file"
            required
            id="thumbnail"
          />
        </div>
        <div className="flex flex-col space-y-2 capitalize text-lg">
          <label htmlFor="description">description</label>
          <textarea
            className="p-2 bg-gray-800 text-gray-200"
            required
            id="description"
          />
        </div>
        <button
          className="py-2 px-4 block m-auto bg-gray-800 text-gray-200 rounded"
          type="submit"
        >
          Add
        </button>
      </form>
    </Modal>
  );
};

export default AddProject;
