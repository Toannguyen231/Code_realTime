import React from 'react';
import './ProblemDescription.scss';
import { FiFileText, FiBookOpen, FiYoutube, FiClock, FiThumbsUp, FiThumbsDown, FiMessageSquare, FiStar, FiShare } from 'react-icons/fi';
import { MdMargin } from 'react-icons/md';

const ProblemDescription = () => {
    return (
        <div className="problem-description">
            <div className="tabs">
                <div className="tab active"><FiFileText /> Description</div>
                <div className="tab"><FiBookOpen /> Editorial</div>
                <div className="tab"><FiYoutube /> Solutions</div>
                <div className="tab"><FiClock /> Submissions</div>
            </div>

            <div className="content-area">
                <h1>2. Add Two Numbers</h1>
                <div className="badges">
                    <span className="badge medium">Medium</span>
                    <span className="badge">Topics</span>
                    <span className="badge">Companies</span>
                </div>

                <p>
                    You are given two <strong>non-empty</strong> linked lists representing two non-negative integers. The digits are stored in <strong>reverse order</strong>, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
                </p>
                <p>
                    You may assume the two numbers do not contain any leading zero, except the number 0 itself.
                </p>

                <div className="example-block">
                    <h3>Example 1:</h3>
                    <div className="example-image">
                        <img src="../../../public/image copy.png" alt="" />
                        <div className="example-p">
                            <p>
                                <strong>Input:</strong> l1 = [2,4,3], l2 = [5,6,4]
                            </p>
                            <p>
                                <strong>Output:</strong> [7,0,8]
                            </p>
                            <p>
                                <strong>Explanation:</strong> 342 + 465 = 807.
                            </p>
                        </div>
                    </div>
                    <h3>Example 2:</h3>
                    <div className='example-p'>
                        <p>
                            <strong>Input:</strong> l1 = [0], l2 = [0]
                        </p>
                        <p>
                            <strong>Output:</strong> [0]
                        </p>
                        <p>
                            <strong>Explanation:</strong> 0 + 0 = 0.
                        </p>
                    </div>
                    <h3>Example 3:</h3>
                    <div className='example-p'>
                        <p>
                            <strong>Input:</strong> l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
                        </p>
                        <p>
                            <strong>Output:</strong> [8,9,9,9,0,0,0,1]
                        </p>
                    </div>
                </div>
            </div>

            <div className="bottom-bar">
                <div className="action-icon"><FiThumbsUp /> 36.6K</div>
                <div className="action-icon"><FiThumbsDown /></div>
                <div className="action-icon"><FiMessageSquare /> 1.1K</div>
                <div className="action-icon"><FiStar /></div>
                <div className="action-icon"><FiShare /></div>
            </div>
        </div>
    );
};

export default ProblemDescription;
