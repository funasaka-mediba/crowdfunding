import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Card } from 'react-bootstrap';
import axios from 'axios';

const ProjectDetails = ({ match }) => {
    const { id: projectId } = useParams();
    const [project, setProject] = useState({});
    const [returns, setReturns] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/projects/${projectId}`)
            .then(response => {
                setProject(response.data.project || {});
                setReturns(response.data.returns || []);
            })
            .catch(error => {
                console.log(error);
            });
    }, [projectId]);

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {project.imageUrl && (
                <Card.Img variant="top" src={project.imageUrl} alt="Project Image" />
            )}
            <h1>{project.title}</h1>
            <p>{project.description}</p>
            <p>目標額 ￥{project.goalAmount} 円</p>
            <p>残り {project.deadlineInDays} 日</p>
            <h3>リターン</h3>
            {returns.map((returnItem, index) => (
                <Col md={4} key={index} className="mb-4">
                    <Card>
                        <Card.Body>
                            <Card.Title>{returnItem.title}</Card.Title>
                            <Card.Text>{returnItem.description}</Card.Text>
                            <Card.Text>支援額 ￥{returnItem.amount} 円</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </div>
    );
};

export default ProjectDetails;
