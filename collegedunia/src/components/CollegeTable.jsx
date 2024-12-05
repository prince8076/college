import React, { useState, useEffect } from "react";
import collegeData from "../data/colleges.json";
import "./CollegeTable.css";

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
                    <button
                        onClick={() => handleSort("rank")}
                        className={sortKey === "rank" ? "active-sort" : ""}
                    >
                        Sort by CD Rank {sortKey === "rank" && (sortOrder === "asc" ? "↑" : "↓")}
                    </button>
                    <button
                        onClick={() => handleSort("rating")}
                        className={sortKey === "rating" ? "active-sort" : ""}
                    >
                        Sort by Rating {sortKey === "rating" && (sortOrder === "asc" ? "↑" : "↓")}
                    </button>
                    <button
                        onClick={() => handleSort("fees")}
                        className={sortKey === "fees" ? "active-sort" : ""}
                    >
                        Sort by Fees {sortKey === "fees" && (sortOrder === "asc" ? "↑" : "↓")}
                    </button>
                    <button
                        onClick={() => handleSort("userReviews")}
                        className={sortKey === "userReviews" ? "active-sort" : ""}
                    >
                        Sort by User Reviews {sortKey === "userReviews" && (sortOrder === "asc" ? "↑" : "↓")}
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
                                    <img
                                        src={college.logo}
                                        alt={`${college.name} logo`}
                                        className="college-logo"
                                    />
                                    {college.featured && (
                                        <div className="trapezium-flag">Featured</div>
                                    )}
                                </div>
                                <div className="college-info">
                                    <h3>{college.name}</h3>
                                    <p>{college.location}</p>
                                    <span className="course-badge">{college.course}</span>
                                </div>
                            </td>
                            <td>
                                <span className="fees">₹{college.fees.toLocaleString()}</span>
                                <p>MBA/PGDM - total fees</p>
                                <a href="#" className="compare-link">
                                    Compare Fees
                                </a>
                            </td>
                            <td>
                                <span className="placement">
                                    ₹{college.averagePackage.toLocaleString()}
                                </span>
                                <p>Average Package</p>
                                <span className="placement">
                                    ₹{college.highestPackage.toLocaleString()}
                                </span>
                                <p>Highest Package</p>
                            </td>
                            <td>
                                <span className="user-rating">{college.userReviews} / 10</span>
                                <p>Based on {college.reviewCount}</p>
                            </td>
                            <td>
                                <p>{college.ranking}</p>
                                <p>{college.source}</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CollegeTable;
