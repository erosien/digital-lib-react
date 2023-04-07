import React, { useState } from 'react'
import Button from "./Button"
import Modal from "./Modal"
import { server_calls } from '../api/server';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetData } from '../custom-hooks/FetchData'

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90, hide: true},
    { field: 'ISBN', headerName: 'ISBN', flex: 1},
    { field: 'author', headerName: 'Author', flex: 1},
    { field: 'pages', headerName: 'Pages', flex: 1},
    { field: 'title', headerName: 'Title', flex: 2}, 
    { field: 'type', headerName: 'Type', flex: 1}
]

function DataTable() {
    const [ open, setOpen ] = useState(false);
    const { bookData, getData } = useGetData();
    const [ selectionModel, setSelectionModel ] = useState<string[]>([])

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const deleteData = () => {
        server_calls.delete(selectionModel[0]);
        getData();
        console.log(`Selection model: ${selectionModel}`)
        setTimeout( () => { window.location.reload() }, 500)
    }

    return (
        <>
            <Modal
                id={selectionModel}
                open={open}
                onClose={handleClose}
            />
                <div className="flex flex-row">
                    <div>
                    <button 
                        className="p-3 bg-stone-400 m-3 rounded text-stone-100 hover:bg-stone-500 hover:text-white"
                        onClick={() => handleOpen()}
                    >
                        Add New Book
                    </button>
                <Button onClick={handleOpen} className="p-3 bg-stone-400 m-3 rounded text-stone-100 hover:bg-stone-500 hover:text-white" >Update</Button>
                <Button onClick={deleteData} className="p-3 bg-stone-400 m-3 rounded text-stone-100 hover:bg-stone-500 hover:text-white" >Delete</Button>
                </div>
            </div>
            <div className={ open ? "hidden" : "container mx-10 my-5 flex flex-col" }
                style={{ height: 400, width: '100%' }}
                >
                    <h2 className='p-3 bg-stone-400 text-stone-100 my-2 rounded'>Book List</h2>
                    <DataGrid rows={bookData} columns={columns} rowsPerPageOptions={[5]}
                    checkboxSelection={true} 
                    onSelectionModelChange={ (item:any) => {
                        setSelectionModel(item)
                    }}
                    />
            </div>
        </>
    )
}

export default DataTable
