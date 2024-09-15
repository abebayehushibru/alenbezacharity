import { DataGrid, GridToolbar , GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';

import { Button } from "@mui/material";
import { usePopup } from "../../context/popUpContext";
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
const  Datatable=({rows,columns,loading,ButtonOne,add,addTwo,ButtonTwo,OtherComponent})=> {
 const {showSmallPopup}=usePopup()


  return (
    <div className="flex flex-1 flex-col" style={{ height: "auto" }}>
      {/* Buttons for adding data */}
      <div className="flex mb-4 gap-4 ">
     <div className='flex gap-4 flex-1'>
     {ButtonOne && <Button
          variant="contained"
          
          onClick={()=>{
            showSmallPopup(add)
          }}
          className="mr-2 text-blue-600 border-2 border-blue-600 capitalize"
        >
          Add  {add}
        </Button>}
        {ButtonTwo&& <Button
          variant="contained"
          
          onClick={()=>{
            showSmallPopup(addTwo)
          }}
          className="mr-2 text-blue-600 border-2 border-blue-600 capitalize"
        >
          Add  {addTwo}
        </Button>}
      </div> 
      <div className='flex min-w-1/2'>
      {OtherComponent&&<OtherComponent/>}
      </div>
      </div>

      {/* Data Grid with Export functionality */}
      <DataGrid
        className="dataGrid"
        rows={rows}
        rowHeight={35}
        columns={columns}
        pagination
        autoPageSize
        
        onPaginationModelChange={(model) => console.log("Page model changed:", model)}
        loading={loading}
        components={{ Toolbar: GridToolbar }}
        slots={{
          toolbar: CustomToolbar,
        }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true, // Optional: Show quick filter input
            printOptions: { disableToolbarButton: true }, // Optional: Customize toolbar buttons
          },
        }}
      />
    </div>
  );
}

export default Datatable;
