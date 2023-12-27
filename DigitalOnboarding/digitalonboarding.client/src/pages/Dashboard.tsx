import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import * as React from 'react';

interface Project {
    id: number;
    projectName: string;
    projectDescription: string;
}

const Dashboard = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState<Project[]>();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        populateProjectsData();
    }, []);

    const [selectionModel, setSelectionModel] = React.useState<GridRowSelectionModel>([]);

    const handleSelectionModelChange = (newSelectionModel: GridRowSelectionModel) => {
        setSelectionModel(newSelectionModel);
        // Do something with the selected rows
        console.log('Selected Rows:', newSelectionModel);
    };

    const createProjectModal = (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <input type="text" className="form-control" id="name" placeholder="Name" />
                    </div>
                    <div className="form-group mt-2">
                        <input type="text" className="form-control" id="description" placeholder="Description" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={createProject}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

    //const contents = projects === undefined
    //    ? <p><em>loading projects...</em></p>
    //    :
    //    <grid
    //        data={
    //            projects?.map((project) => [
    //                project.id,
    //                project.projectname,
    //                project.projectdescription
    //            ])
    //        }
    //        columns={[
    //            {
    //                name: 'id',
    //                hidden: true
    //            },
    //            'name',
    //            'description', {
    //            name: 'action',
    //            attributes: (cell: cell, row: row, column: column) => {
    //                return {
    //                    'onclick': () => navigate(`/project/${row.cells[0].data}`),
    //                    'style': 'cursor: pointer',
    //                };
    //            },
    //            formatter: (cell) => {
    //                return "view";
    //            }
    //        }]}
    //    />;

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 }
    ];

    const rows =
        projects?.map((project) => {
            return {
                id: project.id,
                name: project.projectName,
                description: project.projectDescription
            }
        });

    const contents = projects === undefined
        ? <p><em>Loading projects...</em></p>
        :
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                onSelectionModelChange={handleSelectionModelChange}
                selectionModel={selectionModel}
            />
        </div>;

    return (
        <div>
            <div className="d-flex">
                <Button className="mx-auto mb-2" onClick={handleShow} variant="primary">Create Project</Button>
            </div>
            {createProjectModal}
            {contents}
            <div className="d-flex mt-2">
                <Button className="mx-auto mb-2" onClick={deleteProject} variant="primary">Delete Selected</Button>
            </div>
        </div>
    );

    async function populateProjectsData() {
        const response = await fetch(
            'projects');
        const data = await response.json();
        setProjects(data);
    }

    async function createProject() {
        const response = await fetch(
            'projects',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to indicate JSON format
                },
                body: '{"projectName": "' + (document.getElementById("name") as HTMLInputElement).value + '", "projectDescription": "' + (document.getElementById("description") as HTMLInputElement).value + '"}'
            });
        const data = await response.json();
        setProjects(data);
        handleClose();
    }

    async function deleteProject() {
        const response = await fetch(
            '/projects/' + 1,
            {
                method: 'DELETE'
            }
        );
        const data = await response.json();
        setProjects(data);
    }
};

export default Dashboard;