import React, { useState, useEffect } from "react";
import collegeData from "../data/colleges.json";
import "./CollegeTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowDown, faCheck, faAngleDown } from "@fortawesome/free-solid-svg-icons";

const CollegeTable = () => {
    const [colleges, setColleges] = useState([]);
    const [visibleRows, setVisibleRows] = useState(10);
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setColleges(collegeData);
    }, []);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 50
        ) {
            setVisibleRows((prevVisibleRows) => prevVisibleRows + 10);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleSort = (key) => {
        const order = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
        setSortKey(key);
        setSortOrder(order);

        const sortedData = [...colleges].sort((a, b) => {
            if (order === "asc") {
                return a[key] > b[key] ? 1 : -1;
            } else {
                return a[key] < b[key] ? 1 : -1;
            }
        });
        setColleges(sortedData);
    };

    const filteredColleges = colleges.filter((college) =>
        college.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="table-container">
            <div className="table-controls">
                <input
                    type="text"
                    placeholder="Search by college name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                <div className="sort-buttons">
                    <button onClick={() => handleSort("rating")}>Sort by Rating</button>
                    <button onClick={() => handleSort("fees")}>Sort by Fees</button>
                    <button onClick={() => handleSort("userReviews")}>
                        Sort by User Reviews
                    </button>
                </div>
            </div>
            <table className="college-table">
                <thead>
                    <tr>
                        <th>CD Rank</th>
                        <th>Colleges</th>
                        <th>Course Fees</th>
                        <th>Placement</th>
                        <th>User Reviews</th>
                        <th>Ranking</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredColleges.slice(0, visibleRows).map((college, index) => (
                        <tr key={index} className="hover-row">
                            <td className="cd-rank">{college.rank}</td>
                            <td>
                                <div className="college-logo-container">
                                    {college.featured && (
                                        <div className="trapezium-flag">Featured</div>
                                    )}
                                    <img
                                        src={college.logo}
                                        alt={`${college.name} logo`}
                                        className="college-logo"
                                    />
                                    <div className="college-info">
                                        <h3>{college.name}</h3>
                                        <p>{college.location}</p>
                                        <span className="course-badge">
                                            {college.course} <p>{college.cutoff}</p>
                                        </span>
                                        <div className="actions">
                                            <a href="#" className="apply-btn">
                                                <FontAwesomeIcon icon={faArrowRight} /> Apply Now
                                            </a>
                                            <a href="#" className="download-link">
                                                <FontAwesomeIcon icon={faArrowDown} /> Download Brochure
                                            </a>
                                            <label>
                                                <input type="checkbox" /> Add to Compare
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span className="fees">{college.fees.toLocaleString()}</span>
                                <p>BE/B.Tech </p>
                                <p>-1st year Fees</p>
                                <a href="#" className="compare-link">
                                    Compare Fees
                                </a>
                            </td>
                            <td>
                                <span className="placement">
                                    {college.averagePackage.toLocaleString()}
                                </span>
                                <p>Average Package</p>
                                <span className="placement">
                                    {college.highestPackage.toLocaleString()}
                                </span>
                                <p>Highest Package</p>
                                <a href="#" className="compare-link">
                                    Compare Placement
                                </a>
                            </td>
                            <td>
                                {/* Orange bullet before rating */}
                                <span className="orange-bullet">&#8226;</span>
                                <span className="user-rating">{college.userReviews} / 10</span>
                                <br />
                                <p>Based on {college.reviewCount} User Reviews</p>
                                {/* Best in Social Life with icons */}
                                <p className="social-life">
                                    <FontAwesomeIcon icon={faCheck} /> Best in Social Life{" "}
                                    <FontAwesomeIcon icon={faAngleDown} />
                                </p>
                            </td>
                            <td>
                                <p>{college.ranking}</p>
                                <p>{college.source}</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {visibleRows < filteredColleges.length && (
                <div className="loading-message">Loading more colleges...</div>
            )}
        </div>
    );
};

export default CollegeTable;
