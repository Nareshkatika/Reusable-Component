const TableData = (props) => {
    const { data, tableData } = props;
  
   //Country for nestedone
    const getNestedValue = (item, key) => {
      return key.split('.').reduce((obj, keyPart) => {
        return obj ? obj[keyPart] : undefined;
      }, item);
    };
  
    return (
      <table className="min-w-full bg-white border border-gray-300 text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th>S.No</th>
            {tableData.map((each) => (
              <th key={each.key}>{each.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((eachItem, index) => (
            <tr key={eachItem.id} className="text-center border-t">
              <td>{index + 1}</td>
              {tableData.map((each) => (
                <td key={each.key}>
                  {getNestedValue(eachItem, each.key) || 'N/A'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default TableData;
  