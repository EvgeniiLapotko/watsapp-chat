export const getRecipientEmail = (users, userLoged) => {
    return users.filter((userFilter) => userFilter !== userLoged.email);
};
