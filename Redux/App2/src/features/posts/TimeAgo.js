import { parseISO, formatDistanceToNow } from "date-fns";
import React from 'react'

const TimeAgo = ({timestamp}) => {
  let timeAgo=''; 
  if(timestamp){
    const date = parseISO(timestamp); 
    const timePeriod = formatDistanceToNow(date); 
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span title={timestamp}>
        &nbsp; <i>{timeAgo}</i> {/*A commonly used HTML entity is the non-breaking space: &nbsp; A non-breaking space is a space that will not break into a new line. */}
    </span>
  )
}

export default TimeAgo