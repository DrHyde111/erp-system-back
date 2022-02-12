import dateFormat from "dateformat";


function formatDate(date: Date){
    return dateFormat(date, "yyyy-mm-dd HH:MM:ss")
}

const dateServices = {
    formatDate,
}

export default dateServices;