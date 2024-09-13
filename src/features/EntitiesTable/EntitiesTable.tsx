/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react';
import { PortEntity } from '../../api/search';
import { Table, TableColumn } from '@backstage/core-components';


export const EntitiesTable = (props: { entities: PortEntity[], isLoading: boolean }) => {
    const columns: TableColumn[] = useMemo(() => {
        const getUniqueFieldsByProperties = (entities: PortEntity[]) => {
            const uniqueFields = new Set<string>();
            uniqueFields.add('title');
            uniqueFields.add('identifier');

            entities.forEach(entity => {
                Object.keys(entity.properties).forEach(key => {
                    uniqueFields.add(`properties.${key}`);
                });
                Object.keys(entity.relations).forEach(key => {
                    uniqueFields.add(`relations.${key}`);
                });
            });

            return Array.from(uniqueFields);
        }

        const uniqueFields = getUniqueFieldsByProperties(props.entities);

        return uniqueFields.map(field => ({
            title: field,
            field,
        }));
    }, [props.entities.length])


    return <Table columns={columns} isLoading={props.isLoading} data={props.entities} />
};