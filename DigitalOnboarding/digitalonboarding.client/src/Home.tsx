import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Project {
    id: number;
    projectName: string;
    projectDescription: string;
}

const Home = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState<Project[]>();

    useEffect(() => {
        populateProjectsData();
    }, [])

    return (
        <>
            <h1>
                {greet('Karolis')}
            </h1>
            <button onClick={() => navigate('/')}>
                Login
            </button>
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
                        <tr>
                            <th scope="row">{project.id}</th>
                            <td>{project.projectName}</td>
                            <td>{project.projectDescription}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
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

export default Home;