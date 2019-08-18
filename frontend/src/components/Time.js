import React from 'react';
import Moment from 'react-moment';

function getTimeString(oldDate) {

  let currentDate = new Date();
  let seconds = Math.floor(currentDate - oldDate) / 1000;

  if (currentDate.getFullYear() - oldDate.getFullYear() >= 1) {
    // last year or older
    return <Moment parse="MMMM D, YYYY">{oldDate}</Moment>;
  }
  let interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    // within a year
    return <Moment parse="MMMM D">{oldDate}</Moment>;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    // within a month
    return <Moment parse="MMMM D at HH:mm A">{oldDate}</Moment>;
  }
  return <Moment fromNow>{oldDate}</Moment>;
}

export default ({ date }) => {
  return getTimeString(new Date(date));
}
