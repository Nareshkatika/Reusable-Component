import axios from "axios";
import { useEffect, useState } from "react";
import Filters from "./Filters";

const FirstPage = () => {
  const [store, setStore] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const[lengthOfItems,setLengthOfItems]=useState(10)

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = lengthOfItems;

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/users?limit=300");
        setItems(response.data.users);
        setStore(response.data.users);
        setLoading(false);
      } catch (error) {
        if (!navigator.onLine) {
          setErrorMsg("Network Issue occurs");
        } else {
          setErrorMsg(error.message);
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let apidata = [...items];

    if (query) {
      apidata = apidata.filter(
        (eachItem) =>
          eachItem.firstName.toLowerCase().includes(query.toLowerCase()) ||
          eachItem.lastName.toLowerCase().includes(query.toLowerCase()) ||
          eachItem.bloodGroup.toLowerCase().includes(query.toLowerCase())
      );
    }

    setStore(apidata);
    setCurrentPage(1); // Reset to first page on new search
  }, [items, query]);

  // Pagination slice logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = store.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(store.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="p-4">
      <Filters query={query} setQuery={setQuery}
      lengthOfItems={lengthOfItems}
      setLengthOfItems={setLengthOfItems}
      setCurrentPage={setCurrentPage}
       />

      { errorMsg?<p>{errorMsg}</p>:  loading ? (
        <p>Loading...please wait</p>
      ) : (
        <>
          <table className="min-w-full bg-white border border-gray-300 text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th>S.No</th>
                <th>Id</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Age</th>
                <th>D.O.B</th>
                <th>Gender</th>
                <th>Blood Group</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((eachItem,index) => (
                <tr key={eachItem.id} className="text-center border-t">
                  <td>{index+1}</td>
                  <td>{eachItem.id}</td>
                  <td>{eachItem.firstName}</td>
                  <td>{eachItem.lastName}</td>
                  <td>{eachItem.age}</td>
                  <td>{eachItem.birthDate}</td>
                  <td>{eachItem.gender}</td>
                  <td>{eachItem.bloodGroup}</td>
                  <td>{eachItem.address.country}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {store.length === 0 && <p className="mt-4 text-red-500">No Items Found</p>}

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FirstPage;
