import React from 'react';
import './LeftSideBar.scss';
import ChannelItem from '../ChannelItem/ChannelItem';

function LeftSideBar() {
    return (
        <div className="LeftSideBar">
            <ChannelItem />
        </div>
    );
}

export default LeftSideBar;