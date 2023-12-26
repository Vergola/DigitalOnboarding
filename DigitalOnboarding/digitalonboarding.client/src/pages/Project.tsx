import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface Project {
    id: number;
    projectName: string;
    projectDescription: string;
}

const Project = () => {
    const [project, setProject] = useState<Project>();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        populateProjectData();
    }, []);

    return (
        <div>
            <h1>Project</h1>
            <h1>{project?.projectName}</h1>
            <p>{project?.projectDescription}</p>
        </div>
    );

    async function populateProjectData() {
        const response = await fetch('/projects/' + id);
        if (response.status != 204 && response.ok) {
            const data = await response.json();
            setProject(data);
        }
        else {
            navigate('/');
        }
    }
};

export default Project;