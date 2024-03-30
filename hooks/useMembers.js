import useGroups from './useGroups';

export default function useMembers(groupId) {
    const { data: groupsData, error, isLoading } = useGroups()

    let users = []
    if (!isLoading && groupsData) {
        users = groupsData?.groups?.find(({ id }) => id == groupId)?.members
    }

    return {
        data: users,
        error,
        isLoading: !error && !users,
    };
}
