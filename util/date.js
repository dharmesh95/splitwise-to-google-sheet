export const getSheetName = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentDate = new Date();
    const currentMonth = months[currentDate.getMonth()].substring(0, 3);
    const currentYear = currentDate.getFullYear().toString().substring(2);

    return `${currentMonth} ${currentYear} - Transactions`;
}
