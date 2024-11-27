'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import abi from '@/abis/Crowdfunding.json';
import {
    useWriteContract,
    useWaitForTransactionReceipt
} from 'wagmi';
import { parseEther } from 'viem';
import { toast } from 'sonner';

interface DonateComponentProps {
    address: string; // Contract address
    deadline: number | bigint; // Deadline as timestamp
}

export const DonateComponent: React.FC<DonateComponentProps> = ({
    address,
    deadline
}) => {
    const [donationAmount, setDonationAmount] = useState('');

    // Wagmi write contract hook
    const {
        data: hash,
        error,
        isPending,
        writeContract
    } = useWriteContract();

    // Transaction receipt hook
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash
    });

    // Validate donation amount
    const isValidDonation = () => {
        try {
            const amount = parseFloat(donationAmount);
            return amount > 0;
        } catch {
            return false;
        }
    };

    // Handle donation submission
    const handleDonate = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate inputs
        if (!isValidDonation()) {
            toast.error('Please enter a valid donation amount');
            return;
        }

        // Validate ABI
        if (!abi) {
            toast.error('Invalid contract ABI');
            console.error('ABI is invalid:', abi);
            return;
        }

        try {
            // Validate contract parameters before writing
            const contractParams = {
                abi: abi.abi,
                address: address as `0x${string}`,
                functionName: 'contribute',
                args: [],
                value: parseEther(donationAmount)
            };

            console.log('Contract Write Params:', contractParams);

            writeContract(contractParams);
        } catch (err) {
            toast.error('Failed to submit donation');
            console.error('Donation submission error:', err);
        }
    };

    // Ensure deadline is converted to an integer BigInt
    const deadlineTimestamp = BigInt(Math.floor(
        typeof deadline === 'number'
            ? deadline
            : Number(deadline)
    ));

    // Check if deadline has passed
    const isPastDeadline = BigInt(Math.floor(Date.now() / 1000)) > deadlineTimestamp;

    // Detailed error logging
    useEffect(() => {
        if (error) {
            console.error('Wagmi Write Contract Error:', {
                name: error.name,
                message: error.message,
                stack: error.stack,
                details: (error as any).details
            });

            toast.error(error.message || 'Transaction failed unexpectedly');
        }
    }, [error]);

    return (
        <div className="space-y-4">
            <Input
                type="number"
                placeholder="Amount in ETH"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                disabled={isPastDeadline || isPending || isConfirming}
                step="0.01"
                min="0"
            />
            <Button
                onClick={handleDonate}
                className="w-full"
                disabled={
                    isPastDeadline ||
                    isPending ||
                    isConfirming ||
                    !isValidDonation()
                }
            >
                {isPastDeadline
                    ? 'Deadline Passed'
                    : isPending
                        ? 'Processing...'
                        : isConfirming
                            ? 'Confirming...'
                            : 'Donate'}
            </Button>
        </div>
    );
};