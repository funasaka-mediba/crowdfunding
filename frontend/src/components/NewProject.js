import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const NewProject = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [goalAmount, setGoalAmount] = useState('');
    const [deadline, setDeadline] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('goalAmount', goalAmount);
        formData.append('deadline', deadline);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post('http://localhost:5000/projects', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error('There was an error creating the project!', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
                <Form.Label>タイトル</Form.Label>
                <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formDescription">
                <Form.Label>説明</Form.Label>
                <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formGoalAmount">
                <Form.Label>目標金額</Form.Label>
                <Form.Control type="number" value={goalAmount} onChange={(e) => setGoalAmount(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formDeadline">
                <Form.Label>締め切り</Form.Label>
                <Form.Control type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formImage">
                <Form.Label>画像</Form.Label>
                <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
            </Form.Group>
            <Button variant="primary" type="submit">
                作成
            </Button>
        </Form>
    );
};

export default NewProject;
