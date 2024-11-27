// /app/projects/page.tsx
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
import ProjectsList from '../components/ProjectsList';
import { fetchProjects } from '../../lib/api';

export default async function ProjectsPage() {
    const queryClient = new QueryClient();

    // Prefetch data for the list of projects
    await queryClient.prefetchQuery({
        queryKey: ['projects'],
        queryFn: fetchProjects,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProjectsList />
        </HydrationBoundary>
    );
}
