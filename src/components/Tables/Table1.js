import {
    DataGrid,
    GridRowsProp,
    GridColDef,
    GridToolbar,
  } from "@mui/x-data-grid";
  
  
  
  function Datatable(props) {
    return (
      <div className="flex flex-1" style={{ height: "auto" }}>
        <DataGrid
          className="dataGrid"
          rows={props.rows}
          rowHeight={40}
          columns={props.columns}
          pagination
        loading={props.loading}
          
        />
      </div>
    );
  }
  
  export default Datatable;
  