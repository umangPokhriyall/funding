'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image';
import { fetchProjects } from '../../lib/api';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

// Helper function to format date
function formatDate(timestamp: string) {
    return new Date(parseInt(timestamp) * 1000).toLocaleDateString();
}

// Helper function to format address
function formatAddress(address: string) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Helper function to format ETH amount
function formatEth(wei: string) {
    return (parseInt(wei) / 1e18).toFixed(4);
}

export default function ProjectsList() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['projects'],
        queryFn: fetchProjects,
    });

    if (isLoading) return <div className="text-center p-4">Loading projects...</div>;
    if (error) return <div className="text-center p-4 text-red-500">Error fetching projects.</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Crowdfunding Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.campaigns?.map((project: any) => (
                    <Card key={project.id} className="overflow-hidden">
                        <CardHeader>
                            <Image
                                src="/placeholder.svg"
                                alt={project.name}
                                width={400}
                                height={200}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                        </CardHeader>
                        <CardContent>
                            <CardTitle className="mb-2">{project.name}</CardTitle>
                            <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Progress:</span>
                                    <span>{(Number(project.progress) / Number(project.target) * 100).toFixed(2)}%</span>
                                </div>
                                <Progress value={Number(project.progress) / Number(project.target) * 100} className="w-full" />
                                <div className="flex justify-between text-sm">
                                    <span>Target:</span>
                                    <span>{formatEth(project.target)} ETH</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Raised:</span>
                                    <span>{formatEth(project.amountRaised)} ETH</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Deadline:</span>
                                    <span>{formatDate(project.deadline)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Fundraiser:</span>
                                    <span title={project.fundraiser}>{formatAddress(project.fundraiser)}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full">
                                <Link href={`/projects/${project.id}`}>View Project</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}

