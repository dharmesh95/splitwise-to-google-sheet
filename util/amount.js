export const getAmount = (users, myUsers) => {
    const amount = users.reduce((prev, curr) => {
        if (myUsers.includes(curr.user_id)) {
            return prev + Number(curr.owed_share)
        }
        return prev
    }, 0)
    return amount
}
