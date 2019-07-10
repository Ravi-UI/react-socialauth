import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import { map, isEmpty } from 'lodash';
import './comment.css';
import dummy from '../images/about_img.jpg';

const dateConvertion = (date) => {
    const dateString = new Date(date).toString();
    return dateString.substring(0, 15);
};

class CommentList extends React.Component {

    render(){
        const { data } = this.props;
        return (
            <div className="comment-wrapper">
                {isEmpty(data) && <h2>Post your first comment.</h2>}
                {map(data, (el, idx) => <div className="comment" key={idx}>
                    <span>{el.node.firstName.charAt(0)}</span>
                    <div className="comment-desc">
                        <h6 className="postedBy">{el.node.firstName}</h6>
                        <h6 className="postedDate">{dateConvertion(el.node._createdAt)}</h6>
                        <p>{el.node.comment}</p>
                    </div>
                </div>)}
            </div>
        );
    }
}


CommentList.propTypes = {
  data: PropTypes.array,
}


export default CommentList;
