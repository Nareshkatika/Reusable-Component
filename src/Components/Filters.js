

const Filters=(props)=>{
    const{query,setQuery,lengthOfItems,setLengthOfItems,setCurrentPage}=props

    //dropdown menu
    const DropDownForLength=()=>{

        return(
            <div style={{display:'flex',marginLeft:'25px'}}>
                <label>ItemsLength:</label>
                <select className="block w-30 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                 value={lengthOfItems} onChange={(event)=>setLengthOfItems(Number(event.target.value))} >
                    {[10,20,50,100].map(eachItem=>(
                        <option value={eachItem} >{eachItem}</option>
                    ))}
                </select>
            </div>
        )
    }

    //search bar
    const onChangeSearch=(event)=>{
        setQuery(event.target.value)
    }

    const searchElement=()=>{
        return(
            <div>
                <input className="block appearance-none w-70 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                 placeholder="search items" value={query}
                  onChange={onChangeSearch} type="search" />
            </div>
        )
    }

    const clearFilters=()=>{
        setQuery('')
        setLengthOfItems(10)
        setCurrentPage(1)
    }

    return(
        <div style={{display:'flex',justifyContent:'flex-start',margin:'15px'}}>
                {searchElement()}
                {DropDownForLength()}
                <button style={{marginLeft:'15px'}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={clearFilters} >Clear Filters</button>
        </div>
    )
}

export default Filters