import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import $ from 'jquery';

interface Project {
    id: number;
    projectName: string;
    projectDescription: string;
    projectType: string;
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
                    <select className="form-select mt-2" aria-label="Default select example" id="type" defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled>Select Project Type...</option>
                        <option value="Lithuania">Lithuania</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="France">France</option>
                    </select>
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
        <div style={{ width: '100%' }}>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {projects?.map((project) => {
                    return (
                        <tr key={project.id}>
                            <td>{project.projectName}</td>
                            <td>{project.projectDescription}</td>
                            <td>{project.projectType}</td>
                            <td className="p-2">
                                <Button variant="primary" className="mr-2" onClick={() => deleteProject(project.id)}>Delete</Button>
                                <Button variant="primary" onClick={() => navigate('/project/' + project.id)}>View</Button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>;

    return (
        <div>
            <div className="d-flex">
                <Button className="ml-auto mb-2" onClick={handleShow} variant="primary">Create Project</Button>
            </div>
            {createProjectModal}
            {contents}
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
                body: '{"projectName": "' + $("#name").val() + '", "projectDescription": "' + $("#description").val() + '", "projectType": "' + $("#type").val() + '"}'
            });
        const data = await response.json();
        setProjects(data);
        handleClose();
    }

    async function deleteProject(id: number) {
        const response = await fetch(
            '/projects/' + id,
            {
                method: 'DELETE'
            }
        );
        const data = await response.json();
        setProjects(data);
    }
};

export default Dashboard;