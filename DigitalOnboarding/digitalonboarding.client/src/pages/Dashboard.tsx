import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Project {
    id: number;
    projectName: string;
    projectDescription: string;
}

const Dashboard = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState<Project[]>();

    useEffect(() => {
        populateProjectsData();
    }, []);

    const contents = projects === undefined
        ? <p><em>Loading projects...</em></p>
        : <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {projects?.map((project) => (
                        <tr onClick={() => navigate('/project/' + project.id)}>
                            <th scope="row">{project.id}</th>
                            <td>{project.projectName}</td>
                            <td>{project.projectDescription}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>;

    return (
        <div>
            <h1>
                Projects
            </h1>
            <h1>
                {greet('Karolis')}
            </h1>
            {contents}
        </div>
    );

    async function populateProjectsData() {
        const response = await fetch('projects');
        const data = await response.json();
        setProjects(data);
    }

    function greet(name: string): string {
        return `Hello, ${name}!`;
    }
};

export default Dashboard;