export type PortEntity = {
    identifier: string;
    team: string[];
    icon: string;
    title: string;
    properties: Record<string, unknown>;
    relations: Record<string, string[] | string>;
};
export default function search(backendApiUrl: string, searchQuery: object): Promise<PortEntity[]>;
