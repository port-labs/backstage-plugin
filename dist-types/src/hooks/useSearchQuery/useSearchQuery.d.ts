import { PortEntity } from '../../api/search';
declare function useSearchQuery(searchQueryStr: string): {
    data: PortEntity[];
    error: string | null | undefined;
    isLoading: boolean;
};
export default useSearchQuery;
