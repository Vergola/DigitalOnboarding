import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Project {
    name: string;
    description: string;
}

const Home = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState<Project[]>();

    useEffect(() => {
        const projects = getProjects();
        setProjects(projects);
    }, [])

    return (
        <>
            <h1>
                Home
            </h1>
            <button onClick={() => navigate(-1)}>
                Login
            </button>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {projects?.map((project, index) => (
                        <tr>
                            <th scope="row">{index}</th>
                            <td>{project.name}</td>
                            <td>{project.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );

    function getProjects() {
        const projects: Project[] = [
            { name: "Karolis Project", description: "Reboarding project" },
            { name: "David Project", description: "Onbooarding project" }
        ];

        return projects;
    }
};

export default Home;