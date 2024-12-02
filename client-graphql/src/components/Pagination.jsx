import React from 'react';

// import styles from './styles.module.scss';

const styles = {};

export const Pagination = ({ page, totalPages, onPageChange }) => {
    const handlePageChange = (newPage) => {
        onPageChange(newPage);
    };

    return (
        <div className={styles.pagination}>
            <button 
                className={styles.paginationBtn} 
                onClick={() => handlePageChange(page - 1)} 
                disabled={page === 0}
            >
                Previous
            </button>

            <div className={styles.paginationNumbers}>
                {
                    Array.from({ length: totalPages }, (_, index) => {
                        const pageNumberToDisplay = index + 1;

                        return (
                            <button
                                key={index}
                                className={`${styles.paginationNumber} ${page === index ? styles.active : ''}`}
                                onClick={() => handlePageChange(index)}
                            >
                                {pageNumberToDisplay}
                            </button>
                        )
                    })
                }
            </div>

            <button
                className={styles.paginationBtn}
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages - 1}
            >
                Next
            </button>
        </div>
    )
};