import React from 'react';
import '../style.css';

const Projects = () => {
    const defaultProjects = [
        {
            title: 'Project One',
            description: 'This project involves creating a responsive portfolio website using React and Bootstrap.',
            link: '#',
            image: 'https://images.unsplash.com/photo-1555685812-7e9d3d0eafde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzQwN3wwfDF8c2VhcmNofDV8fGNvZGV8ZW58MHx8fHwxNjM0MDY1NzU5&ixlib=rb-1.2.1&q=80&w=400'
        },
        {
            title: 'Project Two',
            description: 'A simple project to demonstrate Bootstrap integration with a React application.',
            link: '#',
            image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzQwN3wwfDF8c2VhcmNofDl8fGNvZGV8ZW58MHx8fHwxNjM0MDY1NzU5&ixlib=rb-1.2.1&q=80&w=400'
        },
        {
            title: 'Project Three',
            description: 'This project showcases various features of React, including state management and component lifecycle.',
            link: '#',
            image: 'https://images.unsplash.com/photo-1517430816045-df4b7de4eeea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzQwN3wwfDF8c2VhcmNofDIzfHxjb2RlfGVufDB8fHx8MTYzNDA2NTc1OA&ixlib=rb-1.2.1&q=80&w=400'
        },
        {
            title: 'Project Four',
            description: 'A project focusing on advanced CSS techniques to create visually appealing web pages.',
            link: '#',
            image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzQwN3wwfDF8c2VhcmNofDIwfHxjb2RlfGVufDB8fHx8MTYzNDA2NTc1OA&ixlib=rb-1.2.1&q=80&w=400'
        },
        {
            title: 'Project Five',
            description: 'A comprehensive project exploring JavaScript ES6 features and their practical applications.',
            link: '#',
            image: 'https://images.unsplash.com/photo-1558888779-6d5b677d7e1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzQwN3wwfDF8c2VhcmNofDE3fHxjb2RlfGVufDB8fHx8MTYzNDA2NTc1OA&ixlib=rb-1.2.1&q=80&w=400'
        },
        {
            title: 'Project Six',
            description: 'This project demonstrates integration with third-party APIs to fetch and display data dynamically.',
            link: '#',
            image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzQwN3wwfDF8c2VhcmNofDI1fHxjb2RlfGVufDB8fHx8MTYzNDA2NTc1OA&ixlib=rb-1.2.1&q=80&w=400'
        }
    ];

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Projects</h2>
            <div className="row">
                {defaultProjects.map((project, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card project-card h-100">
                            <img src={project.image} className="card-img-top" alt={project.title} />
                            <div className="card-body">
                                <h5 className="card-title">{project.title}</h5>
                                <p className="card-text">{project.description}</p>
                                <a href={project.link} className="btn btn-primary">Learn More</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
