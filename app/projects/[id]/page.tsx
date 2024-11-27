// /app/projects/[id]/page.tsx
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
import { ProjectDetail } from '../../components/ ProjectDetail';
import { fetchProjectById } from '../../../lib/api';

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const queryClient = new QueryClient();

    // Prefetch data for the individual project
    await queryClient.prefetchQuery({
        queryKey: ['project', id],
        queryFn: () => fetchProjectById(id),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProjectDetail id={id} />
        </HydrationBoundary>
    );
}
