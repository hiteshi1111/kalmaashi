const formatDateTime = (isoString, isTime=true) => {
    const options = {
        year: 'numeric',
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };
    const options1 = {
        year: 'numeric',
        day: '2-digit',
        month: 'short'
    };
    if (isTime) {
        const dateTimeFormat = new Intl.DateTimeFormat('en-US', options);
        return dateTimeFormat.format(new Date(isoString));
    }else{
        const dateTimeFormat = new Intl.DateTimeFormat('en-US', options1);
        return dateTimeFormat.format(new Date(isoString));
    }
};

export default formatDateTime;