import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";

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

    const contents = projects === undefined
        ? <p><em>Loading projects...</em></p>
        :
        <Grid
            data={
                projects?.map((project) => [
                    project.id,
                    project.projectName,
                    project.projectDescription
                ])
            }
            columns={['Id', 'Name', 'Description', {
                name: 'Action',
                attributes: (cell, row, column) => {
                    return {
                        'onclick': () => navigate(`/project/${row.cells[0].data}`),
                        'style': 'cursor: pointer',
                    };
                },
                formatter: (cell) => {
                    return "View";
                }
            }]}
        />;

    return (
        <div>
            <div className="d-flex">
                <Button className="mx-auto mb-2" onClick={handleShow} variant="primary">Create Project</Button>
            </div>
            {createProjectModal}
            {contents}
        </div>
    );

    async function populateProjectsData() {
        //const response = await fetch(
        //    'projects',
        //    {
        //        headers: {
        //            'Authorization': `Bearer ${localStorage.getItem('token')}`
        //        },
        //    });
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
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json', // Set the Content-Type header to indicate JSON format
                },
                body: '{"projectName": "' + (document.getElementById("name") as HTMLInputElement).value + '", "projectDescription": "' + (document.getElementById("description") as HTMLInputElement).value + '"}'
            });
        const data = await response.json();
        setProjects(data);
        handleClose();
    }
};

export default Dashboard;