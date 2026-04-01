import React from 'react';
import './ProblemDescription.scss';
import { FiFileText, FiBookOpen, FiYoutube, FiClock, FiThumbsUp, FiThumbsDown, FiMessageSquare, FiStar, FiShare } from 'react-icons/fi';

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
                        {/* Dummy placeholder for the image map */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center'}}>
                            <div style={{border: '1px solid #ccc', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>2</div>
                            <span>→</span>
                            <div style={{border: '1px solid #ccc', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>4</div>
                            <span>→</span>
                            <div style={{border: '1px solid #ccc', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>3</div>
                        </div>
                        <div style={{margin: '10px 0'}}>+</div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center'}}>
                            <div style={{border: '1px solid #ccc', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>5</div>
                            <span>→</span>
                            <div style={{border: '1px solid #ccc', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>6</div>
                            <span>→</span>
                            <div style={{border: '1px solid #ccc', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>4</div>
                        </div>
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
