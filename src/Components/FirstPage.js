import axios from "axios";
import { useEffect, useState } from "react";
import Filters from "./Filters";
import TableData from "./Table";
import Pagination from "./Pagination";

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
        const response = await axios.get('https://dummyjson.com/users?limit=300');
        const data=response.data.users
        setItems(data);
        setStore(data);
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

  //totalTableData

  const tableData=[
    {label:'ID',key:'id'},
    {label:'FirstName',key:'firstName'},
    {label:'LastName',key:'lastName'},
    {label:'Age',key:'age'},
    {label:'D.O.B',key:'birthDate'},
    {label:'Gender',key:'gender'},
    {label:'BloodGroup',key:'bloodGroup'},
    {label:'Country',key:'address.country'},
  ]

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
          <TableData data={currentItems}
           tableData={tableData} />

          {store.length === 0 && <p className="mt-4 text-red-500">No Items Found</p>}

         
          <Pagination
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
};

export default FirstPage;
