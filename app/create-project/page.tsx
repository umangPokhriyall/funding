'use client';

import React, { useState } from 'react';
import { useWriteContract } from 'wagmi'
import { ethers } from 'ethers';
import abi from '@/ABI.json';

const factoryAddress = '0xA14b56CFa13B5E94778F2Cdf198345bAE706965B'; // Replace with your contract address

const CreateCampaign: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [target, setTarget] = useState('');
  const [deadline, setDeadline] = useState('');
  const [withdrawalLimit, setWithdrawalLimit] = useState('');
  const [milestones, setMilestones] = useState<string[]>(['']);

  // Use the `useWriteContract` hook
  const { writeContract } = useWriteContract();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await writeContract({
        abi: abi.abi,
        address: factoryAddress,
        functionName: 'createCampaign',
        args: [
          name,
          description,
          ethers.parseEther(target || '0'),
          Math.floor(new Date(deadline).getTime() / 1000),
          ethers.parseEther(withdrawalLimit || '0'),
          milestones,
        ],
      });
      console.log('Campaign created successfully');
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  const handleAddMilestone = () => {
    setMilestones([...milestones, '']);
  };

  const handleMilestoneChange = (index: number, value: string) => {
    const updatedMilestones = [...milestones];
    updatedMilestones[index] = value;
    setMilestones(updatedMilestones);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-5 border border-gray-200 rounded-lg shadow-sm">
      <h1 className="text-2xl font-semibold mb-5">Create a Campaign</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Target (ETH)</label>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Withdrawal Limit (ETH)
          </label>
          <input
            type="number"
            value={withdrawalLimit}
            onChange={(e) => setWithdrawalLimit(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Milestones</label>
          {milestones.map((milestone, index) => (
            <input
              key={index}
              type="text"
              value={milestone}
              onChange={(e) => handleMilestoneChange(index, e.target.value)}
              className="w-full p-2 mb-2 border rounded"
              placeholder={`Milestone ${index + 1}`}
              required
            />
          ))}
          <button
            type="button"
            onClick={handleAddMilestone}
            className="text-blue-500 text-sm mt-2"
          >
            + Add another milestone
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Create Campaign
        </button>
      </form>
    </div>
  );
};

export default CreateCampaign;
