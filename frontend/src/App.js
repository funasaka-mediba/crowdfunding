import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Row, Col, Card, Button, Form, FormControl } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProjectDetails from './components/ProjectDetails';
import NewProject from './components/NewProject';

const App = () => {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/projects')
      .then(response => {
        setProjects(response.data.projects || []);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Router>
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">クラウドファンディングサイト</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">ホーム</Nav.Link>
                <Nav.Link href="/projects/new">プロジェクト作成</Nav.Link>
                <Nav.Link href="#pricing">サポート</Nav.Link>
              </Nav>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="プロジェクトを検索"
                  className="me-2"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container>
          <Routes>
            <Route path="/" element={
              <Row>
                {filteredProjects.map((project, index) => (
                  <Col md={4} key={index} className="mb-4">
                    <Card>
                      <Card.Body>
                        <Card.Title>{project.title}</Card.Title>
                        <Card.Text>{project.description}</Card.Text>
                        <Card.Text>目標額 ￥{project.goalAmount} 円</Card.Text>
                        <Card.Text>残り {project.deadlineInDays} 日</Card.Text>
                        <Button variant="primary" href={`/projects/${project._id}`}>詳細を見る</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            } />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/projects/new" element={<NewProject />} />
          </Routes>
        </Container>

        <footer className="text-center mt-4">
          <p>&copy; 2024 クラウドファンディングサイト</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
