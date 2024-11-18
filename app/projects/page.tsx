'use client';

import React from 'react';
import Link from 'next/link';

const mockProjects = [
    {
        id: 1,
        name: 'Clean Water Initiative',
        description: 'A campaign to provide clean water to underprivileged areas.',
        target: '10',
        deadline: '2024-12-31',
    },
    {
        id: 2,
        name: 'Renewable Energy Project',
        description: 'Installing solar panels in rural communities.',
        target: '25',
        deadline: '2025-03-15',
    },
    {
        id: 3,
        name: 'Education for All',
        description: 'Building schools in remote regions.',
        target: '50',
        deadline: '2024-09-01',
    },
];

export default function Projects() {
    return (
        <div className="max-w-4xl mx-auto mt-10 p-5">
            <h1 className="text-2xl font-semibold mb-5">All Projects</h1>
            {mockProjects.length > 0 ? (
                <div className="space-y-4">
                    {mockProjects.map((project) => (
                        <div
                            key={project.id}
                            className="p-4 border rounded-lg shadow-sm hover:shadow-md"
                        >
                            <h2 className="text-lg font-medium">{project.name}</h2>
                            <p className="text-sm text-gray-700">{project.description}</p>
                            <p className="text-sm text-gray-500">
                                Target: {project.target} ETH
                            </p>
                            <p className="text-sm text-gray-500">
                                Deadline: {new Date(project.deadline).toLocaleDateString()}
                            </p>
                            <Link href={`/projects/${project.id}`}>
                                <div className="text-blue-500 hover:underline text-sm mt-2 block">
                                    View Details
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No projects found.</p>
            )}
        </div>
    );
}
