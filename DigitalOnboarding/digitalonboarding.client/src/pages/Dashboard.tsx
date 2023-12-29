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
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [project, setProject] = useState<Project>({} as Project);

    const handleCreateClose = () => setShowCreate(false);
    const handleCreateShow = () => setShowCreate(true);
    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = () => setShowEdit(true);

    useEffect(() => {
        populateProjectsData();
    }, []);

    const createProjectModal = (
        <>
            <Modal show={showCreate} onHide={handleCreateClose}>
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
                    <Button variant="secondary" onClick={handleCreateClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={createProject}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

    const editProjectModal = (
        <>
            <Modal show={showEdit} onHide={handleEditClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <input type="text" className="form-control" id="editName" placeholder="Name" defaultValue={project.projectName} />
                    </div>
                    <div className="form-group mt-2">
                        <input type="text" className="form-control" id="editDescription" placeholder="Description" defaultValue={project.projectDescription} />
                    </div>
                    <select className="form-select mt-2" aria-label="Default select example" id="editType" defaultValue={project.projectType}>
                        <option value="DEFAULT" disabled>Select Project Type...</option>
                        <option value="Lithuania">Lithuania</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="France">France</option>
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={editProject}>
                        Save
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
                                <Button variant="primary" className="mr-2" onClick={() => navigate('/project/' + project.id)}>View</Button>
                                <Button variant="primary" onClick={() => { setProject(project); handleEditShow() }}>Edit</Button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>;

    return (
        <div>
            <h1>Projects</h1>
            {createProjectModal}
            {editProjectModal}
            {contents}
            <div className="d-flex">
                <Button className="ml-auto mt-2" onClick={handleCreateShow} variant="primary">Create Project</Button>
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
                body: '{"projectName": "' + $("#name").val() + '", "projectDescription": "' + $("#description").val() + '", "projectType": "' + $("#type").val() + '"}'
            });
        const data = await response.json();
        setProjects(data);
        handleCreateClose();
    }

    async function editProject() {
        const response = await fetch(
            'projects',
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to indicate JSON format
                },
                body: '{"id":' + project.id + ', "projectName": "' + $("#editName").val() + '", "projectDescription": "' + $("#editDescription").val() + '", "projectType": "' + $("#editType").val() + '"}'
            });
        const data = await response.json();
        setProjects(data);
        handleEditClose();
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