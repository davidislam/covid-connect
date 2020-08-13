import React from 'react';
import LinkIcon from '@material-ui/icons/Link';

export default function Url(props) {
  return (
    <div>
      <h4> <LinkIcon color='primary' fontSize='small' className='icon' /> Website</h4>
      <div id="url"> <a href={props.link}>{props.link}</a> </div>
    </div>
  )
}