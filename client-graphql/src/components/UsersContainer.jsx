import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS } from '../graphql/getUsers';
import { DELETE_USER } from '../graphql/deleteUser';
import { UPDATE_USER } from '../graphql/updateUser';
import { User } from './User';
import { Pagination } from './Pagination';

export const UsersContainer = () => {
    const [page, setPage] = useState(0);
    const { loading, error, data } = useQuery(GET_USERS, {
        variables: { page, perPage: 10 }
    });
    const [ deleteUser, { isDeleting, deleteError } ] = useMutation(DELETE_USER, {
        refetchQueries: [
            GET_USERS
        ]
    });
    const [ updateUser, { isUpdating, updateError } ] = useMutation(UPDATE_USER, {
        refetchQueries: [
            GET_USERS
        ]
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const onDelete = (id) => {
        deleteUser({ variables: { id } });
    };

    const onSave = (id, update) => {
        updateUser({ variables: { id, firstName: update.firstName, lastName: update.lastName, email: update.email } });
    };

    const { users, totalPages } = data?.users;

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div>
        {
            users.map(user => <User key={user.id} user={user} onDelete={onDelete} onSave={onSave} /> )
        }
        <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
        />
        </div>
    )
};