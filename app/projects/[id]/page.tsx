'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ethers } from 'ethers';

interface ProjectDetails {
    id: string;
    name: string;
    description: string;
    target: string;
    deadline: string;
    milestones: string[];
    owner: string;
}

export default function ProjectDetails({ params }: { params: { id: string } }) {
    const [project, setProject] = useState<ProjectDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const searchParams = useSearchParams();
    const projectId = params.id;// Get project ID from the URL

    useEffect(() => {
        if (!projectId) {
            setError('Invalid project ID');
            setLoading(false);
            return;
        }

        const fetchProjectDetails = async () => {
            try {
                // Replace this mock data with your actual data-fetching logic (e.g., subgraph or smart contract call)
                const mockData: ProjectDetails = {
                    id: projectId,
                    name: 'Mock Project',
                    description: 'This is a description of the mock project.',
                    target: ethers.formatEther('1000000000000000000'), // 1 ETH in wei
                    deadline: new Date().toLocaleDateString(),
                    milestones: ['Milestone 1', 'Milestone 2', 'Milestone 3'],
                    owner: '0x1234567890abcdef1234567890abcdef12345678',
                };

                setProject(mockData);
            } catch (err) {
                setError('Failed to load project details');
            } finally {
                setLoading(false);
            }
        };

        fetchProjectDetails();
    }, [projectId]);

    if (loading) return <div>Loading project details...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="max-w-3xl mx-auto mt-10 p-5 border border-gray-200 rounded-lg shadow-sm">
            <h1 className="text-3xl font-bold mb-4">{project?.name}</h1>
            <p className="text-gray-700 mb-4">{project?.description}</p>
            <div className="mb-4">
                <strong>Target:</strong> {project?.target} ETH
            </div>
            <div className="mb-4">
                <strong>Deadline:</strong> {project?.deadline}
            </div>
            <div className="mb-4">
                <strong>Owner:</strong> <span className="text-blue-600">{project?.owner}</span>
            </div>
            <div className="mb-4">
                <strong>Milestones:</strong>
                <ul className="list-disc list-inside">
                    {project?.milestones.map((milestone, index) => (
                        <li key={index}>{milestone}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
