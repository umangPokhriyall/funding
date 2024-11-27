'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchProjectById } from '../../lib/api';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from 'react';
import Image from 'next/image';
import { DonateComponent } from './DonateComponent';

interface ProjectDetailProps {
    id: string;
}

// Helper functions
const formatDate = (timestamp: string) => new Date(parseInt(timestamp) * 1000).toLocaleDateString();
const formatAddress = (address: string | undefined) => {
    if (!address) return "N/A";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
const formatEth = (wei: string) => (parseInt(wei) / 1e18).toFixed(4);

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ id }) => {
    const address = id as `0x${string}`;
    // console.log(address);
    const { data: project, isLoading, error } = useQuery({
        queryKey: ['project', id],
        queryFn: () => fetchProjectById(id),
    });
    const [donationAmount, setDonationAmount] = useState('');

    if (isLoading) return <div className="text-center p-4">Loading project details...</div>;
    if (error) return <div className="text-center p-4 text-red-500">Error fetching project details.</div>;



    const campaign = project?.campaign || {};
    console.log(campaign)
    const milestones = campaign.milestones || [];
    // console.log(milestones)
    const contributions = campaign.contributions || [];
    const progressPercent = (Number(campaign.progress || 0) / Number(campaign.target || 1)) * 100;


    const handleRequestWithdrawal = () => {
        // Implement request withdrawal logic
        console.log('Requesting withdrawal');
    };

    const handleReleaseFunds = () => {
        // Implement release funds logic
        console.log('Releasing funds');
    };

    const handleVote = (milestoneIndex: number) => {
        // Implement voting logic
        console.log(`Voting for milestone ${milestoneIndex}`);
    };

    const isFundraiser = campaign.fundraiser === 'user_address'; // Replace with actual user address check
    const isContributor = contributions.some((c: any) => c.contributor === 'user_address'); // Replace with actual user address check

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">{campaign.name || "Untitled Campaign"}</h1>

            {/* First Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Left side - Image */}
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                    <Image
                        src="/placeholder.svg"
                        alt={campaign.name || "Campaign Image"}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>

                {/* Right side - Campaign Details and Donation */}
                <Card>
                    <CardHeader>
                        <CardTitle>Campaign Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p>{campaign.description || "No description provided"}</p>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Progress:</span>
                                <span>{progressPercent.toFixed(2)}%</span>
                            </div>
                            <Progress value={progressPercent} className="w-full" />
                            <div className="flex justify-between">
                                <span>Target:</span>
                                <span>{formatEth(campaign.target || '0')} ETH</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Raised:</span>
                                <span>{formatEth(campaign.amountRaised || '0')} ETH</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Deadline:</span>
                                <span>{formatDate(campaign.deadline || '0')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Fundraiser:</span>
                                <span title={campaign.fundraiser || "N/A"}>{formatAddress(campaign.fundraiser)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Contributors:</span>
                                <span>{campaign.contributorsCount || 0}</span>
                            </div>
                        </div>
                        <DonateComponent address={address} deadline={campaign.deadline || '0'} />
                    </CardContent>
                </Card>
            </div>

            {/* Second Section - Tabs */}
            <Tabs defaultValue="contributions" className="w-full">
                <TabsList>
                    <TabsTrigger value="contributions">Contributions</TabsTrigger>
                    <TabsTrigger value="milestones">Milestones</TabsTrigger>
                </TabsList>
                <TabsContent value="contributions">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contributions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Contributor</TableHead>
                                        <TableHead>Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {contributions.length > 0 ? (
                                        contributions.map((contribution: any, index: number) => (
                                            <TableRow key={index}>
                                                <TableCell>{formatAddress(contribution.contributor)}</TableCell>
                                                <TableCell>{formatEth(contribution.amount || '0')} ETH</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={2}>No contributions yet</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="milestones">
                    <Card>
                        <CardHeader>
                            <CardTitle>Milestones</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Votes</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {milestones.length > 0 ? (
                                        milestones.map((milestone: any, index: number) => (
                                            <TableRow key={index}>
                                                <TableCell>{milestone.description || "N/A"}</TableCell>
                                                <TableCell>{milestone.votes || 0}</TableCell>
                                                <TableCell>
                                                    {milestone.completed ? 'Completed' :
                                                        milestone.withdrawalRequested ? 'Withdrawal Requested' : 'In Progress'}
                                                </TableCell>
                                                <TableCell>
                                                    {isFundraiser && !milestone.completed && (
                                                        <>
                                                            <Button onClick={handleRequestWithdrawal} className="mr-2">
                                                                Request Withdrawal
                                                            </Button>
                                                            <Button onClick={handleReleaseFunds}>
                                                                Release Funds
                                                            </Button>
                                                        </>
                                                    )}
                                                    {isContributor && !milestone.completed && (
                                                        <Button onClick={() => handleVote(index)}>
                                                            Vote
                                                        </Button>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4}>No milestones available</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

