import { useEffect, useState } from "react";
import { FaHeart, FaUser } from "react-icons/fa"
import { FiClock } from "react-icons/fi"
import "./Story.css"


export const Story = ({id}) => {
    const [story, setStory] = useState([]);

    useEffect(() => {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then((response) => response.json())
        .then((data) => setStory(data()))
    }, [id]);

    const url = story.url ? story.url : `https://news.ycombinator.com/item?id=${story.id}`;

    const timeSec = story.time;
    const timeNowSec = Date.now() / 1000;
    const sec = (timeNowSec - timeSec);
    const hours = Math.round(sec / 60 / 60);

    const comments = story.kids ? story.kids.length : 0;

    return (
        <li>
            <div className="news">
                <p className="title"> <a href={url}> {story.title} </a> </p>
                <div className="info">
                    <span id="heart"> <FaHeart className="icon" /> {story.score} points </span>
                    <span id="user"> <FaUser className="icon" /> {story.by} </span>
                    <span id="time"> <FiClock className="icon" /> {hours} hours ago </span>
                    <span id="comments"> {comments} comments </span>
                </div>
            </div>
            <hr />
        </li>
    )
}